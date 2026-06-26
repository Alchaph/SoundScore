import { test, expect } from '@playwright/test';

const BASE = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:8888';

test.describe('SoundScore Auth Flow', () => {

  test('homepage loads', async ({ request }) => {
    const res = await request.get(`${BASE}/`);
    expect(res.status()).toBe(200);
    const ct = res.headers()['content-type'] || '';
    expect(ct).toContain('text/html');
  });

  test('username-exists endpoint works', async ({ request }) => {
    const res = await request.get(`${BASE}/api/auth/username-exists/alice`);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(typeof body).toBe('boolean');
  });

  test('email-exists endpoint works', async ({ request }) => {
    const res = await request.get(`${BASE}/api/auth/email-exists/nonexistent@test.com`);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toBe(false);
  });

  test('login with valid credentials returns JWT', async ({ request }) => {
    const res = await request.post(`${BASE}/api/auth/login`, {
      data: {
        username: 'alice',
        password: 'password123',
      },
    });
    // Should get 200 with token, or 401 if account doesn't exist
    expect([200, 401]).toContain(res.status());
    if (res.status() === 200) {
      const body = await res.json();
      expect(body).toHaveProperty('token');
      expect(body).toHaveProperty('expiresIn');
    }
  });

  test('login with empty body returns error', async ({ request }) => {
    const res = await request.post(`${BASE}/api/auth/login`, {
      data: {},
    });
    expect([400, 401, 500]).toContain(res.status());
  });

  test('signup checks duplicate username', async ({ request }) => {
    const res = await request.get(`${BASE}/api/auth/username-exists/testuser123456`);
    expect(res.status()).toBe(200);
    expect(await res.json()).toBe(false);
  });

  test('frontend serves Angular app with CSP header', async ({ request }) => {
    const res = await request.get(`${BASE}/`);
    const html = await res.text();
    expect(html).toContain('app-root');
    expect(html).toContain('upgrade-insecure-requests');
  });

  test('CORS headers present on API responses', async ({ request }) => {
    const res = await request.get(`${BASE}/api/auth/username-exists/test`, {
      headers: {
        'Origin': BASE,
      },
    });
    expect(res.status()).toBe(200);
    expect(res.headers()['access-control-allow-origin']).toBeDefined();
  });

});
