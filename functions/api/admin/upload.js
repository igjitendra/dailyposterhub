import { json, isAuthed, readIndex, writeIndex } from '../../_lib.js';

// POST /api/admin/upload  (multipart/form-data)
export async function onRequestPost({ request, env }) {
  if (!isAuthed(request, env)) return json({ error: 'Unauthorized' }, 401);

  let form;
  try {
    form = await request.formData();
  } catch (e) {
    return json({ error: 'Invalid form data' }, 400);
  }

  const file = form.get('image');
  const title = String(form.get('title') || '').trim();
  const category = String(form.get('category') || '').trim();
  const typeRaw = String(form.get('type') || 'free');
  const tags = String(form.get('tags') || '').split(',').map((s) => s.trim()).filter(Boolean);
  const fields = String(form.get('fields') || '').split(',').map((s) => s.trim()).filter(Boolean);
  const hasPhotoSlot = form.get('hasPhotoSlot') === 'on' || form.get('hasPhotoSlot') === 'true';
  const description = String(form.get('description') || '').trim();
  const posterDate = String(form.get('posterDate') || '').trim();

  if (!file || typeof file === 'string') return json({ error: 'इमेज ज़रूरी है' }, 400);
  if (!title || !category) return json({ error: 'शीर्षक और श्रेणी ज़रूरी हैं' }, 400);

  const extMap = { 'image/webp': 'webp', 'image/jpeg': 'jpg', 'image/jpg': 'jpg', 'image/png': 'png' };
  const ext = extMap[file.type] || 'webp';
  const id = crypto.randomUUID();
  const imgKey = 'posters/' + id + '.' + ext;

  await env.POSTERS.put(imgKey, await file.arrayBuffer(), {
    httpMetadata: { contentType: file.type || 'image/webp' },
  });

  const meta = {
    id,
    title,
    category,
    type: typeRaw === 'pro' ? 'pro' : 'free',
    tags,
    fields,
    hasPhotoSlot,
    description,
    posterDate,
    img: '/cdn/' + imgKey,
    createdAt: new Date().toISOString(),
  };

  const list = await readIndex(env);
  list.unshift(meta);
  await writeIndex(env, list);

  return json({ ok: true, template: meta });
}
