import type { LinksFunction, V2_MetaFunction } from '@remix-run/node';

import stylesheetHref from './index.css';

export const meta: V2_MetaFunction = () => {
  return [{ title: 'Klukies' }, { name: 'description', content: "Klukies's personal website" }];
};

export const links: LinksFunction = () => [
  { rel: 'preload', href: stylesheetHref },
  { rel: 'stylesheet', href: stylesheetHref },
];

export default function Index() {
  return (
    <main>
      <article>
        <h1>Klukies</h1>
        <p>Hey &#128075;, I'm Lukas, better known as Klukies</p>
        <p>
          Currently at <u>In The Pocket</u>
          <br />
          Passionate about accessibility & web fundamentals while building delightful web
          applications
        </p>
        <p>
          Beyond my digital pursuits, I unwind while working out, cooking, and playing board or
          video games with friends.
        </p>
      </article>
    </main>
  );
}
