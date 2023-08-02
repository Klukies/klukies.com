import { useFetcher } from '@remix-run/react';

import { useOptimisticTheme } from '../hooks/useOptimisticTheme.tsx';
import { useThemeSwitchForm } from '../hooks/useThemeSwitchForm.tsx';
import { ROUTE_PATH, Theme } from '../index.tsx';

import { Icon } from '~/components/Icon/Icon.tsx';
import { type IconName } from '~/components/icons/name.js';
import { useIsHydrated } from '~/hooks/useIsHydrated.tsx';
import { useRoot } from '~/hooks/useRoot.tsx';
import { cn } from '~/utils/cn.ts';

interface ThemeSwitchButtonProps {
  theme: 'system' | Theme;
  nextTheme: 'system' | Theme;
}

const ThemeSwitchButton = ({ theme, nextTheme }: ThemeSwitchButtonProps) => {
  const name: IconName = theme === 'system' ? 'desktop' : theme === 'light' ? 'sun' : 'moon';
  const label = theme === 'system' ? 'System' : theme === 'light' ? 'Light' : 'Dark';

  return (
    <button
      type="submit"
      aria-label={`Switch theme to ${nextTheme}`}
      className={cn(
        'bg-transparent flex cursor-pointer rounded p-1 text-subtext0',
        'hover:text-text',
        'focus-visible:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text',
        'motion-safe:hover:transition-[color] motion-safe:hover:duration-300 motion-safe:hover:ease-in-out',
      )}
    >
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
    currentTheme === 'system' ? Theme.Light : currentTheme === Theme.Light ? Theme.Dark : 'system';

  return (
    <fetcher.Form method="POST" action={ROUTE_PATH} {...form.props}>
      {!isHydrated && <input type="hidden" name="redirectTo" value={path} />}
      <input type="hidden" name="theme" value={nextTheme} />
      <ThemeSwitchButton theme={currentTheme} nextTheme={nextTheme} />
    </fetcher.Form>
  );
};
