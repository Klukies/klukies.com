import { useRouteLoaderData } from '@remix-run/react';

import { invariant } from '../invariant.ts';

import { type loader } from '~/root.tsx';

export function useRequestInfo() {
  const data = useRouteLoaderData<typeof loader>('root');
  invariant(data?.requestInfo, 'requestInfo is not defined in root loader data');

  return data.requestInfo;
}
