// POST /.netlify/functions/invite   Body: { email }
// Admin-only: invites a user to the project via Netlify Identity (GoTrue).
// The caller must be signed in and carry the "admin" role in app_metadata.
export default async (req, context) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });

  const user = context.clientContext && context.clientContext.user;
  const identity = context.clientContext && context.clientContext.identity;
  if (!user) return new Response(JSON.stringify({ error: "Sign in required" }), { status: 401 });

  const roles = (user.app_metadata && user.app_metadata.roles) || [];
  if (!roles.includes("admin")) {
    return new Response(JSON.stringify({ error: "Admin role required to invite" }), { status: 403 });
  }
  if (!identity || !identity.url || !identity.token) {
    return new Response(JSON.stringify({ error: "Identity not available" }), { status: 500 });
  }

  let body;
  try { body = await req.json(); } catch { return new Response("Bad JSON", { status: 400 }); }
  const email = (body && body.email || "").trim();
  if (!email) return new Response(JSON.stringify({ error: "email required" }), { status: 400 });

  try {
    const res = await fetch(`${identity.url}/invite`, {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${identity.token}` },
      body: JSON.stringify({ email }),
    });
    const txt = await res.text();
    if (!res.ok) return new Response(JSON.stringify({ error: "Invite failed", detail: txt }), { status: 502 });
    return new Response(JSON.stringify({ ok: true, email }), { headers: { "content-type": "application/json" } });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500 });
  }
};
