import crypto from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';

import { createRequestHandler } from '@remix-run/express';
import { broadcastDevReady } from '@remix-run/node';
import address from 'address';
import chalk from 'chalk';
import { watch } from 'chokidar';
import closeWithGrace from 'close-with-grace';
import compression from 'compression';
import express, { static as expressStatic } from 'express';
import getPort, { portNumbers } from 'get-port';
import helmet from 'helmet';
import morgan, { token } from 'morgan';

import * as remixBuild from '../build/index.js';

const MODE = process.env.NODE_ENV;
const BUILD_PATH = '../build/index.js';
const build = remixBuild;
let devBuild = build;
const app = express();
const getHost = (req) => {
  return req.get('X-Forwarded-Host') ?? req.get('host') ?? '';
};
app.use((req, res, next) => {
  const proto = req.get('X-Forwarded-Proto');
  const host = getHost(req);
  if (proto === 'http') {
    res.set('X-Forwarded-Proto', 'https');
    res.redirect(`https://${host}${req.originalUrl}`);
    return;
  }
  next();
});
app.use((req, res, next) => {
  if (req.path.endsWith('/') && req.path.length > 1) {
    const query = req.url.slice(req.path.length);
    const safepath = req.path.slice(0, -1).replace(/\/+/g, '/');
    res.redirect(301, safepath + query);
  } else {
    next();
  }
});
app.use(compression());
app.disable('x-powered-by');
app.use('/build', expressStatic('public/build', { immutable: true, maxAge: '1y' }));
app.use('/fonts', expressStatic('public/fonts', { immutable: true, maxAge: '1y' }));
app.use(expressStatic('public', { maxAge: '1h' }));
token('url', (req) => decodeURIComponent(req.url ?? ''));
app.use(morgan('tiny'));
app.use((_req, res, next) => {
  res.locals.cspNonce = crypto.randomBytes(16).toString('hex');
  next();
});
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: {
      directives: {
        'connect-src': [
          MODE === 'development' ? 'ws:' : null,
          process.env.SENTRY_DSN ? '*.ingest.sentry.io' : null,
          "'self'",
        ].filter(Boolean),
        'font-src': ["'self'"],
        'frame-src': ["'self'"],
        'img-src': ["'self'", 'data:'],
        'script-src': ["'strict-dynamic'", "'self'", (_, res) => `'nonce-${res.locals.cspNonce}'`],
        'script-src-attr': [(_, res) => `'nonce-${res.locals.cspNonce}'`],
        'upgrade-insecure-requests': null,
      },
    },
  }),
);
const getRequestHandler = (build2) => {
  const getLoadContext = (_, res) => ({ cspNonce: res.locals.cspNonce });
  return createRequestHandler({ build: build2, mode: MODE, getLoadContext });
};
app.all(
  '*',
  MODE === 'development'
    ? (...args) => getRequestHandler(devBuild)(...args)
    : getRequestHandler(build),
);
const desiredPort = Number(process.env.PORT ?? 3e3);
const portToUse = await getPort({ port: portNumbers(desiredPort, desiredPort + 100) });
const server = app.listen(portToUse, () => {
  const addy = server.address();
  const portUsed =
    desiredPort === portToUse ? desiredPort : addy && typeof addy === 'object' ? addy.port : 0;
  if (portUsed !== desiredPort) {
    console.warn(
      chalk.yellow(
        `\u26A0\uFE0F  Port ${desiredPort} is not available, using ${portUsed} instead.`,
      ),
    );
  }
  console.log(`\u{1F680}  We have liftoff!`);
  const localUrl = `http://localhost:${portUsed}`;
  let lanUrl = null;
  const localIp = address.ip();
  if (/^10[.]|^172[.](1[6-9]|2[0-9]|3[0-1])[.]|^192[.]168[.]/.test(localIp)) {
    lanUrl = `http://${localIp}:${portUsed}`;
  }
  console.log(
    `
${chalk.bold('Local:')}            ${chalk.cyan(localUrl)}
${lanUrl ? `${chalk.bold('On Your Network:')}  ${chalk.cyan(lanUrl)}` : ''}
${chalk.bold('Press Ctrl+C to stop')}
		`.trim(),
  );
  if (MODE === 'development') {
    void broadcastDevReady(build);
  }
});
closeWithGrace(async () => {
  await new Promise((resolve, reject) => {
    server.close((e) => (e ? reject(e) : resolve('ok')));
  });
});
if (MODE === 'development') {
  const reloadBuild = async () => {
    devBuild = await import(`${BUILD_PATH}?update=${Date.now()}`);
    void broadcastDevReady(devBuild);
  };
  const dirname = path.dirname(fileURLToPath(import.meta.url));
  const watchPath = path.join(dirname, BUILD_PATH).replace(/\\/g, '/');
  const watcher = watch(watchPath, { ignoreInitial: true });
  watcher.on('all', reloadBuild);
}
//# sourceMappingURL=index.js.map
