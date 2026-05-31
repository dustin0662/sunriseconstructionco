// POST /.netlify/functions/capture
// Upserts a capture. Server stamps the authenticated user + ISO timestamp.
//
// Body (one of):
//   { moduleId, row?, serial?, photoDataUrl? }      // upsert metadata + optional photo
//   { moduleId, clearPhoto: true }                  // remove photo, keep serial
//   { moduleId, remove: true }                      // delete capture entirely
//
// Photo bytes live in their own store (one blob per moduleId); all
// metadata sits in a single "index" blob updated via CAS so the read
// path is one round-trip even at 20k entries.
import { userFromReq } from "./lib/auth.mjs";
import { updateCaptures, photosStore } from "./lib/store.mjs";

const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { "content-type": "application/json" } });

export default async (req) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });
  const me = await userFromReq(req);
  if (!me) return json({ error: "Sign in required" }, 401);

  let body; try { body = await req.json(); } catch { return json({ error: "Bad JSON" }, 400); }
  const { moduleId, row, serial, photoDataUrl, remove, clearPhoto } = body || {};
  if (!moduleId) return json({ error: "moduleId required" }, 400);

  const photos = photosStore();

  if (remove) {
    try { await photos.delete(moduleId); } catch {}
    await updateCaptures((entries) => { delete entries[moduleId]; });
    return json({ ok: true, removed: moduleId });
  }

  // Photo first (idempotent + retryable from the client offline queue).
  let hasPhotoIntent = null;
  if (clearPhoto) {
    try { await photos.delete(moduleId); } catch {}
    hasPhotoIntent = false;
  } else if (photoDataUrl && photoDataUrl.startsWith("data:")) {
    const bytes = Buffer.from(photoDataUrl.split(",")[1] || "", "base64");
    await photos.set(moduleId, bytes);
    hasPhotoIntent = true;
  }

  const ts = new Date().toISOString();
  let result;
  await updateCaptures((entries) => {
    const prev = entries[moduleId] || {};
    const next = {
      // serial: explicit string (incl. empty) overrides; otherwise keep prev.
      serial: ("serial" in body) ? String(serial || "") : (prev.serial || ""),
      row:    row || prev.row || "",
      user:   me.name || me.email,
      ts,
      hasPhoto: hasPhotoIntent === null ? !!prev.hasPhoto : hasPhotoIntent,
    };
    entries[moduleId] = next;
    result = { moduleId, ...next };
  });

  return json({ ok: true, ...result });
};
