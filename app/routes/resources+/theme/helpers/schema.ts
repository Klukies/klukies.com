import { z } from 'zod';

import { Theme } from '../index.tsx';

export const schema = z.object({
  redirectTo: z.string().optional(),
  theme: z.enum(['system', Theme.Light, Theme.Dark]),
});
