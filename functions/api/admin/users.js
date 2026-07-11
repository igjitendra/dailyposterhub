import { json } from '../../_auth.js';
import { isAuthed } from '../../_lib.js';

// GET /api/admin/users  -> saare users ki list (sirf admin key ke saath).
export async function onRequestGet({ request, env }) {
  if (!env.USERS) return json({ error: 'auth-not-configured', message: 'KV (USERS) सेटअप नहीं है।' }, 501);
  if (!isAuthed(request, env)) return json({ error: 'unauthorized', message: 'गलत Admin Key।' }, 401);

  const users = [];
  let cursor = undefined;
  do {
    const res = await env.USERS.list({ prefix: 'user:', cursor });
    for (const k of res.keys) {
      const raw = await env.USERS.get(k.name);
      if (!raw) continue;
      try {
        const u = JSON.parse(raw);
        users.push({
          name: u.name || '',
          email: u.email || '',
          phone: u.phone || '',
          plan: u.plan || 'free',
          createdAt: u.createdAt || null,
          planUpdatedAt: u.planUpdatedAt || null,
          avatar: u.avatar || null,
        });
      } catch (e) { /* skip */ }
    }
    cursor = res.list_complete ? null : res.cursor;
  } while (cursor);

  users.sort((a, b) => String(b.createdAt || '').localeCompare(String(a.createdAt || '')));
  const pro = users.filter((u) => u.plan === 'pro').length;
  const business = users.filter((u) => u.plan === 'business').length;
  const free = users.filter((u) => (u.plan || 'free') === 'free').length;
  return json({ users, total: users.length, pro, business, free });
}
