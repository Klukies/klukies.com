import { cssBundleHref } from '@remix-run/css-bundle';
import { json, LoaderArgs, type LinksFunction } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';

import { Document } from './Document.tsx';
import { useTheme } from './routes/resources+/theme/index.tsx';
import tailwindStylesheetUrl from './styles/tailwind.css';
import { getEnv } from './utils/env.server.ts';
import { useNonce } from './utils/nonce-context.ts';
import { getRequestInfo } from './utils/request-info/index.ts';

export const links: LinksFunction = () => [
  // Preload CSS as a resource to avoid render blocking
  { rel: 'preload', href: tailwindStylesheetUrl, as: 'style' },
  { rel: 'stylesheet', href: tailwindStylesheetUrl },
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
];

export const loader = ({ request }: LoaderArgs) => {
  return json({ requestInfo: getRequestInfo(request), ENV: getEnv() });
};

export default function App() {
  const { ENV } = useLoaderData<typeof loader>();
  const nonce = useNonce();
  const theme = useTheme();

  return (
    <Document nonce={nonce} theme={theme} env={ENV}>
      <Outlet />
    </Document>
  );
}
