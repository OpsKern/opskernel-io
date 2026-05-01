interface Env {
  TURNSTILE_SECRET_KEY: string;
}

interface TurnstileVerifyResponse {
  success: boolean;
  'error-codes': string[];
}

type PagesContext = {
  request: Request;
  env: Env;
};

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function onRequestPost({ request, env }: PagesContext): Promise<Response> {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return json({ error: 'Invalid request.' }, 400);
  }

  const email = formData.get('email')?.toString().trim();
  const token = formData.get('cf-turnstile-response')?.toString();

  if (!email) return json({ error: 'Email is required.' }, 400);
  if (!token) return json({ error: 'Bot check token missing.' }, 400);

  // Verify Turnstile token
  const verifyBody = new FormData();
  verifyBody.append('secret', env.TURNSTILE_SECRET_KEY);
  verifyBody.append('response', token);
  const ip = request.headers.get('CF-Connecting-IP');
  if (ip) verifyBody.append('remoteip', ip);

  const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: verifyBody,
  });
  const verifyData: TurnstileVerifyResponse = await verifyRes.json();

  if (!verifyData.success) {
    return json({ error: 'Bot check failed. Please try again.' }, 400);
  }

  // Proxy to Buttondown embed-subscribe
  const bdBody = new FormData();
  bdBody.append('email', email);

  const bdRes = await fetch('https://buttondown.com/api/emails/embed-subscribe/hookd', {
    method: 'POST',
    body: bdBody,
    redirect: 'manual',
  });

  // Buttondown returns 3xx redirect on success ("thanks") and "already subscribed" — both fine
  if (bdRes.status >= 200 && bdRes.status < 400) {
    return json({ ok: true });
  }

  return json({ error: 'Could not add you to the list. Please try again.' }, 502);
}
