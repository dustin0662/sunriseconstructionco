// Serve the issued EOD report PDF for a project + date.
//
//   GET ?project=<id>&date=<YYYY-MM-DD>&pin=<clientPin>   (client, read-only)
//   GET ?project=<id>&date=<YYYY-MM-DD>&admin=<passcode>  (admin)
//
// Client access requires the PIN to match the project's clientPin.

import { getStore } from "@netlify/blobs";

const store = () => getStore({ name: "shipments", consistency: "strong" });
const ADMIN = process.env.ADMIN_PASSCODE || "sunrise2026";

export default async (req) => {
  const s = store();
  const url = new URL(req.url);
  const projectId = url.searchParams.get("project");
  const date = url.searchParams.get("date");
  if (!projectId || !date) return new Response("project and date required", { status: 400 });

  // Authorize: admin passcode OR matching client PIN.
  const isAdmin = (url.searchParams.get("admin") || "") === ADMIN;
  if (!isAdmin) {
    const pin = url.searchParams.get("pin") || "";
    const proj = await s.get(`projects/${projectId}`, { type: "json" }).catch(() => null);
    if (!proj || String(proj.clientPin || "") === "" || String(proj.clientPin) !== String(pin)) {
      return new Response("unauthorized", { status: 401 });
    }
  }

  const key = `eod/${projectId}/${date}.pdf`;
  const data = await s.get(key, { type: "arrayBuffer" });
  if (!data) return new Response("Report not issued for this day.", { status: 404 });

  const dl = url.searchParams.get("download");
  const headers = { "content-type": "application/pdf", "cache-control": "private, max-age=60" };
  if (dl) headers["content-disposition"] = `attachment; filename="EOD_${projectId}_${date}.pdf"`;
  return new Response(data, { headers });
};
