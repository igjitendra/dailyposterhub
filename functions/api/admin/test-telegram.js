import { json, isAuthed } from '../../_lib.js';
import { notifyTelegram } from '../../_telegram.js';
export async function onRequestPost({ request, env }) {
  if (!isAuthed(request, env)) return json({ error: 'unauthorized', message: 'गलत Admin Key।' }, 401);
  const ok = await notifyTelegram(env, 'test', '✅ Daily PosterHub Telegram Test', ['Telegram notifications सही तरह से connect हैं।']);
  return ok ? json({ ok: true }) : json({ error: 'failed', message: 'Telegram message नहीं भेजा गया। Token, Chat ID और bot permissions check करें।' }, 400);
}
