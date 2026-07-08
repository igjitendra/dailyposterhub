// Cloudflare Pages Function: GitHub OAuth start for Decap CMS
// Route: /auth  (Decap opens this in a popup)
export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const redirectUri = url.origin + '/callback';
  const params = new URLSearchParams({
    client_id: env.GITHUB_OAUTH_ID,
    redirect_uri: redirectUri,
    scope: 'repo,user',
    state: crypto.randomUUID(),
    allow_signup: 'false',
  });
  return Response.redirect('https://github.com/login/oauth/authorize?' + params.toString(), 302);
}
