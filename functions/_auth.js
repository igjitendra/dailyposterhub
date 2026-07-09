// Shared auth helpers for Cloudflare Pages Functions.
// Requires: KV binding USERS + secret SESSION_SECRET.
// Files starting with _ are NOT routed (safe for shared code).
import { json } from './_lib.js';
export { json };

export function authConfigured(env) {
  return Boolean(env && env.USERS) && Boolean(env && env.SESSION_SECRET);
}

const enc = new TextEncoder();
const dec = new TextDecoder();

function b64(bytes) {
  const arr = new Uint8Array(bytes);
  let bin = '';
  for (let i = 0; i < arr.length; i++) bin += String.fromCharCode(arr[i]);
  return btoa(bin);
}
function b64url(bytes) {
  return b64(bytes).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
function fromB64(str) {
  const bin = atob(str);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
  return arr;
}
function fromB64url(str) {
  let s = str.replace(/-/g, '+').replace(/_/g, '/');
  while (s.length % 4) s += '=';
  return fromB64(s);
}

// ---------- Password hashing (PBKDF2 / SHA-256) ----------
async function pbkdf2(password, salt, iterations) {
  const key = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits']);
  return crypto.subtle.deriveBits({ name: 'PBKDF2', salt, iterations, hash: 'SHA-256' }, key, 256);
}
function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) out |= a[i] ^ b[i];
  return out === 0;
}
export async function hashPassword(password) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const bits = await pbkdf2(password, salt, 100000);
  return 'pbkdf2$100000$' + b64(salt) + '$' + b64(new Uint8Array(bits));
}
export async function verifyPassword(password, stored) {
  try {
    const parts = String(stored).split('$');
    if (parts.length !== 4 || parts[0] !== 'pbkdf2') return false;
    const iterations = parseInt(parts[1], 10);
    const salt = fromB64(parts[2]);
    const expected = fromB64(parts[3]);
    const bits = new Uint8Array(await pbkdf2(password, salt, iterations));
    return timingSafeEqual(bits, expected);
  } catch (e) {
    return false;
  }
}

// ---------- Session (signed cookie) ----------
async function hmac(secret, data) {
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(data));
  return b64url(new Uint8Array(sig));
}
export async function makeSession(env, email) {
  const payload = { email: String(email).toLowerCase(), iat: Date.now(), exp: Date.now() + 30 * 86400000 };
  const body = b64url(enc.encode(JSON.stringify(payload)));
  const sig = await hmac(env.SESSION_SECRET, body);
  return body + '.' + sig;
}
export async function readSession(env, token) {
  if (!token || token.indexOf('.') < 0) return null;
  const idx = token.indexOf('.');
  const body = token.slice(0, idx);
  const sig = token.slice(idx + 1);
  const expect = await hmac(env.SESSION_SECRET, body);
  if (sig !== expect) return null;
  let payload;
  try { payload = JSON.parse(dec.decode(fromB64url(body))); } catch (e) { return null; }
  if (!payload || !payload.exp || payload.exp < Date.now()) return null;
  return payload;
}

// ---------- Cookie helpers ----------
const COOKIE = 'ph_session';
export function getCookie(request, name) {
  const raw = request.headers.get('cookie') || '';
  const m = raw.match(new RegExp('(?:^|;\\s*)' + name + '=([^;]+)'));
  return m ? decodeURIComponent(m[1]) : null;
}
export function sessionCookie(token) {
  return COOKIE + '=' + encodeURIComponent(token) + '; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=' + (30 * 86400);
}
export function clearCookie() {
  return COOKIE + '=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0';
}
export function withCookie(resp, cookie) {
  const r = new Response(resp.body, resp);
  r.headers.append('set-cookie', cookie);
  return r;
}

// ---------- User records (KV) ----------
export function userKey(email) { return 'user:' + String(email).toLowerCase(); }
export async function getUser(env, email) {
  const raw = await env.USERS.get(userKey(email));
  if (!raw) return null;
  try { return JSON.parse(raw); } catch (e) { return null; }
}
export async function putUser(env, user) {
  await env.USERS.put(userKey(user.email), JSON.stringify(user));
}
export async function currentUser(request, env) {
  if (!authConfigured(env)) return null;
  const token = getCookie(request, COOKIE);
  const sess = await readSession(env, token);
  if (!sess) return null;
  const user = await getUser(env, sess.email);
  if (!user) return null;
  return { name: user.name, email: user.email, plan: user.plan || 'free', phone: user.phone || '', createdAt: user.createdAt || null };
}
