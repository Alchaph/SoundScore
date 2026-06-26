import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 30000,
  retries: 1,
  use: {
    baseURL: 'https://soundscore.chlarc.ch',
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
      'Origin': 'https://soundscore.chlarc.ch',
    },
  },
});
