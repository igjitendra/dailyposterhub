import { json, readIndex } from '../_lib.js';

// GET /api/templates  -> public list of uploaded posters
export async function onRequestGet({ env }) {
  const list = await readIndex(env);
  return json(list);
}
