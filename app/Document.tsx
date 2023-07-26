import { Links, LiveReload, Meta, Scripts, ScrollRestoration } from '@remix-run/react';
import { ReactNode } from 'react';

import { Theme } from './routes/resources+/theme/theme.server.ts';
import { ClientHintsCheck } from './utils/client-hints/index.ts';
import { getEnv } from './utils/env.server.ts';

export interface DocumentProps {
  nonce: string;
  theme: Theme;
  children: ReactNode;
  env?: ReturnType<typeof getEnv>;
}

export const Document = ({ nonce, theme = 'light', env, children }: DocumentProps) => {
  return (
    <html lang="en" className={`${theme}`}>
      <head>
        <ClientHintsCheck nonce={nonce} />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <script
          nonce={nonce}
          dangerouslySetInnerHTML={{ __html: `window.ENV = ${JSON.stringify(env)}` }}
        />
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
        <LiveReload nonce={nonce} />
      </body>
    </html>
  );
};
