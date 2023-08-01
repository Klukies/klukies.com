import { type LinksFunction } from '@remix-run/node';
import { type ComponentProps } from 'react';

import { ContactLink, type ContactLinkProps } from './ContactLink.tsx';
import stylesheetHref from './ContactLinkList.css';

export type ContactLinksProps = ComponentProps<'ul'>;

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: stylesheetHref }];

const ContactLinkListItem = ({ variant }: Pick<ContactLinkProps, 'variant'>) => {
  return (
    <li className="contact-link-list__item">
      <ContactLink variant={variant} withLabel />
    </li>
  );
};

export const ContactLinkList = (props: ContactLinksProps) => {
  return (
    <div className="contact-link-list__wrapper">
      <p>I'm active on</p>
      <ul {...props} className="contact-link-list">
        <ContactLinkListItem variant="GitHub" />
        <ContactLinkListItem variant="X" />
        <ContactLinkListItem variant="Discord" />
        <ContactLinkListItem variant="Instagram" />
        <ContactLinkListItem variant="Email" />
      </ul>
    </div>
  );
};

ContactLinkList.links = links;
