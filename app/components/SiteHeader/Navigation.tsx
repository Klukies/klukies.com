import { Link, type LinkProps } from '@remix-run/react';
import { type ComponentProps } from 'react';

interface SiteNavigationItemProps extends LinkProps {
  external?: boolean;
}

const SiteNavigationItem = ({ children, external, ...props }: SiteNavigationItemProps) => {
  return (
    <Link
      {...props}
      className="site-navigation__item"
      {...(external && { target: '_blank', rel: 'noopener norefferer' })}
    >
      {children}
    </Link>
  );
};

type SiteNavigationProps = ComponentProps<'nav'>;

export const SiteNavigation = ({ children, ...props }: SiteNavigationProps) => {
  return (
    <nav className="site-navigation" {...props}>
      {children}
    </nav>
  );
};

SiteNavigation.Item = SiteNavigationItem;
