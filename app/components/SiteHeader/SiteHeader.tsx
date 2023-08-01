import { type LinksFunction } from '@remix-run/node';
import { type ComponentProps } from 'react';

import { HomeLink } from './HomeLink.tsx';
import { SiteNavigation } from './Navigation.tsx';
import styles from './SiteHeader.css';

import { ThemeSwitch } from '~/routes/resources+/theme/components/ThemeSwitch.tsx';

export type HeaderProps = ComponentProps<'header'>;

const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

export const SiteHeader = (props: HeaderProps) => {
  return (
    <header className="site-header" {...props}>
      <HomeLink />
      <div className="actions">
        <SiteNavigation>
          <SiteNavigation.Item variant="X" />
          <SiteNavigation.Item variant="GitHub" />
        </SiteNavigation>
        <ThemeSwitch />
      </div>
    </header>
  );
};

SiteHeader.links = links;
