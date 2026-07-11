const SETTINGS_KEY = 'settings:app';

function esc(value) { return String(value == null ? '' : value).replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c])); }
export async function notifyTelegram(env, event, title, lines) {
  try {
    if (!env.USERS) return false;
    const raw = await env.USERS.get(SETTINGS_KEY);
    if (!raw) return false;
    const telegram = (JSON.parse(raw).telegram || {});
    if (!telegram.enabled || !telegram.botToken || !telegram.chatId || (telegram.events && telegram.events[event] === false)) return false;
    const text = ['<b>' + esc(title) + '</b>', ...lines.map((line) => esc(line))].join('\n');
    const response = await fetch('https://api.telegram.org/bot' + telegram.botToken + '/sendMessage', {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ chat_id: telegram.chatId, text, parse_mode: 'HTML', disable_web_page_preview: true }),
    });
    return response.ok;
  } catch (e) { return false; }
}
