import { useFetcher } from '@remix-run/react';

import { useOptimisticTheme } from '../hooks/useOptimisticTheme.tsx';
import { useThemeSwitchForm } from '../hooks/useThemeSwitchForm.tsx';
import { ROUTE_PATH, type Theme } from '../index.tsx';

import { Icon } from '~/components/Icon/Icon.tsx';
import { type IconName } from '~/components/icons/name.js';
import { useIsHydrated } from '~/hooks/useIsHydrated.tsx';
import { useRoot } from '~/hooks/useRoot.tsx';

interface ThemeSwitchButtonProps {
  theme: 'system' | Theme;
  nextTheme: 'system' | Theme;
}

const ThemeSwitchButton = ({ theme, nextTheme }: ThemeSwitchButtonProps) => {
  const name: IconName = theme === 'system' ? 'desktop' : theme === 'light' ? 'sun' : 'moon';
  const label = theme === 'system' ? 'System' : theme === 'light' ? 'Light' : 'Dark';

  return (
    <button type="submit" aria-label={`Switch theme to ${nextTheme}`}>
      <Icon name={name} aria-label={label} />
    </button>
  );
};

export const ThemeSwitch = () => {
  const { path, userPreferences } = useRoot().requestInfo;
  const isHydrated = useIsHydrated();

  const fetcher = useFetcher<{ redirectTo?: string; theme: string }>();
  const [form] = useThemeSwitchForm();

  const optimisticTheme = useOptimisticTheme();
  const currentTheme = optimisticTheme ?? userPreferences.theme ?? 'system';
  const nextTheme =
    currentTheme === 'system' ? 'light' : currentTheme === 'light' ? 'dark' : 'system';

  return (
    <fetcher.Form method="POST" action={ROUTE_PATH} className="theme-switch" {...form.props}>
      {!isHydrated && <input type="hidden" name="redirectTo" value={path} />}
      <input type="hidden" name="theme" value={nextTheme} />
      <ThemeSwitchButton theme={currentTheme} nextTheme={nextTheme} />
    </fetcher.Form>
  );
};
