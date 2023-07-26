import { useRequestInfo } from '../request-info/index.ts';

export const useClientHints = () => useRequestInfo().clientHints;
