import { type Theme } from '~/routes/resources+/theme/theme.server.ts';

export type ClientHintNames = keyof typeof clientHints;

export const clientHints = {
  theme: {
    cookieName: 'CH-prefers-color-scheme',
    getValueCode: `window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'`,
    fallback: 'light' as const satisfies Theme,
    transform: (value: string) => (value === 'dark' ? 'dark' : 'light') satisfies Theme,
  },
  timeZone: {
    cookieName: 'CH-time-zone',
    getValueCode: `Intl.DateTimeFormat().resolvedOptions().timeZone`,
    fallback: 'UTC',
  },
};
