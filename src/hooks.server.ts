import type { HandleServerError } from '@sveltejs/kit';
import { Toucan } from "toucan-js";
import type { Options } from 'toucan-js';

// https://github.com/robertcepa/toucan-js/blob/master/packages/toucan-js/README.md
const sentryOpts: Options = {
  dsn: "https://daba9e6b6cab4510bd348d43128e0efa@o240502.ingest.sentry.io/4505407503794176",
  tracesSampleRate: 1.0,
  requestDataOptions: {
    allowedHeaders: ['user-agent', 'CF-RAY', 'CF-Worker'],
  },
}

// https://kit.svelte.dev/docs/errors#unexpected-errors
export const handleError = (({ error, event }) => {
  console.error(error);
  const sentry = new Toucan({
    request: event.request,
    ...sentryOpts
  });
  sentry.captureException(error);

  return {
    message: 'Internal server error',
    code: error?.code ?? 'UNKNOWN'
  };
}) satisfies HandleServerError;
