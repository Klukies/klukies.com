import { type LinksFunction } from '@remix-run/node';
import clsx from 'clsx';
import { type ComponentProps } from 'react';

import iconSpriteHref from '../icons/sprite.svg';

import stylesheetHref from './Icon.css';

import type { IconName } from '~/icon-name';

interface IconProps extends ComponentProps<'svg'> {
  name: IconName;
}

const links: LinksFunction = () => [
  { rel: 'preload', href: iconSpriteHref, as: 'image' },
  { rel: 'stylesheet', href: stylesheetHref },
];

export const Icon = ({ name, className, children, ...props }: IconProps) => {
  if (children) {
    return (
      <span className={clsx('icon', 'icon--with-children', className)}>
        <Icon name={name} {...props} />
        {children}
      </span>
    );
  }

  return (
    <svg width="24" height="24" {...props} className={clsx('icon', className)}>
      <use href={`${iconSpriteHref}#${name}`} />
    </svg>
  );
};

Icon.links = links;
