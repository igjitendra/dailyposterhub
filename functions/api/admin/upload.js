import { json, isAuthed, readIndex, writeIndex } from '../../_lib.js';

// POST /api/admin/upload  (multipart/form-data)
const ALLOWED_CATEGORIES = new Set(['गुड मॉर्निंग','गुड नाइट','जन्मदिन','शुभकामनाएं','धार्मिक','त्योहार','बिज़नेस','सोशल मीडिया','Motivational','Sad Story','सुविचार','विशेष दिवस']);

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
  let posterDate = String(form.get('posterDate') || '').trim();
  const festivalChoice = String(form.get('festivalChoice') || '').trim();
  let festivalName = '';
  let festivalId = '';
  if (category === 'त्योहार') {
    const splitAt = festivalChoice.indexOf('|');
    if (splitAt > 0) {
      posterDate = festivalChoice.slice(0, splitAt).trim();
      festivalName = festivalChoice.slice(splitAt + 1).trim().slice(0, 120);
      festivalId = (posterDate + '-' + festivalName).toLowerCase().replace(/[^a-z0-9\u0900-\u097f]+/g, '-').replace(/^-|-$/g, '');
    }
  }

  if (!file || typeof file === 'string') return json({ error: 'इमेज ज़रूरी है' }, 400);
  if (!title || !category) return json({ error: 'शीर्षक और श्रेणी ज़रूरी हैं' }, 400);
  if (!ALLOWED_CATEGORIES.has(category)) return json({ error: 'सही श्रेणी चुनें' }, 400);
  if (category === 'त्योहार' && (!festivalName || !/^\d{4}-\d{2}-\d{2}$/.test(posterDate))) {
    return json({ error: 'त्योहार category के लिए त्योहार चुनना ज़रूरी है' }, 400);
  }

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
    festivalName,
    festivalId,
    img: '/cdn/' + imgKey,
    createdAt: new Date().toISOString(),
  };

  const list = await readIndex(env);
  list.unshift(meta);
  await writeIndex(env, list);

  return json({ ok: true, template: meta });
}
