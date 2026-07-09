import { json, currentUser } from '../../_auth.js';

export async function onRequestGet({ request, env }) {
  const user = await currentUser(request, env);
  return json({ user: user || null });
}
