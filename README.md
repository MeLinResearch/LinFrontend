# LinForensics Website

Static marketing website for LinForensics.

Built with Vite, React, and Tailwind.

## Commands

```bash
npm install
npm run build
npm run preview
```

## Deployment

This site is intended for GitHub Pages with a custom domain.

This repository contains only the public static website. It does not contain backend processing code, authentication code, report-generation code, payment webhook code, prompts, scoring logic, taxonomy files, or API keys.

## Sample report page

`public/sample-report.html` is a standalone, self-contained page served at
`/sample-report.html` and linked from the "Report includes" section of the home
page. Vite copies `public/` into `dist/` verbatim, so it needs no build step and
does not go through the React app or Tailwind.

It is **generated, not hand-edited**. The source lives in the `reports/`
directory of the engine repository, which renders it from real engine output.
To refresh it, run there:

```bash
python reports/build_sample_case.py --engine-root .
python reports/generate_sample_report.py --mode annotated \
    --site-link "https://liforensics.com/" \
    --out /path/to/LinFrontend/public/sample-report.html
```

Then commit the updated file here. Do not edit it by hand — the next
regeneration overwrites it.

The page is checked before publication: the engine repository's
`tests/test_sample_report_redaction.py` asserts it contains no taxonomy label
codes, scoring spec versions, internal scoring fields or model names, and that
the human-review disclaimer is present.
