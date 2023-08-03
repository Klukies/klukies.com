import { Links, LiveReload, Meta, Scripts, ScrollRestoration } from '@remix-run/react';
import { type ReactNode } from 'react';

import { ClientHintsCheck } from '../../utils/client-hints/index.ts';
import { type getEnv } from '../../utils/env.server.ts';
import { SiteHeader } from '../SiteHeader/SiteHeader.tsx';

import { Theme } from '~/routes/resources+/theme/index.tsx';

export interface DocumentProps {
  nonce: string;
  theme: Theme;
  children: ReactNode;
  env?: ReturnType<typeof getEnv>;
}

export const Document = ({ nonce, theme = Theme.Light, env, children }: DocumentProps) => {
  return (
    <html lang="en" className={theme}>
      <head>
        <ClientHintsCheck nonce={nonce} />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen bg-base text-base text-text sm:text-lg/normal">
        <SiteHeader />
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
