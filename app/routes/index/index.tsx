import type { LinksFunction, V2_MetaFunction } from '@remix-run/node';

import stylesheetHref from './index.css';

import { ContactLink } from '~/components/ContactLinkList/ContactLink.tsx';
import { ContactLinkList } from '~/components/ContactLinkList/ContactLinkList.tsx';
import { Icon } from '~/components/Icon/Icon.tsx';

export const meta: V2_MetaFunction = () => {
  return [{ title: 'Klukies' }, { name: 'description', content: "Klukies's personal website" }];
};

export const links: LinksFunction = () => [
  ...ContactLinkList.links(),
  { rel: 'stylesheet', href: stylesheetHref },
];

export default function Index() {
  return (
    <main>
      <article>
        <h1>Klukies</h1>
        <p>Hey &#128075;, I'm Lukas, better known as Klukies</p>
        <p>
          Currently at <ContactLink id="company" variant="Company" />
          <br />
          Passionate about accessibility & web fundamentals while building delightful web
          applications
        </p>
        <p>
          Beyond my digital pursuits, I unwind while working out, cooking, and playing board or
          video games with friends.
        </p>
        <Icon id="hr" name="inter-tilde" role="presentation" />
        <ContactLinkList />
        <p>
          Feel free to reach out if you're interested in chatting, or explore my blog to see what
          problems I'm solving on a daily basis!
        </p>
      </article>
    </main>
  );
}
