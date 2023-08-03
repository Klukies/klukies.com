import type { V2_MetaFunction } from '@remix-run/node';

import { ContactLink } from '~/components/ContactLinkList/ContactLink.tsx';
import { ContactLinkList } from '~/components/ContactLinkList/ContactLinkList.tsx';
import { cn } from '~/utils/cn.ts';

export const meta: V2_MetaFunction = () => {
  return [{ title: 'Klukies' }, { name: 'description', content: "Klukies's personal website" }];
};

export default function Index() {
  return (
    <main className="m-auto max-w-2xl px-5 py-8">
      <article>
        <h1 className="mb-8 text-4xl font-bold">Klukies</h1>
        <p className="mb-4">Hey &#128075;, I'm Lukas, better known as Klukies</p>
        <p className="mb-4">
          Currently at{' '}
          <ContactLink
            id="company"
            variant="Company"
            className={cn(
              'inline-block text-text duration-300',
              'hover:font-medium',
              'motion-safe:transition-[font-weight] motion-safe:duration-300 motion-safe:ease-in-out',
            )}
          />
          <br />
          Passionate about accessibility & web fundamentals while building delightful web
          applications
        </p>
        <p className="mb-5">
          Beyond my digital pursuits, I unwind while working out, cooking, and playing board or
          video games with friends.
        </p>
        <hr className="mb-4 flex h-[2rem] justify-center border-none after:text-lg after:text-surface2 after:content-['~']" />
        <p className="mb-2">I'm active on</p>
        <ContactLinkList />
        <p>
          Feel free to reach out if you're interested in chatting, or explore my blog to see what
          problems I'm solving on a daily basis!
        </p>
      </article>
    </main>
  );
}
