import { json, authConfigured, hashPassword, getUser, putUser, makeSession, sessionCookie, withCookie } from '../../_auth.js';

export async function onRequestPost({ request, env }) {
  if (!authConfigured(env)) return json({ error: 'auth-not-configured', message: 'लॉगिन सिस्टम अभी सेटअप नहीं है (KV + SESSION_SECRET जोड़ें)।' }, 501);
  let body;
  try { body = await request.json(); } catch (e) { return json({ error: 'bad-request' }, 400); }
  const name = String(body.name || '').trim();
  const email = String(body.email || '').trim().toLowerCase();
  const phone = String(body.phone || '').trim();
  const password = String(body.password || '');
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!name) return json({ error: 'name', message: 'कृपया अपना नाम डालें।' }, 400);
  if (!emailOk) return json({ error: 'email', message: 'सही ईमेल पता डालें।' }, 400);
  if (password.length < 6) return json({ error: 'password', message: 'पासवर्ड कम से कम 6 अक्षर का हो।' }, 400);
  const existing = await getUser(env, email);
  if (existing) return json({ error: 'exists', message: 'यह ईमेल पहले से रजिस्टर्ड है — लॉगिन करें।' }, 409);
  const passHash = await hashPassword(password);
  const user = { name, email, phone, passHash, plan: 'free', createdAt: new Date().toISOString() };
  await putUser(env, user);
  const token = await makeSession(env, email);
  return withCookie(json({ user: { name, email, plan: 'free' } }), sessionCookie(token));
}
