import { Theme } from '~/routes/resources+/theme/index.tsx';

export type ClientHintNames = keyof typeof clientHints;

export const clientHints = {
  theme: {
    cookieName: 'CH-prefers-color-scheme',
    getValueCode: `window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'`,
    fallback: Theme.Light,
    transform: (value: string) => (value === 'dark' ? Theme.Dark : Theme.Light),
  },
  timeZone: {
    cookieName: 'CH-time-zone',
    getValueCode: `Intl.DateTimeFormat().resolvedOptions().timeZone`,
    fallback: 'UTC',
  },
};
