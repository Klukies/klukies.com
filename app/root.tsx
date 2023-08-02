import { json, type LoaderArgs, type LinksFunction } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';

import { Document } from './components/Document/Document.tsx';
import { Icon } from './components/Icon/Icon.tsx';
import { useTheme } from './routes/resources+/theme/hooks/useTheme.tsx';
import tailwindStylesheetUrl from './styles/tailwind.css';
import { getEnv } from './utils/env.server.ts';
import { useNonce } from './utils/nonce-context.ts';
import { getRequestInfo } from './utils/request-info/index.ts';

export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
  // Preload icons and CSS as resources to avoid render blocking
  ...Icon.links(),
  { rel: 'preload', href: tailwindStylesheetUrl, as: 'style' },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap',
  },
  { rel: 'icon', type: 'image/svg+xml', href: '/favicons/favicon.svg' },
  { rel: 'stylesheet', href: tailwindStylesheetUrl },
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
