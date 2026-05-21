import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Use base: "/" for custom domain deployments.
  // Use base: "/repo-name/" only for username.github.io/repo-name deployments.
  base: '/',
});
