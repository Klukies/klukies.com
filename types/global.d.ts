/* eslint-disable no-var, @typescript-eslint/no-empty-interface */
import { type z } from 'zod';

import { type getEnv, type schema } from '~/utils/env.server.ts';

type Env = z.infer<typeof schema>;

declare global {
  declare var ENV: ReturnType<typeof getEnv>;

  namespace NodeJS {
    interface ProcessEnv extends Env {}
    interface ENV extends ReturnType<typeof getEnv> {}
  }
}

declare const ENV: ReturnType<typeof getEnv>;
