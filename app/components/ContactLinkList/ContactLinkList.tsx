import { type ComponentProps } from 'react';

import { ContactLink, type ContactLinkProps } from './ContactLink.tsx';

export type ContactLinksProps = ComponentProps<'ul'>;

const ContactLinkListItem = ({ variant }: Pick<ContactLinkProps, 'variant'>) => {
  return (
    <li>
      <ContactLink variant={variant} size="sm" withLabel />
    </li>
  );
};

export const ContactLinkList = (props: ContactLinksProps) => {
  return (
    <ul {...props} className="mb-4 flex list-none flex-wrap gap-x-4 gap-y-2">
      <ContactLinkListItem variant="GitHub" />
      <ContactLinkListItem variant="X" />
      <ContactLinkListItem variant="Discord" />
      <ContactLinkListItem variant="Instagram" />
      <ContactLinkListItem variant="Email" />
    </ul>
  );
};
