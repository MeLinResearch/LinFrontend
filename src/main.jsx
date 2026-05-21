import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './index.css';

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

function Eyebrow({ children }) {
  return <p className="text-xs font-semibold uppercase tracking-wider text-indigo-700">{children}</p>;
}

function Layout({ children }) {
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
            <Link to="/pricing" className="inline-flex items-center rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 text-sm font-medium transition-colors">Start Review</Link>
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
            <p className="text-sm text-slate-600 leading-relaxed">Decision-support software for structured communication review.</p>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Links</p>
            <Link to="/pricing" className="text-slate-600 hover:text-slate-900 transition-colors">Pricing</Link>
            <Link to="/privacy" className="text-slate-600 hover:text-slate-900 transition-colors">Privacy</Link>
            <Link to="/terms" className="text-slate-600 hover:text-slate-900 transition-colors">Terms</Link>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">LinForensics does not provide legal, medical, mental health, emergency, or regulated professional advice and does not make findings or determinations.</p>
        </div>
      </footer>
    </div>
  );
}

function HomePage() {
  const steps = [
    ['Submit message text', 'Provide the message text you want to review.'],
    ['LinForensics organizes the content', 'LinForensics organizes cited excerpts and labels candidate communication patterns.'],
    ['Review the report', 'Receive an audit-friendly report designed for independent human review.'],
  ];

  return (
    <Layout>
      <section className="bg-gradient-to-b from-white via-indigo-50/40 to-slate-50">
        <div className="max-w-5xl mx-auto px-6 py-20 md:py-24">
          <span className="inline-flex items-center rounded-full bg-indigo-50 text-indigo-700 text-xs font-medium uppercase tracking-wider px-3 py-1 ring-1 ring-indigo-100">Decision-support software</span>
          <h1 className="mt-5 text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05] text-slate-900 max-w-3xl text-balance">Structured communication review reports for human review</h1>
          <p className="mt-5 text-lg text-slate-600 max-w-2xl leading-relaxed">Organizes submitted message text into cited, audit-friendly reports that support independent human review.</p>
        </div>
      </section>
      <section className="bg-slate-50/60 border-y border-slate-200/70">
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
          <Eyebrow>Process</Eyebrow>
          <h2 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">How it works</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {steps.map(([title, body], i) => (
              <article key={title} className="rounded-2xl bg-white p-6 ring-1 ring-slate-200/70 h-full flex flex-col">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-white text-sm font-semibold mb-4">{i + 1}</div>
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

function PricingPage() {
  const included = ['Cited excerpts from submitted text', 'Candidate communication pattern labels', 'Audit-friendly structured report', 'Human-review disclaimer included', 'One self-service report'];

  return (
    <Layout>
      <section className="bg-gradient-to-b from-white via-indigo-50/40 to-slate-50">
        <div className="max-w-3xl mx-auto px-6 py-20 md:py-24">
          <div className="text-center">
            <Eyebrow>Pricing</Eyebrow>
            <h1 className="mt-2 text-4xl md:text-5xl font-semibold tracking-tight text-slate-900">Pricing</h1>
          </div>
          <div className="mt-10 max-w-xl mx-auto rounded-2xl bg-white p-8 ring-1 ring-slate-200">
            <h2 className="text-xl font-semibold text-slate-900">One Communication Review Report</h2>
            <div className="mt-5 flex items-baseline gap-2">
              <span className="text-5xl font-semibold tracking-tight text-slate-900">$49.99</span>
            </div>
            <p className="mt-4 text-slate-600 leading-relaxed">Purchase includes one self-service communication review report.</p>
            <ul className="mt-6 space-y-3 border-t border-slate-100 pt-6">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-700"><CheckIcon /><span>{item}</span></li>
              ))}
            </ul>
            <a href="https://linforensics.lemonsqueezy.com/checkout/buy/48510123-8132-4ab7-b1e2-9a960b68adb4" target="_blank" rel="noreferrer" className="mt-7 inline-flex w-full md:w-auto justify-center rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 font-medium transition-colors">Buy Report</a>
            <p className="mt-4 text-xs text-slate-500">After purchase, retain your receipt. Report access is handled through the LinForensics report system.</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function TermsPage() {
  return <Layout><section className="max-w-4xl mx-auto px-6 py-20 space-y-6"><div><Eyebrow>Legal</Eyebrow><h1 className="mt-2 text-4xl md:text-5xl font-semibold tracking-tight text-slate-900">Terms of Use</h1><p className="mt-3 text-slate-500">Last updated: May 2026</p></div>{sections.terms.map((s) => <article key={s.t} className="rounded-2xl bg-white p-6 ring-1 ring-slate-200/70"><h2 className="font-semibold text-lg text-slate-900">{s.t}</h2><p className="mt-2 text-slate-700 leading-relaxed">{s.b}</p></article>)}</section></Layout>;
}

function PrivacyPage() {
  return <Layout><section className="max-w-4xl mx-auto px-6 py-20 space-y-6"><div><Eyebrow>Legal</Eyebrow><h1 className="mt-2 text-4xl md:text-5xl font-semibold tracking-tight text-slate-900">Privacy Notice</h1><p className="mt-3 text-slate-500">Last updated: May 2026</p></div>{sections.privacy.map((s) => <article key={s.t} className="rounded-2xl bg-white p-6 ring-1 ring-slate-200/70"><h2 className="font-semibold text-lg text-slate-900">{s.t}</h2><p className="mt-2 text-slate-700 leading-relaxed">{s.b}</p></article>)}</section></Layout>;
}

function SuccessPage() {
  return (
    <Layout>
      <section className="max-w-3xl mx-auto px-6 py-20">
        <Eyebrow>Confirmation</Eyebrow>
        <h1 className="mt-2 text-4xl md:text-5xl font-semibold tracking-tight text-slate-900">Payment received.</h1>
        <p className="mt-4 text-slate-700 leading-relaxed">Your purchase was received. Retain your receipt. Report access is handled through the LinForensics report system.</p>
        <div className="mt-6 rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200/70 text-slate-700 leading-relaxed">LinForensics is decision-support software. It does not provide legal advice, medical advice, mental health advice, diagnoses, predictions, emergency support, or automated determinations.</div>
        <Link to="/" className="mt-6 inline-flex rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 font-medium transition-colors">Return to home</Link>
      </section>
    </Layout>
  );
}

const sections = {
  terms: [
    { t: '1. Nature of the Software', b: 'LinForensics is decision-support software only. It organizes and structures submitted message text into a report to assist human review.' },
    { t: '2. Independent Review', b: 'Reports may contain errors, omissions, or mischaracterizations and should be independently reviewed by a qualified professional before being relied upon.' },
    { t: '3. Limitations', b: 'LinForensics does not provide legal advice, medical advice, mental health advice, emergency support, diagnoses, predictions, or automated determinations.' },
    { t: '4. Contact', b: 'Questions can be directed to support@linforensics.com.' },
  ],
  privacy: [
    { t: '1. Overview', b: 'This is a general pre-launch privacy notice for the LinForensics public website.' },
    { t: '2. Submitted Content', b: 'Submitted content may be processed by third-party infrastructure and AI processing services to generate the requested report.' },
    { t: '3. Commitments', b: 'This notice does not make specific commitments regarding deletion timelines, encryption standards, retention periods, or processor-level workflows.' },
    { t: '4. Contact', b: 'Questions about privacy can be directed to support@linforensics.com.' },
  ],
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
