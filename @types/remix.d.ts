// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { EntryContext } from '@remix-run/server-runtime';

declare module '@remix-run/server-runtime' {
  interface EntryContext {
    cspNonce?: string;
  }
}
