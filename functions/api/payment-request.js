import { json } from '../_lib.js';
import { notifyTelegram } from '../_telegram.js';
export async function onRequestPost({ request, env }) {
  let body; try { body = await request.json(); } catch (e) { return json({ error: 'bad-request' }, 400); }
  const name = String(body.name || '').trim().slice(0, 100);
  const account = String(body.account || '').trim().slice(0, 160);
  const txn = String(body.txn || '').trim().slice(0, 120);
  const plan = body.plan === 'monthly' ? 'मासिक' : 'वार्षिक';
  const amount = Number(body.amount || 0);
  if (!name || !account) return json({ error: 'required' }, 400);
  await notifyTelegram(env, 'payment', '💳 नई Pro Payment Request', ['नाम: ' + name, 'अकाउंट: ' + account, 'प्लान: ' + plan, 'राशि: ₹' + amount, 'Txn/UPI Ref: ' + (txn || '—')]);
  return json({ ok: true });
}
