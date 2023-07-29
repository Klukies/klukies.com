import { parse } from '@conform-to/zod';
import { json, redirect, type ActionArgs } from '@remix-run/node';
import * as cookie from 'cookie';
import { safeRedirect } from 'remix-utils';

import { schema } from './helpers/schema.ts';

export const ROUTE_PATH = '/resources/theme';

export enum Theme {
  Light = 'light',
  Dark = 'dark',
}

const cookieName = 'theme';

export const getTheme = (request: Request) => {
  const cookieHeader = request.headers.get('Cookie');
  const parsed = cookieHeader ? cookie.parse(cookieHeader)[cookieName] : Theme.Light;

  if (parsed === Theme.Light || parsed === Theme.Dark) {
    return parsed;
  }

  return undefined;
};

export function setTheme(theme?: Theme) {
  if (theme) {
    return cookie.serialize(cookieName, theme, { path: '/' });
  }

  return cookie.serialize(cookieName, '', { path: '/', maxAge: 0 });
}

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const submission = parse(formData, { schema, acceptMultipleErrors: () => true });

  if (!submission.value) {
    return json({ status: 'error', submission }, { status: 400 });
  }

  const { redirectTo, theme } = submission.value;
  const headers = { 'Set-Cookie': setTheme(theme === 'system' ? undefined : theme) };

  if (redirectTo) {
    return redirect(safeRedirect(redirectTo), { headers });
  }

  return json({ success: true }, { headers });
};
