import { Link } from '@remix-run/react';

export const HomeLink = () => {
  return (
    <Link to="/" prefetch="intent" aria-label="Home" className="home">
      <span role="img" className="logo">
        {'</>'}
      </span>
    </Link>
  );
};
