import { type ComponentProps } from 'react';

import { HomeLink } from './HomeLink.tsx';
import { SiteNavigation } from './Navigation.tsx';

import { ThemeSwitch } from '~/routes/resources+/theme/components/ThemeSwitch.tsx';

export type HeaderProps = ComponentProps<'header'>;

export const SiteHeader = (props: HeaderProps) => {
  return (
    <header className="flex justify-between p-5" {...props}>
      <HomeLink />
      <div className="flex gap-2">
        <SiteNavigation>
          <SiteNavigation.Item variant="X" />
          <SiteNavigation.Item variant="GitHub" />
        </SiteNavigation>
        <ThemeSwitch />
      </div>
    </header>
  );
};
