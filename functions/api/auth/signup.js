import { json, authConfigured, hashPassword, getUser, putUser, makeSession, sessionCookie, withCookie } from '../../_auth.js';
import { notifyTelegram } from '../../_telegram.js';
export async function onRequestPost({ request, env }) {
  if (!authConfigured(env)) return json({ error: 'auth-not-configured', message: 'लॉगिन सिस्टम अभी सेटअप नहीं है (KV + SESSION_SECRET जोड़ें)।' }, 501);
  let body; try { body = await request.json(); } catch (e) { return json({ error: 'bad-request' }, 400); }
  const name = String(body.name || '').trim(), email = String(body.email || '').trim().toLowerCase(), phone = String(body.phone || '').trim(), password = String(body.password || '');
  if (!name) return json({ error: 'name', message: 'कृपया अपना नाम डालें।' }, 400);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: 'email', message: 'सही ईमेल पता डालें।' }, 400);
  if (password.length < 6) return json({ error: 'password', message: 'पासवर्ड कम से कम 6 अक्षर का हो।' }, 400);
  if (await getUser(env, email)) return json({ error: 'exists', message: 'यह ईमेल पहले से रजिस्टर्ड है — लॉगिन करें।' }, 409);
  const user = { name, email, phone, passHash: await hashPassword(password), plan: 'free', createdAt: new Date().toISOString() };
  await putUser(env, user);
  await notifyTelegram(env, 'signup', '🆕 नया User Signup', ['नाम: ' + name, 'ईमेल: ' + email, 'फोन: ' + (phone || '—'), 'प्लान: FREE']);
  return withCookie(json({ user: { name, email, plan: 'free' } }), sessionCookie(await makeSession(env, email)));
}
