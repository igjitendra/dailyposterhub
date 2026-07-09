// Public payment-screenshot upload -> stores to R2 (POSTERS) and returns a /cdn URL.
// Agar R2 (POSTERS) bind nahi hai to 501 return karta hai; page manual-attach par fallback ho jaata hai.
function json(o, s) {
  return new Response(JSON.stringify(o), {
    status: s || 200,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}

export async function onRequestPost({ request, env }) {
  if (!env.POSTERS) return json({ error: 'storage not configured' }, 501);

  let form;
  try { form = await request.formData(); } catch (e) { return json({ error: 'bad form' }, 400); }

  const file = form.get('shot');
  if (!file || typeof file === 'string') return json({ error: 'no file' }, 400);
  if (file.size > 6 * 1024 * 1024) return json({ error: 'too large' }, 413);

  const okTypes = { 'image/jpeg': 'jpg', 'image/jpg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' };
  const ext = okTypes[file.type];
  if (!ext) return json({ error: 'unsupported type' }, 415);

  const day = new Date().toISOString().slice(0, 10);
  const key = 'payments/' + day + '/' + crypto.randomUUID() + '.' + ext;
  await env.POSTERS.put(key, await file.arrayBuffer(), { httpMetadata: { contentType: file.type } });

  return json({ url: '/cdn/' + key });
}
