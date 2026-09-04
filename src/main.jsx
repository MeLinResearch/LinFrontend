import React, { useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { REPORT_CSS, REPORT_HTML, initReportWires } from './sampleReport.generated.js';
import './index.css';
import { hasSupabaseConfig, supabase } from './supabaseClient';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

function CheckIcon({ className = 'h-5 w-5 text-indigo-600 shrink-0 mt-0.5' }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 10.5l3.5 3.5L15 6.5" />
    </svg>
  );
}

function ShieldIcon({ className = 'h-4 w-4 text-white' }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 2l6 2v5c0 4-2.5 7-6 9-3.5-2-6-5-6-9V4l6-2z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 10l1.5 1.5L13 7.5" />
    </svg>
  );
}

function SampleReport() {
  const hostRef = React.useRef(null);

  React.useEffect(() => {
    const stage = hostRef.current && hostRef.current.querySelector('.lf-stage');
    return initReportWires(stage);
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: REPORT_CSS }} />
      {/* Generated, trusted markup from the engine repository - see
          src/sampleReport.generated.js. Not user input. */}
      <div ref={hostRef} className="lf-embed" dangerouslySetInnerHTML={{ __html: REPORT_HTML }} />
    </>
  );
}

function Eyebrow({ children }) {
  return <p className="text-xs font-semibold uppercase tracking-wider text-indigo-700">{children}</p>;
}

function useAuth() {
  const [session, setSession] = useState(null);
  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => setSession(data.session ?? null));
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, nextSession) => setSession(nextSession));
    return () => authListener.subscription.unsubscribe();
  }, []);
  return { user: session?.user ?? null };
}

function ConfigError() {
  const missing = useMemo(() => {
    const names = [];
    if (!import.meta.env.VITE_SUPABASE_URL) names.push('VITE_SUPABASE_URL');
    if (!import.meta.env.VITE_SUPABASE_ANON_KEY) names.push('VITE_SUPABASE_ANON_KEY');
    if (!import.meta.env.VITE_API_BASE_URL) names.push('VITE_API_BASE_URL');
    return names;
  }, []);
  if (!missing.length) return null;
  return <p className="mt-4 text-sm text-rose-700">Configuration error: missing {missing.join(', ')}.</p>;
}

function Layout({ children, user, onSignOut }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-slate-200/70">
        <nav className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600">
              <ShieldIcon />
            </span>
            <span className="text-lg font-semibold tracking-tight text-slate-900">LinForensics</span>
          </Link>
          <div className="flex items-center gap-6 text-sm">
            <Link to="/pricing" className="text-slate-600 hover:text-slate-900 transition-colors">Pricing</Link>
            <Link to="/privacy" className="text-slate-600 hover:text-slate-900 transition-colors">Privacy</Link>
            <Link to="/terms" className="text-slate-600 hover:text-slate-900 transition-colors">Terms</Link>
            {user ? <Link to="/app" className="text-slate-600 hover:text-slate-900 transition-colors">Run Report</Link> : null}
            {user ? (
              <>
                <span className="text-slate-600 hidden md:inline">{user.email}</span>
                <button onClick={onSignOut} className="text-slate-600 hover:text-slate-900 transition-colors">Sign out</button>
              </>
            ) : (
              <Link to="/auth" className="text-slate-600 hover:text-slate-900 transition-colors">Log in</Link>
            )}
            <Link
              to="/pricing"
              className="inline-flex items-center rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            >
              Start Review
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-slate-200 bg-white mt-16">
        <div className="max-w-5xl mx-auto px-6 py-10 grid gap-8 md:grid-cols-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-indigo-600">
                <ShieldIcon className="h-3.5 w-3.5 text-white" />
              </span>
              <p className="text-base font-semibold tracking-tight">LinForensics</p>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Decision-support software for structured communication review.
            </p>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Links</p>
            <Link to="/pricing" className="text-slate-600 hover:text-slate-900 transition-colors">Pricing</Link>
            <Link to="/privacy" className="text-slate-600 hover:text-slate-900 transition-colors">Privacy</Link>
            <Link to="/terms" className="text-slate-600 hover:text-slate-900 transition-colors">Terms</Link>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            LinForensics does not provide legal, medical, mental health, emergency, or regulated professional advice, and does not make findings or determinations.
          </p>
        </div>
      </footer>
    </div>
  );
}

