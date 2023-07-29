import { useOptimisticTheme } from './useOptimisticTheme.tsx';

import { useRoot } from '~/hooks/useRoot.tsx';
import { useClientHints } from '~/utils/client-hints/useClientHints.tsx';

/**
 * @returns the user's theme preference, or the client hint theme if the user
 * has not set a preference.
 */
export const useTheme = () => {
  const clientHints = useClientHints();
  const { requestInfo } = useRoot();
  const optimisticMode = useOptimisticTheme();

  if (optimisticMode) {
    return optimisticMode === 'system' ? clientHints.theme : optimisticMode;
  }

  return requestInfo.userPreferences.theme ?? clientHints.theme;
};
