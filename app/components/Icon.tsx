import { type LinksFunction } from '@remix-run/node';
import { type ComponentProps } from 'react';

import href from './icons/sprite.svg';

import type { IconName } from '~/icon-name';

interface IconProps extends ComponentProps<'svg'> {
  name: IconName;
}

const links: LinksFunction = () => [{ rel: 'preload', href, as: 'image' }];

export const Icon = ({ name, ...props }: IconProps) => {
  return (
    <svg width="24" height="24" {...props}>
      <use href={`${href}#${name}`} />
    </svg>
  );
};

Icon.links = links;
