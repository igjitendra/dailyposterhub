import { json, isAuthed } from '../../_lib.js';

const KEY = 'settings:app';
const defaults = {
  general: {
    siteName: 'Daily PosterHub',
    tagline: 'हर दिन नया पोस्टर, आपके अपने अंदाज़ में',
    supportEmail: 'support@posterhub.pages.dev',
    whatsapp: '916387617678',
    upiId: 'canvapro@upi',
    maintenance: false,
    maintenanceMessage: 'हम थोड़ी देर में वापस आएंगे।',
  },
  ads: {
    enabled: false,
    provider: 'Google AdSense',
    scriptUrl: '',
    headerCode: '',
    footerCode: '',
  },
};

function cleanString(value, max) { return String(value || '').trim().slice(0, max); }
function cleanUrl(value) {
  const url = cleanString(value, 500);
  return /^https:\/\//i.test(url) ? url : '';
}
function cleanCode(value, max) { return String(value || '').slice(0, max); }
async function load(env) {
  if (!env.USERS) return { ...defaults, general: { ...defaults.general }, ads: { ...defaults.ads } };
  const raw = await env.USERS.get(KEY);
  if (!raw) return { ...defaults, general: { ...defaults.general }, ads: { ...defaults.ads } };
  try {
    const parsed = JSON.parse(raw);
    return { general: { ...defaults.general, ...(parsed.general || {}) }, ads: { ...defaults.ads, ...(parsed.ads || {}) } };
  } catch (e) { return { ...defaults, general: { ...defaults.general }, ads: { ...defaults.ads } }; }
}

export async function onRequestGet({ request, env }) {
  if (!env.USERS) return json({ error: 'settings-not-configured', message: 'KV (USERS) सेटअप नहीं है।' }, 501);
  if (!isAuthed(request, env)) return json({ error: 'unauthorized', message: 'गलत Admin Key।' }, 401);
  return json({ settings: await load(env) });
}

export async function onRequestPost({ request, env }) {
  if (!env.USERS) return json({ error: 'settings-not-configured', message: 'KV (USERS) सेटअप नहीं है।' }, 501);
  if (!isAuthed(request, env)) return json({ error: 'unauthorized', message: 'गलत Admin Key।' }, 401);
  let body;
  try { body = await request.json(); } catch (e) { return json({ error: 'bad-request' }, 400); }
  const general = body.general || {};
  const ads = body.ads || {};
  const settings = {
    general: {
      siteName: cleanString(general.siteName, 80) || defaults.general.siteName,
      tagline: cleanString(general.tagline, 180),
      supportEmail: cleanString(general.supportEmail, 160),
      whatsapp: cleanString(general.whatsapp, 30),
      upiId: cleanString(general.upiId, 120),
      maintenance: general.maintenance === true,
      maintenanceMessage: cleanString(general.maintenanceMessage, 300),
    },
    ads: {
      enabled: ads.enabled === true,
      provider: cleanString(ads.provider, 80),
      scriptUrl: cleanUrl(ads.scriptUrl),
      headerCode: cleanCode(ads.headerCode, 10000),
      footerCode: cleanCode(ads.footerCode, 10000),
    },
    updatedAt: new Date().toISOString(),
  };
  await env.USERS.put(KEY, JSON.stringify(settings));
  return json({ ok: true, settings });
}
