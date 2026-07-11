import { json } from '../_lib.js';
import { notifyTelegram } from '../_telegram.js';
export async function onRequestPost({ request, env }) {
  let body; try { body = await request.json(); } catch (e) { return json({ error: 'bad-request' }, 400); }
  const name = String(body.name || '').trim().slice(0, 100);
  const email = String(body.email || '').trim().slice(0, 160);
  const phone = String(body.phone || '').trim().slice(0, 40);
  const message = String(body.message || '').trim().slice(0, 2000);
  if (!name || !email || !message) return json({ error: 'required', message: 'नाम, ईमेल और मैसेज भरें।' }, 400);
  await notifyTelegram(env, 'contact', '📩 नया Contact Form Message', ['नाम: ' + name, 'ईमेल: ' + email, 'फोन: ' + (phone || '—'), 'मैसेज: ' + message]);
  return json({ ok: true, message: 'आपका मैसेज भेज दिया गया है।' });
}
