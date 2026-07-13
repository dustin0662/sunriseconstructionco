// Shipment tracking entries — shared store backed by Netlify Blobs.
//
//   GET  /.netlify/functions/entries  -> JSON array of entries, newest first
//   POST /.netlify/functions/entries  -> create one entry (+ store its photo)
//
// Each entry is its own blob (key `entries/<createdAt>-<id>`) so that many
// crews submitting at once never clobber a shared document. The load photo is
// stored as a separate binary blob (`photos/<id>.jpg`) and served by photo.js.
// Strong consistency makes a just-created entry visible to other pollers
// immediately (the default eventual mode can lag up to ~60s).

import { getStore } from "@netlify/blobs";

const store = () => getStore({ name: "shipments", consistency: "strong" });

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json" },
  });

export default async (req) => {
  const s = store();

  if (req.method === "GET") {
    const { blobs } = await s.list({ prefix: "entries/" });
    const items = await Promise.all(
      blobs.map((b) => s.get(b.key, { type: "json" }))
    );
    items
      .filter(Boolean)
      .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
    return json(items.filter(Boolean));
  }

  if (req.method === "POST") {
    let body;
    try {
      body = await req.json();
    } catch {
      return json({ error: "Invalid JSON body" }, 400);
    }

    // A load carries one or more color line-items. Accept the items array;
    // tolerate a legacy flat payload (single color) for backward compatibility.
    let rawItems = Array.isArray(body.items) ? body.items : null;
    if (!rawItems && body.color) {
      rawItems = [{ color: body.color, block: body.block, qtyPerBundle: body.qtyPerBundle, bundlesPerLoad: body.bundlesPerLoad }];
    }
    if (!body.filler) return json({ error: "Missing filler" }, 400);
    if (!rawItems || !rawItems.length) return json({ error: "At least one color is required" }, 400);
    const itemFields = ["color", "block", "qtyPerBundle", "bundlesPerLoad"];
    const items = [];
    for (const it of rawItems) {
      const bad = itemFields.filter((k) => it[k] === undefined || it[k] === "" || it[k] === null);
      if (bad.length) return json({ error: "Color item missing: " + bad.join(", ") }, 400);
      items.push({
        color: String(it.color), block: String(it.block),
        qtyPerBundle: String(it.qtyPerBundle), bundlesPerLoad: String(it.bundlesPerLoad),
      });
    }
    if (!body.photo || typeof body.photo !== "string" || !body.photo.startsWith("data:image")) {
      return json({ error: "A load photo is required" }, 400);
    }
    if (!body.signature || typeof body.signature !== "string" || !body.signature.startsWith("data:image")) {
      return json({ error: "A signature is required" }, 400);
    }

    const id = Math.random().toString(36).slice(2, 10);
    const createdAt = new Date().toISOString();

    // Decode the JPEG data URL and store it as its own binary blob.
    const b64 = body.photo.split(",")[1] || "";
    const bytes = Buffer.from(b64, "base64");
    const photoKey = `photos/${id}.jpg`;
    await s.set(photoKey, bytes, { metadata: { contentType: "image/jpeg" } });

    const entry = {
      id,
      createdAt,
      filler: String(body.filler),
      items,
      notes: body.notes ? String(body.notes) : "",
      photoKey,
      signature: String(body.signature), // small PNG data URL, stored inline
    };

    await s.setJSON(`entries/${createdAt}-${id}`, entry);
    return json(entry, 201);
  }

  return json({ error: "Method not allowed" }, 405);
};
