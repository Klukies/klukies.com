import { type ComponentProps } from 'react';

import { ContactLink, type ContactLinkProps } from '../ContactLinkList/ContactLink.tsx';

import { cn } from '~/utils/cn.ts';

type SiteNavigationItemProps = ContactLinkProps;

const SiteNavigationItem = (props: SiteNavigationItemProps) => {
  return (
    <ContactLink
      {...props}
      className={cn(
        'flex rounded p-1',
        'hover:after:opacity-0',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-text focus-visible:after:opacity-0',
        'motion-safe:hover:transition-[color] motion-safe:hover:duration-300 motion-safe:hover:ease-in-out motion-safe:focus-visible:transition-none',
      )}
    />
  );
};

type SiteNavigationProps = ComponentProps<'nav'>;

export const SiteNavigation = ({ children, ...props }: SiteNavigationProps) => {
  return (
    <nav className="flex gap-2" {...props}>
      {children}
    </nav>
  );
};

SiteNavigation.Item = SiteNavigationItem;
