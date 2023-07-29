import { useEffect, useState } from 'react';

let hydrating = true;

export const useIsHydrated = () => {
  const [hydrated, setHydrated] = useState(() => !hydrating);

  useEffect(() => {
    hydrating = false;
    setHydrated(true);
  }, []);

  return hydrated;
};
