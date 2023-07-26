import { z } from 'zod';

export const schema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production'] as const),
});

export const init = () => {
  const parsed = schema.safeParse(process.env);

  if (!parsed.success) {
    console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors);

    throw new Error('Invalid environment variables');
  }
};

export function getEnv() {
  return {
    MODE: process.env.NODE_ENV,
  };
}
