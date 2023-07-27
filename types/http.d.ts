declare module 'http' {
  export interface ServerResponse {
    locals: {
      cspNonce: string;
    };
  }
}
