import { Link, type LinkProps } from '@remix-run/react';
import clsx from 'clsx';

import { Icon } from '../Icon/Icon.tsx';
import { type IconName } from '../icons/name.js';

type ContactLinkKeys = 'Company' | 'X' | 'GitHub' | 'Discord' | 'Instagram' | 'Email';

interface ContactLinkMapValues extends LinkProps {
  label: string;
  iconName?: IconName;
}

export interface ContactLinkProps extends Omit<LinkProps, 'to' | 'children'> {
  variant: ContactLinkKeys;
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

export const ContactLink = ({ variant, withLabel, className, ...props }: ContactLinkProps) => {
  const { to, label, iconName } = contactLinksMap.get(variant)!;
  const externalLinkAttributes = { target: '_blank', rel: 'noopener norefferer' };

  if (withLabel) {
    return (
      <Link
        {...props}
        {...externalLinkAttributes}
        className={clsx('contact-link', className)}
        to={to}
      >
        {iconName ? <Icon name={iconName}>{label}</Icon> : label}
      </Link>
    );
  }

  return (
    <Link
      {...props}
      {...externalLinkAttributes}
      className={clsx('contact-link', className)}
      to={to}
      aria-label={label}
    >
      {iconName ? <Icon name={iconName} /> : label}
    </Link>
  );
};
