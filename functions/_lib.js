// Shared helpers for Cloudflare Pages Functions.
// Files starting with _ are NOT routed (safe for shared code).

export function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}

// Simple shared-secret auth. Admin panel sends key in 'x-admin-key' header.
export function isAuthed(request, env) {
  const key = request.headers.get('x-admin-key');
  return Boolean(env.ADMIN_KEY) && key === env.ADMIN_KEY;
}

const INDEX_KEY = 'data/templates.json';

export async function readIndex(env) {
  const obj = await env.POSTERS.get(INDEX_KEY);
  if (!obj) return [];
  try {
    return await obj.json();
  } catch (e) {
    return [];
  }
}

export async function writeIndex(env, list) {
  await env.POSTERS.put(INDEX_KEY, JSON.stringify(list), {
    httpMetadata: { contentType: 'application/json' },
  });
}
