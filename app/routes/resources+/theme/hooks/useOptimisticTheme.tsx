import { parse } from '@conform-to/zod';
import { useFetchers } from '@remix-run/react';

import { schema } from '../helpers/schema.ts';
import { ROUTE_PATH } from '../index.tsx';

export const useOptimisticTheme = () => {
  const fetchers = useFetchers();
  const themeFetcher = fetchers.find((f) => f.formAction?.startsWith(ROUTE_PATH));

  if (themeFetcher && themeFetcher.formData) {
    const submission = parse(themeFetcher.formData, { schema });
    return submission.value?.theme;
  }
};
