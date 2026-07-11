import { json } from '../_lib.js';
const KEY = 'settings:app';
export async function onRequestGet({ env }) {
  if (!env.USERS) return json({ ads: { enabled: false } });
  const raw = await env.USERS.get(KEY); if (!raw) return json({ ads: { enabled: false } });
  try {
    const saved = JSON.parse(raw), ads = saved.ads || {};
    return json({ ads: { enabled: ads.enabled === true, provider: String(ads.provider || ''), scriptUrl: String(ads.scriptUrl || ''), topCode: String(ads.topCode || ads.headerCode || ''), contentCode: String(ads.contentCode || ''), footerCode: String(ads.footerCode || ''), stickyCode: String(ads.stickyCode || '') } });
  } catch (e) { return json({ ads: { enabled: false } }); }
}
