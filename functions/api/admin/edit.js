import { json, isAuthed, readIndex, writeIndex } from '../../_lib.js';

const ALLOWED_CATEGORIES = new Set(['गुड मॉर्निंग','गुड नाइट','जन्मदिन','शुभकामनाएं','धार्मिक','त्योहार','बिज़नेस','सोशल मीडिया','Motivational','Sad Story','सुविचार','विशेष दिवस']);

export async function onRequestPost({ request, env }) {
  if (!isAuthed(request, env)) return json({ error: 'Unauthorized' }, 401);
  let body; try { body = await request.json(); } catch (e) { return json({ error: 'Invalid data' }, 400); }
  const id = String(body.id || '');
  if (!id) return json({ error: 'ID ज़रूरी है' }, 400);
  const list = await readIndex(env); const item = list.find((x) => x.id === id);
  if (!item) return json({ error: 'Poster नहीं मिला' }, 404);
  const nextTitle = String(body.title || item.title).trim().slice(0, 160);
  const nextCategory = String(body.category || item.category).trim().slice(0, 80);
  const nextDate = String(body.posterDate || '').trim();
  if (!nextTitle) return json({ error: 'शीर्षक ज़रूरी है' }, 400);
  if (!ALLOWED_CATEGORIES.has(nextCategory)) return json({ error: 'सही category चुनें' }, 400);
  if (nextCategory === 'विशेष दिवस' && !/^\d{4}-\d{2}-\d{2}$/.test(nextDate)) return json({ error: 'विशेष दिवस के लिए तारीख़ चुनें' }, 400);
  if (nextCategory === 'त्योहार' && (!String(body.festivalName || '').trim() || !/^\d{4}-\d{2}-\d{2}$/.test(nextDate))) return json({ error: 'त्योहार और उसकी तारीख़ चुनें' }, 400);
  item.title = nextTitle;
  item.category = nextCategory;
  item.type = body.type === 'pro' ? 'pro' : 'free';
  item.description = String(body.description || '').trim().slice(0, 500);
  item.posterDate = nextDate;
  item.festivalName = item.category === 'त्योहार' ? String(body.festivalName || item.festivalName || '').trim().slice(0, 120) : '';
  item.festivalId = item.category === 'त्योहार' ? String(body.festivalId || item.festivalId || '').trim().slice(0, 180) : '';
  item.updatedAt = new Date().toISOString();
  await writeIndex(env, list);
  return json({ ok: true, template: item });
}
