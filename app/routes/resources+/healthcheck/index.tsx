import { LoaderArgs } from '@remix-run/node';

export async function loader({ request }: LoaderArgs) {
  const host = request.headers.get('X-Forwarded-Host') ?? request.headers.get('host');
  const url = new URL('/', `http://${host}`);

  try {
    // If we can make a HEAD request to ourselves, we're healthy.
    const response = await fetch(url.toString(), { method: 'HEAD' });

    if (!response.ok) {
      throw new Error();
    }

    return new Response('OK');
  } catch (error: unknown) {
    console.error('healthcheck ❌', { error });
    return new Response('ERROR', { status: 500 });
  }
}
