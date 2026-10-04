import { test, expect } from '@playwright/test';

const user = { id: '550e8400-e29b-41d4-a716-446655440000', email: 'test@example.com' };
const parsed = {
  status: 'parsed', run_id: 'upload-test', parse_fingerprint: 'test-fingerprint',
  message_count: 2, speaker_count: 2, speakers: ['A', 'B'], warnings: [],
  timestamp_coverage: { with_timestamp: 2, missing_timestamp: 0 },
  date_range: { start: '2026-10-04', end: '2026-10-04' },
  preview: { first_messages: [{ speaker_label: 'A', text: 'Hello' }] },
};
const report = {
  report_type: 'public_customer_report',
  summary: { overall_level: 'Review recommended', plain_language_summary: 'Human review is recommended.', human_review_required: true },
  pattern_groups: [], limitations: ['Context may be incomplete.'], disclaimer: 'Decision support only.',
};

test.beforeEach(async ({ page }) => {
  await page.addInitScript(({ user }) => {
    localStorage.setItem('sb-launch-test-auth-token', JSON.stringify({
      access_token: 'fixture-token', refresh_token: 'fixture-refresh-token', token_type: 'bearer',
      expires_at: Math.floor(Date.now() / 1000) + 86400, expires_in: 86400, user,
    }));
  }, { user });
  await page.route('https://launch-test.supabase.co/**', route => route.fulfill({ json: user }));
});

async function parse(page, payload = parsed) {
  await page.route('**/v1/reports/upload', route => route.fulfill({ json: payload }));
  await page.goto('/#/app');
  await page.getByLabel('Communication text').fill('[2026-10-04 09:00] A: Hello\n[2026-10-04 09:01] B: Hi');
  await page.getByRole('button', { name: 'Parse Upload', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Parse Review' })).toBeVisible();
}

test('empty-pattern report renders its summary and downloads', async ({ page }) => {
  await parse(page);
  let calls = 0;
  await page.route('**/v1/reports/confirm-and-analyze', route => {
    calls += 1;
    return route.fulfill({ json: { status: 'completed', report } });
  });
  await page.getByRole('button', { name: 'Confirm and Generate Report' }).click();
  await expect(page.getByText('Status: Review recommended', { exact: true })).toBeVisible();
  await expect(page.getByText('Context may be incomplete.', { exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Confirm and Generate Report' })).toBeDisabled();
  const downloaded = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download report' }).click();
  expect((await downloaded).suggestedFilename()).toBe('linforensics-report.json');
  expect(calls).toBe(1);
});

test('editing source clears the previous parse review', async ({ page }) => {
  await parse(page);
  await page.getByLabel('Communication text').fill('New input');
  await expect(page.getByRole('heading', { name: 'Parse Review' })).not.toBeVisible();
  await expect(page.getByRole('button', { name: 'Confirm and Generate Report' })).not.toBeVisible();
});

test('timestamp warning requires acknowledgement', async ({ page }) => {
  await parse(page, { ...parsed, warnings: ['partial_timestamp_coverage'] });
  const generate = page.getByRole('button', { name: 'Confirm and Generate Report' });
  await expect(generate).toBeDisabled();
  await page.getByRole('checkbox').check();
  await expect(generate).toBeEnabled();
});

test('CSV uses the upload field rather than pasted text', async ({ page }) => {
  let body;
  await page.route('**/v1/reports/upload', route => {
    body = route.request().postData();
    return route.fulfill({ json: parsed });
  });
  await page.goto('/#/app');
  await page.getByLabel('Upload conversation file').setInputFiles({
    name: 'messages.csv', mimeType: 'text/csv',
    buffer: Buffer.from('timestamp,speaker_label,text\n2026-10-04 09:00,A,Hello\n2026-10-04 09:01,B,Hi'),
  });
  await page.getByRole('button', { name: 'Parse Upload', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Parse Review' })).toBeVisible();
  expect(body).toContain('name="file"');
  expect(body).not.toContain('name="pasted_text"');
});

test('backend acknowledgement error is shown clearly', async ({ page }) => {
  await parse(page);
  await page.route('**/v1/reports/confirm-and-analyze', route => route.fulfill({
    status: 422, json: { detail: { reason_code: 'partial_timestamp_coverage_acknowledgement_required' } },
  }));
  await page.getByRole('button', { name: 'Confirm and Generate Report' }).click();
  await expect(page.getByText('Please check the acknowledgement box.', { exact: true })).toBeVisible();
});

test('completed report survives page reload', async ({ page }) => {
  await page.addInitScript(({ user }) => sessionStorage.setItem(`lin-report-${user.id}`, 'upload-saved'), { user });
  await page.route('**/v1/reports/upload-saved', route => route.fulfill({ json: { status: 'completed', report } }));
  await page.goto('/#/app');
  await expect(page.getByText('Status: Review recommended', { exact: true })).toBeVisible();
});

test('checkout return checks credits rather than claiming payment', async ({ page }) => {
  await page.route('**/v1/billing/credits', route => route.fulfill({ json: { available: 1 } }));
  await page.goto('/#/success');
  await expect(page.getByText('Your report credit is ready.', { exact: true })).toBeVisible();
});

test('quoted HTML is displayed as text', async ({ page }) => {
  await parse(page);
  const dangerous = '<img src=x onerror="window.testXss=true">';
  await page.route('**/v1/reports/confirm-and-analyze', route => route.fulfill({ json: { status: 'completed', report: {
    ...report, pattern_groups: [{ public_category: 'Pressure', examples: [{ quote_text: dangerous }] }],
  } } }));
  await page.getByRole('button', { name: 'Confirm and Generate Report' }).click();
  await expect(page.getByText(`“${dangerous}”`, { exact: true })).toBeVisible();
  expect(await page.evaluate(() => window.testXss)).toBeUndefined();
});
