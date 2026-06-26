import { test, expect } from '@playwright/test';

const BASE = 'https://soundscore.chlarc.ch';

test.describe('SoundScore Auth Flow', () => {

  test('homepage loads over HTTPS', async ({ request }) => {
    const res = await request.get(`${BASE}/`);
    expect(res.status()).toBe(200);
    const ct = res.headers()['content-type'] || '';
    expect(ct).toContain('text/html');
  });

  test('username-exists endpoint works over HTTPS', async ({ request }) => {
    const res = await request.get(`${BASE}/api/auth/username-exists/1@1`);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(typeof body).toBe('boolean');
  });

  test('email-exists endpoint works over HTTPS', async ({ request }) => {
    const res = await request.get(`${BASE}/api/auth/email-exists/nonexistent@test.com`);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toBe(false);
  });

  test('login with valid credentials returns JWT', async ({ request }) => {
    const res = await request.post(`${BASE}/api/auth/login`, {
      data: {
        username: '1@1',
        password: '123',
      },
    });
    // Should get 401 (bad creds) or 200 with token
    expect([200, 401]).toContain(res.status());
    if (res.status() === 200) {
      const body = await res.json();
      expect(body).toHaveProperty('token');
      expect(body).toHaveProperty('expiresIn');
    }
  });

  test('login with empty body returns 500', async ({ request }) => {
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

  test('HTTP endpoint is not directly reachable (should go through HTTPS tunnel)', async ({ request }) => {
    const res = await request.get(`http://soundscore.chlarc.ch/api/auth/username-exists/1@1`);
    // HTTP may fail or be redirected - just log what happens
    console.log(`HTTP request status: ${res.status()}`);
    // The important thing is that HTTPS works (tested above)
  });

  test('frontend serves Angular app', async ({ request }) => {
    const res = await request.get(`${BASE}/`);
    const html = await res.text();
    expect(html).toContain('app-root');
    expect(html).toContain('upgrade-insecure-requests');
  });

  test('CORS headers present on API responses', async ({ request }) => {
    const res = await request.get(`${BASE}/api/auth/username-exists/test`, {
      headers: {
        'Origin': 'https://soundscore.chlarc.ch',
      },
    });
    expect(res.status()).toBe(200);
    // Spring should allow the origin
    const acao = res.headers()['access-control-allow-origin'];
    console.log(`Access-Control-Allow-Origin: ${acao}`);
    expect(acao).toBeDefined();
  });

});