function HomePage(props) {
  const steps = [
    ['Submit message text', 'Paste or upload the chat and message text you want to review.'],
    ['LinForensics organizes the evidence', 'LinForensics identifies cited excerpts and labels candidate communication patterns.'],
    ['Review the structured report', 'Receive an audit-friendly report formatted for independent human review.'],
  ];

  return (
    <Layout {...props}>
            <section className="bg-gradient-to-b from-white via-indigo-50/40 to-slate-50">
        <div className="max-w-5xl mx-auto px-6 py-20 md:py-24">
          <span className="inline-flex items-center rounded-full bg-indigo-50 text-indigo-700 text-xs font-medium uppercase tracking-wider px-3 py-1 ring-1 ring-indigo-100">
            Decision-support software
          </span>
          <h1 className="mt-5 text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05] text-slate-900 max-w-3xl text-balance">
            Structured communication review reports for human review
          </h1>
          <p className="mt-5 text-lg text-slate-600 max-w-2xl leading-relaxed">
            LinForensics helps organize chat and message text into cited, audit-friendly communication pattern reports.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs uppercase tracking-wider text-slate-500">
            <span>Cited excerpts</span>
            <span aria-hidden="true">·</span>
            <span>Audit-friendly structure</span>
            <span aria-hidden="true">·</span>
            <span>Human-reviewable</span>
          </div>
        </div>
      </section>

            <section className="bg-white border-t border-slate-200/70">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
          <Eyebrow>Deliverable</Eyebrow>
          <h2 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">
            What your report looks like
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed max-w-2xl">
            A complete example of what you receive. The notes point to where each part sits in
            the report. Sample content is synthetic.
          </p>

          <div className="mt-12">
            <SampleReport />
          </div>

          <p className="mt-12 text-sm text-slate-500">
            Structured JSON export for downstream use is coming soon.{' '}
            <a
              href="/sample-report.html"
              className="text-indigo-700 font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 rounded"
            >
              Open this sample in its own page
            </a>
            .
          </p>
        </div>
      </section>

            <section className="bg-gradient-to-b from-indigo-50/50 to-white border-y border-slate-200/70">
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">
            Run a review on your own messages
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed max-w-xl mx-auto">
            Paste or upload the text you want reviewed and get a report in the same format.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/pricing"
              className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            >
              Start Review
            </Link>
            <Link
              to="/pricing"
              className="rounded-xl border border-slate-200 bg-white/60 hover:bg-white hover:border-slate-300 px-5 py-3 font-medium text-slate-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

            <section className="bg-slate-50/60 border-b border-slate-200/70">
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
          <Eyebrow>Process</Eyebrow>
          <h2 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">How it works</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {steps.map(([title, body], i) => (
              <article key={title} className="rounded-2xl bg-white p-6 ring-1 ring-slate-200/70 h-full flex flex-col">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-white text-sm font-semibold mb-4">
                  {i + 1}
                </div>
                <h3 className="font-semibold text-slate-900">{title}</h3>
                <p className="mt-2 text-slate-600 leading-relaxed">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

function PricingPage(props) {
  const { user } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const included = [
    'Cited evidence snippets from submitted text',
    'Candidate communication pattern labels',
    'Audit-friendly structured report',
    'Human-review disclaimer included',
    'Self-service delivery',
  ];

  async function handleBuy() {
    setError('');
    if (!user) {
      navigate('/auth', { state: { fromBuy: true } });
      return;
    }
    if (!hasSupabaseConfig || !apiBaseUrl || !supabase) {
      setError('Configuration error: missing VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, or VITE_API_BASE_URL.');
      return;
    }
    setLoading(true);
    try {
      const { data } = await supabase.auth.getSession();
      const accessToken = data.session?.access_token;
      if (!accessToken) {
        setError('Please log in again.');
        return;
      }
      const response = await fetch(`${apiBaseUrl}/v1/billing/checkout`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (response.status === 401) {
        setError('Please log in again.');
        return;
      }
      if (response.status === 503) {
        setError('Billing is not configured yet.');
        return;
      }
      if (!response.ok) {
        setError('Checkout failed. Please try again.');
        return;
      }
      const body = await response.json();
      if (!body.checkout_url) {
        setError('Checkout failed. Please try again.');
        return;
      }
      window.location.href = body.checkout_url;
    } catch {
      setError('Checkout failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (location.state?.autoBuy && user) handleBuy();
  }, []);

  return (
    <Layout {...props}>
      <section className="bg-gradient-to-b from-white via-indigo-50/40 to-slate-50">
        <div className="max-w-3xl mx-auto px-6 py-20 md:py-24">
          <div className="text-center">
            <Eyebrow>Pricing</Eyebrow>
            <h1 className="mt-2 text-4xl md:text-5xl font-semibold tracking-tight text-slate-900">Pricing</h1>
            <p className="mt-3 text-slate-600">
              One clear product. No subscription. Pay once, receive your report.
            </p>
          </div>

          <div className="mt-10 max-w-xl mx-auto rounded-2xl bg-white p-8 ring-1 ring-slate-200 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_rgba(15,23,42,0.06)]">
            <h2 className="text-xl font-semibold text-slate-900">One Communication Review Report</h2>
            <p className="mt-1 text-xs uppercase tracking-wider text-slate-500">One-time, self-service</p>

            <div className="mt-5 flex items-baseline gap-2">
              <span className="text-5xl font-semibold tracking-tight text-slate-900">$49.99</span>
              <span className="text-sm text-slate-500">per report</span>
            </div>

            <p className="mt-4 text-slate-600 leading-relaxed">
              Purchase includes one self-service communication review report.
            </p>

            <ul className="mt-6 space-y-3 border-t border-slate-100 pt-6">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-700">
                  <CheckIcon />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={handleBuy}
              disabled={loading}
              className="mt-7 inline-flex w-full md:w-auto justify-center rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            >
              {loading ? 'Starting checkout...' : 'Buy Report'}
            </button>
            {error ? <p className="mt-4 text-sm text-rose-700">{error}</p> : null}
            <ConfigError />

                        <p className="mt-4 text-xs text-slate-500">After purchase, retain your receipt. Report access is handled through the LinForensics report system.</p>

          </div>

          <div className="mt-8 max-w-xl mx-auto rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200/70">
            <h3 className="font-semibold text-slate-900">Important notice</h3>
            <p className="mt-2 text-slate-600 leading-relaxed">
              LinForensics is decision-support software. It does not provide legal advice, medical advice, mental health advice, diagnoses, predictions, emergency support, or automated determinations.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function TermsPage(props) {
  return (
    <Layout {...props}>
      <section className="max-w-4xl mx-auto px-6 py-20 space-y-6">
        <div>
          <Eyebrow>Legal</Eyebrow>
          <h1 className="mt-2 text-4xl md:text-5xl font-semibold tracking-tight text-slate-900">Terms of Use</h1>
          <p className="mt-3 text-slate-500">Last updated: May 2026 placeholder, review before public launch</p>
        </div>
        <div className="rounded-2xl border border-amber-300 bg-amber-50 p-4 text-amber-900">
          Pre-launch notice: These placeholder terms are for development review only. Final terms must be reviewed and published before accepting live public purchases.
        </div>
        {sections.terms.map((s) => (
          <article key={s.t} className="rounded-2xl bg-white p-6 ring-1 ring-slate-200/70">
            <h2 className="font-semibold text-lg text-slate-900">{s.t}</h2>
            <p className="mt-2 text-slate-700 leading-relaxed">{s.b}</p>
          </article>
        ))}
      </section>
    </Layout>
  );
}

function PrivacyPage(props) {
  return (
    <Layout {...props}>
      <section className="max-w-4xl mx-auto px-6 py-20 space-y-6">
        <div>
          <Eyebrow>Legal</Eyebrow>
          <h1 className="mt-2 text-4xl md:text-5xl font-semibold tracking-tight text-slate-900">Privacy Notice</h1>
          <p className="mt-3 text-slate-500">Last updated: May 2026 placeholder, complete privacy policy will be published before public launch</p>
        </div>
        <div className="rounded-2xl border border-amber-300 bg-amber-50 p-4 text-amber-900">
          Pre-launch notice: This placeholder privacy notice is for development review only. A complete privacy policy must be reviewed and published before accepting live public submissions.
        </div>
        {sections.privacy.map((s) => (
          <article key={s.t} className="rounded-2xl bg-white p-6 ring-1 ring-slate-200/70">
            <h2 className="font-semibold text-lg text-slate-900">{s.t}</h2>
            <p className="mt-2 text-slate-700 leading-relaxed">{s.b}</p>
          </article>
        ))}
        <div className="rounded-2xl bg-slate-100 p-4 text-slate-700 ring-1 ring-slate-200/70">
          A fuller privacy policy covering specific data practices, retention policies, third-party processors, and user rights will be added before full public launch. This placeholder notice is not a complete or binding privacy policy.
        </div>
      </section>
    </Layout>
  );
}

function SuccessPage(props) {
  return (
    <Layout {...props}>
      <section className="max-w-3xl mx-auto px-6 py-20">
        <Eyebrow>Confirmation</Eyebrow>
        <h1 className="mt-2 text-4xl md:text-5xl font-semibold tracking-tight text-slate-900">Purchase received.</h1>
        <p className="mt-4 text-slate-700 leading-relaxed">
          Purchase received. Your report credit should be available shortly.
        </p>
        <div className="mt-6 rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200/70 text-slate-700 leading-relaxed">
          LinForensics is decision-support software. It does not provide legal advice, medical advice, mental health advice, diagnoses, predictions, emergency support, or automated determinations.
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/app"
            className="inline-flex rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          >
            Run Report
          </Link>
          <Link
            to="/"
            className="inline-flex rounded-xl border border-slate-300 px-5 py-3 font-medium text-slate-700 hover:bg-slate-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          >
            Return to home
          </Link>
        </div>
      </section>
    </Layout>
  );
}

function parseErrorDetail(body, fallback) {
  if (body && typeof body === 'object' && typeof body.detail === 'string' && body.detail.trim()) return body.detail;
  if (body && typeof body === 'object' && body.detail && typeof body.detail === 'object' && typeof body.detail.message === 'string' && body.detail.message.trim()) return body.detail.message;
  return fallback;
}

function sanitizeReport(value) {
  const blocked = ['audit', 'prompt', 'taxonomy', 'scoring', 'severity_table', 'internal', 'debug', 'raw', 'extraction', 'candidates', 'instances', 'version_lock'];
  if (Array.isArray(value)) return value.map((v) => sanitizeReport(v));
  if (!value || typeof value !== 'object') return value;
  return Object.entries(value).reduce((acc, [key, val]) => {
    const low = key.toLowerCase();
    if (blocked.some((term) => low.includes(term))) return acc;
    acc[key] = sanitizeReport(val);
    return acc;
  }, {});
}

function ReportRunnerPage(props) {
  const { user } = props;
  const [communicationText, setCommunicationText] = useState('');
  const [caseNickname, setCaseNickname] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [parsed, setParsed] = useState(null);
  const [report, setReport] = useState(null);
  const [acknowledgePartialTimestampCoverage, setAcknowledgePartialTimestampCoverage] = useState(false);

  const warnings = Array.isArray(parsed?.warnings) ? parsed.warnings : [];
  const requiresPartialTimestampAcknowledgement = warnings.includes('partial_timestamp_coverage');

  async function handleParseUpload() {
    setError('');
    setReport(null);
    const trimmed = communicationText.trim();
    if (!trimmed) {
      setError('Communication text is required.');
      setStatus('error');
      return;
    }
    if (!supabase || !apiBaseUrl) {
      setError('Configuration error.');
      setStatus('error');
      return;
    }
    setStatus('parsing');
    try {
      const { data } = await supabase.auth.getSession();
      const accessToken = data.session?.access_token;
      if (!accessToken) {
        setError('Please log in again.');
        setStatus('error');
        return;
      }
      const formData = new FormData();
      formData.append('pasted_text', trimmed);
      if (caseNickname.trim()) formData.append('case_nickname', caseNickname.trim());
      const response = await fetch(`${apiBaseUrl}/v1/reports/upload`, { method: 'POST', headers: { Authorization: `Bearer ${accessToken}` }, body: formData });
      let body = null;
      try { body = await response.json(); } catch {}
      if (response.status === 401) throw new Error('Please log in again.');
      if (response.status === 422) throw new Error(parseErrorDetail(body, 'Upload could not be parsed.'));
      if (response.status === 413) throw new Error('Upload is too large.');
      if (!response.ok) throw new Error('Upload failed. Please try again.');
      setParsed(body);
      setAcknowledgePartialTimestampCoverage(false);
      setStatus('parsed');
    } catch (err) {
      setError(err.message || 'Upload failed. Please try again.');
      setStatus('error');
    }
  }

  async function handleConfirmAndGenerate() {
    setError('');
    if (!parsed?.run_id || !parsed?.parse_fingerprint) {
      setError('Upload session not found. Please upload again.');
      setStatus('error');
      return;
    }
    if (!supabase || !apiBaseUrl) {
      setError('Configuration error.');
      setStatus('error');
      return;
    }
    setStatus('analyzing');
    try {
      const { data } = await supabase.auth.getSession();
      const accessToken = data.session?.access_token;
      if (!accessToken) throw new Error('Please log in again.');
      const response = await fetch(`${apiBaseUrl}/v1/reports/confirm-and-analyze`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          run_id: parsed.run_id,
          parse_fingerprint: parsed.parse_fingerprint,
          acknowledge_partial_timestamp_coverage: acknowledgePartialTimestampCoverage,
        }),
      });
      let body = null;
      try { body = await response.json(); } catch {}
      if (response.status === 401) throw new Error('Please log in again.');
      if (response.status === 402) throw new Error('No unused report credit is available. Please buy a report first.');
      if (response.status === 404) throw new Error('Upload session not found. Please upload again.');
      if (response.status === 409) throw new Error('Upload changed or expired. Please upload again.');
      if (response.status === 422) {
        const detail = typeof body?.detail === 'string' ? body.detail.toLowerCase() : '';
        if (detail.includes('acknowledge') || detail.includes('partial')) throw new Error('Please check the acknowledgement box.');
        throw new Error('Report generation failed. Please try again.');
      }
      if (response.status === 503) throw new Error('Report generation is not configured yet.');
      if (!response.ok) throw new Error('Report generation failed. Please try again.');
      setReport(body?.report ?? body);
      setStatus('completed');
    } catch (err) {
      setError(err.message || 'Report generation failed. Please try again.');
      setStatus('error');
    }
  }

  if (!user) {
    return (
      <Layout {...props}>
        <section className="max-w-3xl mx-auto px-6 py-20">
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900">Run Report</h1>
          <p className="mt-4 text-slate-700">You need to log in before running a report.</p>
          <Link to="/auth" className="mt-6 inline-flex rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 font-medium">Go to log in</Link>
        </section>
      </Layout>
    );
  }

  const sanitized = sanitizeReport(report);
  const reportSummary = report?.summary && typeof report.summary === 'object' ? report.summary : null;
  const reportPatternGroups = Array.isArray(report?.pattern_groups) ? report.pattern_groups : [];
  const isPublicBackendShape = !!(reportSummary && reportPatternGroups.length);
  const items = report?.signals ?? report?.findings ?? report?.items;
  const visibleTopLevel = [report?.title || report?.headline, typeof report?.summary === 'string' ? report.summary : null, report?.tier || report?.status, report?.next_steps, report?.disclaimer].filter(Boolean).length;
  const hasCards = Array.isArray(items) && items.length > 0;
  const hasStructuredReport = visibleTopLevel > 0 || hasCards;

  return (
    <Layout {...props}>
      <section className="max-w-4xl mx-auto px-6 py-16 space-y-6">
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900">Run Report</h1>
        <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200/70 space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-slate-800">Communication text</span>
            <textarea value={communicationText} onChange={(e) => setCommunicationText(e.target.value)} placeholder="Paste the conversation text you want reviewed." className="mt-2 w-full min-h-40 rounded-xl border border-slate-300 px-4 py-3" />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-800">Case nickname (optional)</span>
            <input value={caseNickname} onChange={(e) => setCaseNickname(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3" />
          </label>
          <button onClick={handleParseUpload} disabled={status === 'parsing' || status === 'analyzing'} className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 font-medium disabled:opacity-70">
            {status === 'parsing' ? 'Parsing...' : 'Parse Upload'}
          </button>
          <p className="text-xs text-slate-500">State: {status}</p>
          {error ? <p className="text-sm text-rose-700">{error}</p> : null}
        </div>

        {parsed ? (
          <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200/70 space-y-2">
            <h2 className="text-xl font-semibold text-slate-900">Parse Review</h2>
            <p className="text-slate-700">message_count: {parsed.message_count ?? 'n/a'}</p>
            <p className="text-slate-700">speaker_count: {parsed.speaker_count ?? 'n/a'}</p>
            <p className="text-slate-700">speakers: {Array.isArray(parsed.speakers) ? parsed.speakers.join(', ') : 'n/a'}</p>
            <p className="text-slate-700">
              timestamp_coverage: {parsed.timestamp_coverage == null
                ? 'n/a'
                : (typeof parsed.timestamp_coverage === 'string' || typeof parsed.timestamp_coverage === 'number' || typeof parsed.timestamp_coverage === 'boolean')
                    ? String(parsed.timestamp_coverage)
                    : JSON.stringify(parsed.timestamp_coverage)}
            </p>
            {parsed.date_range ? <p className="text-slate-700">date_range: {typeof parsed.date_range === 'string' ? parsed.date_range : JSON.stringify(parsed.date_range)}</p> : null}
            {warnings.length ? <p className="text-slate-700">warnings: {warnings.join(', ')}</p> : null}
            {parsed.preview ? <p className="text-slate-700 whitespace-pre-wrap">preview: {typeof parsed.preview === 'string' ? parsed.preview : JSON.stringify(parsed.preview)}</p> : null}
            {requiresPartialTimestampAcknowledgement ? (
              <label className="flex items-start gap-2 mt-2">
                <input type="checkbox" checked={acknowledgePartialTimestampCoverage} onChange={(e) => setAcknowledgePartialTimestampCoverage(e.target.checked)} className="mt-1" />
                <span className="text-sm text-slate-700">I understand some timestamps may be missing or incomplete.</span>
              </label>
            ) : null}
            <button onClick={handleConfirmAndGenerate} disabled={status === 'analyzing' || status === 'parsing'} className="mt-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 font-medium disabled:opacity-70">
              {status === 'analyzing' ? 'Generating...' : 'Confirm and Generate Report'}
            </button>
          </div>
        ) : null}

        {status === 'completed' && report ? (
          <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200/70 space-y-4">
            <h2 className="text-xl font-semibold text-slate-900">Report</h2>
            {isPublicBackendShape ? (
              <>
                {reportSummary?.overall_level ? <p className="text-slate-700">Status: {reportSummary.overall_level}</p> : null}
                {reportSummary?.plain_language_summary ? <p className="text-slate-700 whitespace-pre-wrap">{reportSummary.plain_language_summary}</p> : null}
                {reportSummary?.human_review_required ? <p className="text-sm text-amber-700">Human review is required before relying on this report.</p> : null}
                <div className="grid gap-3">
                  {reportPatternGroups.map((group, groupIndex) => (
                    <article key={`${group.public_category || 'group'}-${groupIndex}`} className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200/70 space-y-2">
                      {group?.public_category ? <h3 className="font-semibold text-slate-900">{group.public_category}</h3> : null}
                      {group?.description ? <p className="text-slate-700">{group.description}</p> : null}
                      {Array.isArray(group?.examples) && group.examples.length ? (
                        <div className="space-y-2">
                          {group.examples.map((example, exampleIndex) => (
                            <div key={`example-${groupIndex}-${exampleIndex}`} className="rounded-lg bg-white p-3 ring-1 ring-slate-200/70">
                              {example?.quote_text ? <p className="text-slate-800">“{example.quote_text}”</p> : null}
                              <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
                                {example?.speaker_label ? <span>Speaker: {example.speaker_label}</span> : null}
                                {example?.timestamp ? <span>Timestamp: {example.timestamp}</span> : null}
                                {example?.message_id ? <span>Message ID: {example.message_id}</span> : null}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </article>
                  ))}
                </div>
                {Array.isArray(report?.limitations) && report.limitations.length ? (
                  <div>
                    <h3 className="font-semibold text-slate-900">Limitations</h3>
                    <ul className="mt-2 list-disc pl-6 text-slate-700 space-y-1">
                      {report.limitations.map((item, idx) => <li key={`limitation-${idx}`}>{item}</li>)}
                    </ul>
                  </div>
                ) : null}
                {report?.disclaimer ? <p className="text-xs text-slate-500 whitespace-pre-wrap">{report.disclaimer}</p> : null}
              </>
            ) : hasStructuredReport ? (
              <>
                {report?.title || report?.headline ? <h3 className="text-lg font-semibold text-slate-900">{report.title || report.headline}</h3> : null}
                {typeof report?.summary === 'string' ? <p className="text-slate-700 whitespace-pre-wrap">{report.summary}</p> : null}
                {report?.tier || report?.status ? <p className="text-slate-700">Status: {report.tier || report.status}</p> : null}
                {Array.isArray(items) ? (
                  <div className="grid gap-3 md:grid-cols-2">
                    {items.map((item, i) => (
                      <article key={`${i}-${typeof item === 'string' ? item.slice(0, 20) : 'item'}`} className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200/70 text-slate-700">
                        {typeof item === 'string' ? item : item?.title || item?.label || item?.summary || 'Item available in technical output.'}
                      </article>
                    ))}
                  </div>
                ) : null}
                {report?.next_steps ? <p className="text-slate-700 whitespace-pre-wrap">Next steps: {Array.isArray(report.next_steps) ? report.next_steps.join(', ') : report.next_steps}</p> : null}
                {report?.disclaimer ? <p className="text-xs text-slate-500 whitespace-pre-wrap">{report.disclaimer}</p> : null}
              </>
            ) : (
              <>
                <p className="text-slate-700">Report generated successfully.</p>
                <details className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200/70">
                  <summary className="cursor-pointer font-medium text-slate-800">Technical report output</summary>
                  <pre className="mt-3 text-xs overflow-auto text-slate-700">{JSON.stringify(sanitized, null, 2)}</pre>
                </details>
              </>
            )}
          </div>
        ) : null}
      </section>
    </Layout>
  );
}

function AuthPage(props) {
  const { user } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const fromBuy = location.state?.fromBuy;

  useEffect(() => {
    if (user && fromBuy) navigate('/pricing', { state: { autoBuy: true } });
  }, [user, fromBuy, navigate]);

  async function run(mode) {
    setError('');
    setMessage('');
    if (!hasSupabaseConfig || !supabase) {
      setError('Authentication is not configured yet.');
      return;
    }
    const { error: authError } =
      mode === 'signup'
        ? await (async () => {
            const emailRedirectTo = `${window.location.origin}${window.location.pathname}#/auth`;
            return supabase.auth.signUp({
              email,
              password,
              options: { emailRedirectTo },
            });
          })()
        : await supabase.auth.signInWithPassword({ email, password });
    if (authError) {
      setError(authError.message);
      return;
    }
    setMessage(mode === 'signup' ? 'Account created. Check your email if confirmation is required.' : 'Signed in.');
  }

  return (
    <Layout {...props}>
      <section className="max-w-xl mx-auto px-6 py-20">
        <Eyebrow>Account</Eyebrow>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-slate-900">Log in or create an account</h1>
        {fromBuy ? <p className="mt-4 text-sm text-amber-700">Log in or create an account to buy a report.</p> : null}
        <ConfigError />
        <div className="mt-6 space-y-4">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full rounded-xl border border-slate-300 px-4 py-3" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full rounded-xl border border-slate-300 px-4 py-3" />
          <div className="flex gap-3">
            <button onClick={() => run('signin')} className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 font-medium">Log in</button>
            <button onClick={() => run('signup')} className="rounded-xl border border-slate-300 px-5 py-3 font-medium text-slate-700">Sign up</button>
          </div>
          {message ? <p className="text-sm text-emerald-700">{message}</p> : null}
          {error ? <p className="text-sm text-rose-700">{error}</p> : null}
        </div>
      </section>
    </Layout>
  );
}

const sections = {
  terms: [
    { t: '1. Nature of the Software', b: 'LinForensics is decision-support software only. It organizes and structures submitted message text into a report to assist human review. LinForensics does not provide legal advice, medical advice, mental health advice, investigative services, emergency support, or any form of professional or regulated advice. Nothing in any report generated by LinForensics should be interpreted as a legal finding, clinical assessment, or professional determination of any kind.' },
    { t: '2. User Responsibility', b: 'Users are solely responsible for reviewing, interpreting, and acting on any report generated by LinForensics. Reports are structured summaries and may contain errors, omissions, or mischaracterizations. All reports should be independently reviewed by a qualified professional before being relied upon for any purpose.' },
    { t: '3. Accuracy and Limitations', b: 'Reports generated by LinForensics may contain errors. AI-assisted analysis is not infallible and should not be treated as definitive. LinForensics makes no warranty, express or implied, as to the accuracy, completeness, or fitness for purpose of any report output.' },
    { t: '4. Emergency Situations', b: 'Do not use LinForensics for emergency situations. If you or someone you know is in immediate danger, contact emergency services. LinForensics is not equipped to provide crisis support or emergency response of any kind.' },
    { t: '5. Content Permissions', b: 'You must only upload or submit content you have lawful permission to process. By submitting content to LinForensics, you represent that you have all necessary rights or consents to submit that content for review. LinForensics bears no liability for unauthorized use of third-party content.' },
    { t: '6. Refunds', b: 'Completed, successfully generated reports may be non-refundable. Refunds may be considered in cases where a technical failure prevents delivery of a report. Refund eligibility will be assessed on a case-by-case basis. To inquire about a refund, contact lin.research@proton.me.' },
    { t: '7. Changes to These Terms', b: 'These terms are placeholder terms provided during pre-launch development. A complete, reviewed set of terms will be published before this software is made available to the public. These placeholder terms do not constitute a binding legal agreement.' },
  ],
  privacy: [
    { t: '1. Overview', b: 'This notice describes how LinForensics handles information submitted through the LinForensics communication review software. This is a placeholder notice intended for pre-launch development. A complete, reviewed privacy policy will be published before this software is made available to the public.' },
    { t: '2. Submitted Content', b: 'Text you submit to LinForensics may be processed by AI systems in order to generate your report. This content may include messages, chat logs, or other communications. You should consider the sensitivity of any content before submitting it.' },
    { t: '3. Sensitive Content', b: 'User submissions may include sensitive personal content. LinForensics does not knowingly solicit sensitive personal information beyond what is required to generate a requested report. Users are responsible for deciding what content to submit.' },
    { t: '4. Data Retention and Security', b: 'This notice does not make specific commitments regarding data deletion timelines, encryption standards, or retention periods. Those details will be addressed in the full privacy policy to be published at launch. Do not submit content on the assumption that it will be deleted within any particular timeframe.' },
    { t: '5. Third-Party Services', b: 'LinForensics may use third-party infrastructure and AI processing services to deliver the product. Submitted content may be processed by those services subject to their own terms and privacy policies. Details will be disclosed in the full privacy policy.' },
    { t: '6. Contact', b: 'Questions about privacy or data handling can be directed to lin.research@proton.me.' },
  ],
};

function App() {
  const { user } = useAuth();
  const onSignOut = async () => {
    if (supabase) await supabase.auth.signOut();
  };
  const sharedProps = { user, onSignOut };
  return (
    <Routes>
      <Route path="/" element={<HomePage {...sharedProps} />} />
      <Route path="/pricing" element={<PricingPage {...sharedProps} />} />
      <Route path="/privacy" element={<PrivacyPage {...sharedProps} />} />
      <Route path="/terms" element={<TermsPage {...sharedProps} />} />
      <Route path="/success" element={<SuccessPage {...sharedProps} />} />
      <Route path="/auth" element={<AuthPage {...sharedProps} />} />
      <Route path="/app" element={<ReportRunnerPage {...sharedProps} />} />
      <Route path="*" element={<HomePage {...sharedProps} />} />
    </Routes>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode><HashRouter><App /></HashRouter></React.StrictMode>);
