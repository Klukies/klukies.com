import { getClientHints } from '../client-hints/index.ts';

import { getTheme } from '~/routes/resources+/theme/theme.server.ts';

export const getRequestInfo = (request: Request) => ({
  clientHints: getClientHints(request),
  path: new URL(request.url).pathname,
  userPreferences: {
    theme: getTheme(request),
  },
});
