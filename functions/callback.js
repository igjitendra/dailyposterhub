// Cloudflare Pages Function: GitHub OAuth callback for Decap CMS
// Route: /callback  (GitHub redirects here with ?code=...)
export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  if (!code) return new Response('Missing code', { status: 400 });

  const resp = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { accept: 'application/json', 'content-type': 'application/json', 'user-agent': 'decap-cms-oauth' },
    body: JSON.stringify({
      client_id: env.GITHUB_OAUTH_ID,
      client_secret: env.GITHUB_OAUTH_SECRET,
      code,
    }),
  });
  const data = await resp.json();

  let status, content;
  if (data && data.access_token) {
    status = 'success';
    content = { token: data.access_token, provider: 'github' };
  } else {
    status = 'error';
    content = { message: (data && (data.error_description || data.error)) || 'OAuth failed' };
  }

  const payload = 'authorization:github:' + status + ':' + JSON.stringify(content);
  const html =
    '<!doctype html><html><head><meta charset="utf-8"><title>Login</title></head><body>' +
    '<p style="font-family:sans-serif">Login ' + status + '. यह विंडो बंद हो जाएगी।</p>' +
    '<script>(function(){' +
    'function receiveMessage(e){ if(window.opener){ window.opener.postMessage(' + JSON.stringify(payload) + ', e.origin); } window.removeEventListener("message", receiveMessage, false); }' +
    'window.addEventListener("message", receiveMessage, false);' +
    'if(window.opener){ window.opener.postMessage("authorizing:github", "*"); }' +
    '})();</script></body></html>';

  return new Response(html, { headers: { 'content-type': 'text/html; charset=utf-8' } });
}
