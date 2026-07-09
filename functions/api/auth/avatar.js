import { json, currentUser, getUser, putUser } from '../../_auth.js';

// POST /api/auth/avatar  (multipart)  -> profile photo upload (logged-in user).
export async function onRequestPost({ request, env }) {
  const me = await currentUser(request, env);
  if (!me) return json({ error: 'unauthorized', message: 'पहले लॉगिन करें।' }, 401);
  if (!env.POSTERS) return json({ error: 'storage', message: 'स्टोरेज (R2) सेटअप नहीं है।' }, 501);

  let form;
  try { form = await request.formData(); } catch (e) { return json({ error: 'bad-form' }, 400); }
  const file = form.get('avatar');
  if (!file || typeof file === 'string') return json({ error: 'no-file', message: 'फोटो चुनें।' }, 400);
  if (file.size > 3 * 1024 * 1024) return json({ error: 'too-large', message: 'फोटो 3MB से छोटी होनी चाहिए।' }, 413);

  const okTypes = { 'image/jpeg': 'jpg', 'image/jpg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' };
  const ext = okTypes[file.type];
  if (!ext) return json({ error: 'type', message: 'सिर्फ़ JPG/PNG/WebP फोटो डालें।' }, 415);

  const safe = String(me.email).toLowerCase().replace(/[^a-z0-9]/g, '_');
  const key = 'avatars/' + safe + '-' + Date.now() + '.' + ext;
  await env.POSTERS.put(key, await file.arrayBuffer(), { httpMetadata: { contentType: file.type } });

  const user = await getUser(env, me.email);
  if (!user) return json({ error: 'not-found', message: 'यूज़र नहीं मिला।' }, 404);
  user.avatar = '/cdn/' + key;
  await putUser(env, user);
  return json({ ok: true, avatar: user.avatar });
}
