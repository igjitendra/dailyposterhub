import { json, isAuthed } from '../../_lib.js';

// POST /api/admin/ping -> verify admin key
export async function onRequestPost({ request, env }) {
  const ok = isAuthed(request, env);
  return json({ ok }, ok ? 200 : 401);
}
