import { parse } from '@conform-to/zod';
import { json, redirect, type DataFunctionArgs } from '@remix-run/node';
import { useFetchers } from '@remix-run/react';
import { safeRedirect } from 'remix-utils';
import { z } from 'zod';

import { setTheme } from './theme.server.ts';

import { useRoot } from '~/hooks/useRoot.tsx';
import { useClientHints } from '~/utils/client-hints/useClientHints.tsx';

const ROUTE_PATH = '/resources/theme';

const ThemeFormSchema = z.object({
  redirectTo: z.string().optional(),
  theme: z.enum(['system', 'light', 'dark']),
});

export async function action({ request }: DataFunctionArgs) {
  const formData = await request.formData();
  const submission = parse(formData, {
    schema: ThemeFormSchema,
    acceptMultipleErrors: () => true,
  });
  if (!submission.value) {
    return json(
      {
        status: 'error',
        submission,
      } as const,
      { status: 400 },
    );
  }
  if (submission.intent !== 'submit') {
    return json({ status: 'success', submission } as const);
  }
  const { redirectTo, theme } = submission.value;

  const responseInit = {
    headers: { 'Set-Cookie': setTheme(theme === 'system' ? undefined : theme) },
  };
  if (redirectTo) {
    return redirect(safeRedirect(redirectTo), responseInit);
  } else {
    return json({ success: true }, responseInit);
  }
}

/**
 * If the user's changing their theme mode preference, this will return the
 * value it's being changed to.
 */
export function useOptimisticThemeMode() {
  const fetchers = useFetchers();
  const themeFetcher = fetchers.find((f) => f.formAction?.startsWith(ROUTE_PATH));

  if (themeFetcher && themeFetcher.formData) {
    const submission = parse(themeFetcher.formData, { schema: ThemeFormSchema });
    return submission.value?.theme;
  }
}

/**
 * @returns the user's theme preference, or the client hint theme if the user
 * has not set a preference.
 */
export function useTheme() {
  const clientHints = useClientHints();
  const { requestInfo } = useRoot();
  const optimisticMode = useOptimisticThemeMode();

  if (optimisticMode) {
    return optimisticMode === 'system' ? clientHints.theme : optimisticMode;
  }

  return requestInfo.userPreferences.theme ?? clientHints.theme;
}
