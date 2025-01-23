import { Link } from '@remix-run/react';

import { cn } from '~/utils/cn.ts';

export const HomeLink = () => {
  return (
    <Link
      to="/"
      prefetch="intent"
      aria-label="Home"
      className={cn(
        'flex h-8 w-8 items-center justify-center rounded bg-text p-1 text-sm no-underline',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text',
      )}
    >
      <span role="img" className="mb-0.5">
        {'</>'}
      </span>
    </Link>
  );
};
