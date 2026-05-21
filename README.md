# LinForensics Marketing Site

Static marketing frontend built with Vite + React + Tailwind.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Build output is generated in `dist/`.

## Deploy to GitHub Pages

1. Build the site:
   ```bash
   npm install
   npm run build
   ```
2. Deploy the contents of `dist/` to GitHub Pages.

## Vite base path notes

- For custom domain deployments, keep `base: "/"` in `vite.config.js`.
- For `username.github.io/repo-name` deployments, set `base` to `"/repo-name/"`.

## SPA routing fallback

This project uses `BrowserRouter` and creates `dist/404.html` by copying `dist/index.html` during build, enabling GitHub Pages fallback routing for static SPA URLs.
