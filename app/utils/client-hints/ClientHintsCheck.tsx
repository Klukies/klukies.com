import { useRevalidator } from '@remix-run/react';
import { useEffect } from 'react';

import { clientHints } from './client-hints.ts';

/**
 * @returns inline script element that checks for client hints and sets cookies
 * if they are not set then reloads the page if any cookie was set to an
 * inaccurate value.
 */
export function ClientHintsCheck({ nonce }: { nonce: string }) {
  const { revalidate } = useRevalidator();

  useEffect(() => {
    const themeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleThemeChange = () => {
      document.cookie = `${clientHints.theme.cookieName}=${themeQuery.matches ? 'dark' : 'light'}`;
      revalidate();
    };

    themeQuery.addEventListener('change', handleThemeChange);

    return () => themeQuery.removeEventListener('change', handleThemeChange);
  }, [revalidate]);

  return (
    <script
      nonce={nonce}
      dangerouslySetInnerHTML={{
        __html: `
const cookies = document.cookie.split(';').map(c => c.trim()).reduce((acc, cur) => {
	const [key, value] = cur.split('=');
	acc[key] = value;
	return acc;
}, {});
let cookieChanged = false;
const hints = [
${Object.values(clientHints)
  .map((hint) => {
    const cookieName = JSON.stringify(hint.cookieName);
    return `{ name: ${cookieName}, actual: String(${hint.getValueCode}), cookie: cookies[${cookieName}] }`;
  })
  .join(',\n')}
];
for (const hint of hints) {
	if (decodeURIComponent(hint.cookie) !== hint.actual) {
		cookieChanged = true;
		document.cookie = encodeURIComponent(hint.name) + '=' + encodeURIComponent(hint.actual) + ';path=/';
	}
}
// if the cookie changed, reload the page, unless the browser doesn't support
// cookies (in which case we would enter an infinite loop of reloads)
if (cookieChanged && navigator.cookieEnabled) {
	window.location.reload();
}
			`,
      }}
    />
  );
}
