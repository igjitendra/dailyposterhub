import { json } from '../_lib.js';

const KEY = 'settings:app';

export async function onRequestGet({ env }) {
  if (!env.USERS) return json({ ads: { enabled: false } });
  const raw = await env.USERS.get(KEY);
  if (!raw) return json({ ads: { enabled: false } });
  try {
    const settings = JSON.parse(raw);
    const ads = settings.ads || {};
    return json({
      ads: {
        enabled: ads.enabled === true,
        provider: String(ads.provider || ''),
        scriptUrl: String(ads.scriptUrl || ''),
        headerCode: String(ads.headerCode || ''),
        footerCode: String(ads.footerCode || ''),
      },
    });
  } catch (e) { return json({ ads: { enabled: false } }); }
}
