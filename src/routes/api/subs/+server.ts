import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST = (async ({ request, platform }) => {
  const params = await request.formData()
  const store = platform.env.CLASH_SUBS.idFromName("clash-subs");

  if (!params.getAll("urls")) {
    throw error(400, 'urls is required');
  }

  return json({ urls: params.getAll("urls") });
}) satisfies RequestHandler;
