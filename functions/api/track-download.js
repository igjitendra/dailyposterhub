import { json } from '../../_auth.js';

// POST /api/track-download  { title }  -> ek download count karo
// GET  /api/track-download             -> { total, top: [{title,count}] }
// Counters KV (USERS) me alag prefix 'stat:' par store hote hain,
// isliye ye user records me dakhal nahi dete.

export async function onRequestPost({ request, env }) {
  if (!env.USERS) return json({ ok: false, total: 0 });
  let body = {};
  try { body = await request.json(); } catch (e) {}
  const title = (body && body.title ? String(body.title) : '').slice(0, 120).trim();

  const curTotal = parseInt((await env.USERS.get('stat:downloads:total')) || '0', 10) || 0;
  const total = curTotal + 1;
  await env.USERS.put('stat:downloads:total', String(total));

  if (title) {
    const key = 'stat:dl:' + title;
    const cur = parseInt((await env.USERS.get(key)) || '0', 10) || 0;
    await env.USERS.put(key, String(cur + 1));
  }
  return json({ ok: true, total });
}

export async function onRequestGet({ env }) {
  if (!env.USERS) return json({ total: 0, top: [] });
  const total = parseInt((await env.USERS.get('stat:downloads:total')) || '0', 10) || 0;
  const top = [];
  let cursor = undefined;
  do {
    const res = await env.USERS.list({ prefix: 'stat:dl:', cursor });
    for (const k of res.keys) {
      const count = parseInt((await env.USERS.get(k.name)) || '0', 10) || 0;
      top.push({ title: k.name.slice('stat:dl:'.length), count });
    }
    cursor = res.list_complete ? null : res.cursor;
  } while (cursor);
  top.sort((a, b) => b.count - a.count);
  return json({ total, top: top.slice(0, 50) });
}
