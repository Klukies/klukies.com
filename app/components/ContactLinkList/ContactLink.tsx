import { Link, type LinkProps } from '@remix-run/react';

import { Icon, type IconProps } from '../Icon/Icon.tsx';
import { type IconName } from '../icons/name.js';

import { cn } from '~/utils/cn.ts';

type ContactLinkKeys = 'Company' | 'X' | 'GitHub' | 'Discord' | 'Instagram' | 'Email';

interface ContactLinkMapValues extends LinkProps {
  label: string;
  iconName?: IconName;
}

export interface ContactLinkProps extends Omit<LinkProps, 'to' | 'children'> {
  variant: ContactLinkKeys;
  size?: IconProps['size'];
  withLabel?: boolean;
}

export const contactLinksMap = new Map<ContactLinkKeys, ContactLinkMapValues>([
  ['Company', { to: 'https://www.inthepocket.com/', label: 'In The Pocket' }],
  ['X', { to: 'https://x.com/Klukies', label: 'X', iconName: 'x-logo' }],
  ['GitHub', { to: 'https://github.com/Klukies', label: 'GitHub', iconName: 'github-logo' }],
  [
    'Discord',
    {
      to: 'http://discordapp.com/users/203221870277820417',
      label: 'Discord',
      iconName: 'discord-logo',
    },
  ],
  [
    'Instagram',
    { to: 'https://www.instagram.com/klukies', label: 'Instagram', iconName: 'instagram-logo' },
  ],
  [
    'Email',
    { to: 'mailto:lukascornille@hotmail.com', label: 'Email', iconName: 'envelope-closed' },
  ],
]);

const contactLinkClassNames = cn(
  'relative block text-subtext0 no-underline',
  'after:absolute after:z-10 after:right-0 after:bottom-0 after:w-full after:h-px after:bg-text after:opacity-0',
  'hover:after:opacity-100 hover:text-text',
  'focus-visible:after:opacity-100 focus-visible:text-text focus-visible:outline-none',
  'motion-safe:transition-[color] motion-safe:duration-300 motion-safe:ease-in-out',
  'motion-safe:after:transition-opacity motion-safe:after:duration-300 motion-safe:after:ease-in-out',
);

export const ContactLink = ({
  variant,
  size,
  withLabel,
  className,
  ...props
}: ContactLinkProps) => {
  const { to, label, iconName } = contactLinksMap.get(variant)!;
  const externalLinkAttributes = { target: '_blank', rel: 'noopener norefferer' };

  if (withLabel) {
    return (
      <Link
        {...props}
        {...externalLinkAttributes}
        to={to}
        className={cn(contactLinkClassNames, className)}
      >
        {iconName ? (
          <Icon name={iconName} size={size}>
            {label}
          </Icon>
        ) : (
          label
        )}
      </Link>
    );
  }

  return (
    <Link
      {...props}
      {...externalLinkAttributes}
      to={to}
      aria-label={label}
      className={cn(contactLinkClassNames, className)}
    >
      {iconName ? <Icon name={iconName} size={size} /> : label}
    </Link>
  );
};
