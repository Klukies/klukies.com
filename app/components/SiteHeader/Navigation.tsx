import { type ComponentProps } from 'react';

import { ContactLink, type ContactLinkProps } from '../ContactLinkList/ContactLink.tsx';

type SiteNavigationItemProps = ContactLinkProps;

const SiteNavigationItem = (props: SiteNavigationItemProps) => {
  return <ContactLink {...props} className="site-navigation__item" />;
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
