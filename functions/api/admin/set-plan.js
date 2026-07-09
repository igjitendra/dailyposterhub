import { json, getUser, putUser } from '../../_auth.js';
import { isAuthed } from '../../_lib.js';

// Admin only: manually set a user's plan (Pro activate/deactivate).
// Header: x-admin-key: <ADMIN_KEY>
export async function onRequestPost({ request, env }) {
  if (!env.USERS) return json({ error: 'auth-not-configured', message: 'KV (USERS) सेटअप नहीं है।' }, 501);
  if (!isAuthed(request, env)) return json({ error: 'unauthorized', message: 'गलत Admin Key।' }, 401);
  let body;
  try { body = await request.json(); } catch (e) { return json({ error: 'bad-request' }, 400); }
  const email = String(body.email || '').trim().toLowerCase();
  const plan = body.plan === 'pro' ? 'pro' : 'free';
  if (!email) return json({ error: 'email', message: 'ईमेल डालें।' }, 400);
  const user = await getUser(env, email);
  if (!user) return json({ error: 'not-found', message: 'इस ईमेल का कोई यूज़र नहीं मिला।' }, 404);
  user.plan = plan;
  user.planUpdatedAt = new Date().toISOString();
  await putUser(env, user);
  return json({ ok: true, email, plan, name: user.name });
}
