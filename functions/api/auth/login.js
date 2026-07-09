import { json, authConfigured, verifyPassword, getUser, makeSession, sessionCookie, withCookie } from '../../_auth.js';

export async function onRequestPost({ request, env }) {
  if (!authConfigured(env)) return json({ error: 'auth-not-configured', message: 'लॉगिन सिस्टम अभी सेटअप नहीं है (KV + SESSION_SECRET जोड़ें)।' }, 501);
  let body;
  try { body = await request.json(); } catch (e) { return json({ error: 'bad-request' }, 400); }
  const email = String(body.email || '').trim().toLowerCase();
  const password = String(body.password || '');
  const user = await getUser(env, email);
  if (!user) return json({ error: 'invalid', message: 'गलत ईमेल या पासवर्ड।' }, 401);
  const ok = await verifyPassword(password, user.passHash);
  if (!ok) return json({ error: 'invalid', message: 'गलत ईमेल या पासवर्ड।' }, 401);
  const token = await makeSession(env, email);
  return withCookie(json({ user: { name: user.name, email: user.email, plan: user.plan || 'free' } }), sessionCookie(token));
}
