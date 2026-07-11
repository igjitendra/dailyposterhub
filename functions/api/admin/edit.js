import { json, isAuthed, readIndex, writeIndex } from '../../_lib.js';

export async function onRequestPost({ request, env }) {
  if (!isAuthed(request, env)) return json({ error: 'Unauthorized' }, 401);
  let body; try { body = await request.json(); } catch (e) { return json({ error: 'Invalid data' }, 400); }
  const id = String(body.id || '');
  if (!id) return json({ error: 'ID ज़रूरी है' }, 400);
  const list = await readIndex(env); const item = list.find((x) => x.id === id);
  if (!item) return json({ error: 'Poster नहीं मिला' }, 404);
  item.title = String(body.title || item.title).trim().slice(0, 160);
  item.category = String(body.category || item.category).trim().slice(0, 80);
  item.type = body.type === 'pro' ? 'pro' : 'free';
  item.description = String(body.description || '').trim().slice(0, 500);
  item.posterDate = String(body.posterDate || '').trim();
  item.updatedAt = new Date().toISOString();
  await writeIndex(env, list);
  return json({ ok: true, template: item });
}
