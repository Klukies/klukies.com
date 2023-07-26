import { ClientHintNames, clientHints } from './client-hints.ts';

const getCookieValue = (cookieString: string, name: ClientHintNames) => {
  const hint = clientHints[name];
  if (!hint) {
    throw new Error(`Unknown client hint: ${name}`);
  }

  const hintCookieValue = cookieString
    .split(';')
    .map((c) => c.trim())
    .find((c) => c.startsWith(hint.cookieName + '='))
    ?.split('=')[1];

  return hintCookieValue ? decodeURIComponent(hintCookieValue) : null;
};

/**
 *
 * @param request {Request} - optional request object (only used on server)
 * @returns an object with the client hints and their values
 */
export const getClientHints = (request?: Request) => {
  const cookieString =
    typeof document !== 'undefined'
      ? document.cookie
      : typeof request !== 'undefined'
      ? request.headers.get('Cookie') ?? ''
      : '';

  return Object.entries(clientHints).reduce<{
    [name in ClientHintNames]: (typeof clientHints)[name] extends {
      transform: (value: unknown) => infer ReturnValue;
    }
      ? ReturnValue
      : (typeof clientHints)[name]['fallback'];
  }>(
    (hints, [name, hint]) => {
      const hintName = name as ClientHintNames;
      const hintCookieValue = getCookieValue(cookieString, hintName) ?? hint.fallback;

      // @ts-expect-error - this is fine
      hints[hintName] = 'transform' in hint ? hint.transform(hintCookieValue) : hintCookieValue;

      return hints;
    },
    { theme: clientHints.theme.fallback, timeZone: clientHints.timeZone.fallback },
  );
};
