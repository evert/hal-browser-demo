import { Middleware } from '@curveball/core';

const allowOrigin = '*';
const allowHeaders = [
  'Content-Type',
  'User-Agent',
  'Authorization',
];

export default function(): Middleware {

  return (ctx, next) => {

    const origin = ctx.request.headers.get('Origin');
    if (origin) {
      // This is probably a browser, send CORS headers.
      ctx.response.headers.set('Access-Control-Allow-Origin', allowOrigin);
      ctx.response.headers.set('Access-Control-Allow-Headers', allowHeaders);
    }

    if (ctx.method !== 'OPTIONS') {
      // Not a CORS preflight
      return next();
    } else {
      // It's a CORS preflight
      ctx.status = 200;
      return undefined;
    }

  };

}
