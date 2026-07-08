import { json, isAuthed, readIndex, writeIndex } from '../../_lib.js';

// POST /api/admin/delete  { id }
export async function onRequestPost({ request, env }) {
  if (!isAuthed(request, env)) return json({ error: 'Unauthorized' }, 401);

  const body = await request.json().catch(() => ({}));
  const id = body && body.id;
  if (!id) return json({ error: 'id required' }, 400);

  const list = await readIndex(env);
  const item = list.find((t) => t.id === id);
  const next = list.filter((t) => t.id !== id);
  await writeIndex(env, next);

  if (item && item.img) {
    const key = item.img.replace(/^\/cdn\//, '');
    await env.POSTERS.delete(key).catch(() => {});
  }

  return json({ ok: true });
}
