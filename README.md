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

## Sample report

The home page embeds a complete sample of the customer report inline, with
callout boxes and drawn arrows pointing at the part of the report each one
describes. `public/sample-report.html` is the same report as a standalone page,
linked below the embed for direct sharing and printing.

Both are **generated, not hand-edited**. The source lives in the `reports/`
directory of the engine repository, which renders them from real engine output.
To refresh them, run there:

```bash
python reports/build_sample_case.py --engine-root .
python reports/generate_sample_report.py --mode embed \
    --out /path/to/LinFrontend/src/sampleReport.generated.js
python reports/generate_sample_report.py --mode annotated \
    --site-link "https://liforensics.com/" \
    --out /path/to/LinFrontend/public/sample-report.html
```

Then commit the updated files here. Do not edit either by hand — the next
regeneration overwrites them.

`src/sampleReport.generated.js` exports `REPORT_CSS`, `REPORT_HTML` and
`initReportWires(stage)`. The `SampleReport` component in `src/main.jsx` injects
the markup and calls `initReportWires` on mount, keeping its teardown for
unmount. The report's stylesheet is scoped to `.lf-embed` and carries no
element-level rules, so it cannot disturb Tailwind or the rest of the page, and
it inherits `font-family` so it always matches the site.

The pages are checked before publication by the engine repository's
`tests/test_sample_report_redaction.py` (no taxonomy codes, scoring versions,
internal fields or model names) and `tests/test_sample_report_structure.py`
(every callout points at a real anchor).
