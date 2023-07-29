import { type LinksFunction } from '@remix-run/node';
import { Links, LiveReload, Meta, Scripts, ScrollRestoration } from '@remix-run/react';
import { type ReactNode } from 'react';

import { ClientHintsCheck } from '../../utils/client-hints/index.ts';
import { type getEnv } from '../../utils/env.server.ts';
import { SiteHeader } from '../SiteHeader/SiteHeader.tsx';

import styles from './Document.css';

import { Theme } from '~/routes/resources+/theme/index.tsx';

export interface DocumentProps {
  nonce: string;
  theme: Theme;
  children: ReactNode;
  env?: ReturnType<typeof getEnv>;
}

const links: LinksFunction = () => [...SiteHeader.links(), { rel: 'stylesheet', href: styles }];

export const Document = ({ nonce, theme = Theme.Light, env, children }: DocumentProps) => {
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

Document.links = links;
