import type { HandleServerError } from '@sveltejs/kit';
import { Toucan } from "toucan-js";
import type { Options } from 'toucan-js';

const sentryOpts: Options = {
  dsn: "https://daba9e6b6cab4510bd348d43128e0efa@o240502.ingest.sentry.io/4505407503794176",
  tracesSampleRate: 1.0,
  requestDataOptions: {
    allowedHeaders: ['user-agent', 'CF-RAY', 'CF-Worker'],
  },
}

export const handleError = (({ error, event }) => {
  // example integration with https://sentry.io/
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
