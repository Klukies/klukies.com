import { useRouteLoaderData } from '@remix-run/react';

import { type loader } from '~/root.tsx';
import { invariant } from '~/utils/invariant.ts';

export function useRoot() {
  const data = useRouteLoaderData<typeof loader>('root')!;
  invariant(data?.requestInfo, 'No requestInfo found in root loader data');

  return data;
}
