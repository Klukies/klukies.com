import { useForm } from '@conform-to/react';
import { parse } from '@conform-to/zod';

import { schema } from '../helpers/schema.ts';

export const useThemeSwitchForm = () => {
  return useForm({
    id: 'theme-switch',
    onValidate: ({ formData }) => parse(formData, { schema }),
  });
};
