import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  use: {
    baseURL: 'http://127.0.0.1:5173',
    launchOptions: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
      ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH, args: ['--no-sandbox', '--disable-dev-shm-usage', '--no-zygote'] }
      : {},
  },
  webServer: {
    command: 'npm run dev -- --host 127.0.0.1',
    url: 'http://127.0.0.1:5173',
    reuseExistingServer: false,
    env: {
      VITE_SUPABASE_URL: 'https://launch-test.supabase.co',
      VITE_SUPABASE_ANON_KEY: 'publishable-test-fixture',
      VITE_API_BASE_URL: 'https://api.launch-test.invalid/',
    },
  },
});
