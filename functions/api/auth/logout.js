import { json, clearCookie, withCookie } from '../../_auth.js';

export async function onRequestPost() {
  return withCookie(json({ ok: true }), clearCookie());
}
