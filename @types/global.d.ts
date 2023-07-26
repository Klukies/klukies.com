/* eslint-disable no-var, @typescript-eslint/no-empty-interface */
import { z } from 'zod';

import { getEnv, schema } from '~/utils/env.server.ts';

type Env = z.infer<typeof schema>;

declare global {
  declare var ENV: ReturnType<typeof getEnv>;

  namespace NodeJS {
    interface ProcessEnv extends Env {}
    interface ENV extends ReturnType<typeof getEnv> {}
  }
}

declare const ENV: ReturnType<typeof getEnv>;
