import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './index.css';

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-slate-200">
        <nav className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <Link to="/" className="text-xl font-semibold text-slate-900">LinForensics</Link>
          <div className="flex items-center gap-4 text-sm">
            <Link to="/pricing" className="text-slate-600 hover:text-slate-900">Pricing</Link>
            <Link to="/privacy" className="text-slate-600 hover:text-slate-900">Privacy</Link>
            <Link to="/terms" className="text-slate-600 hover:text-slate-900">Terms</Link>
            <Link to="/pricing" className="inline-flex items-center rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 font-medium">Start Review</Link>
          </div>
        </nav>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-slate-200 bg-white mt-16">
        <div className="max-w-5xl mx-auto px-6 py-8 space-y-3">
          <p className="text-lg font-semibold">LinForensics</p>
          <p className="text-slate-600">Decision-support software for structured communication review.</p>
          <div className="flex gap-4 text-sm">
            <Link to="/pricing" className="text-slate-600 hover:text-slate-900">Pricing</Link>
            <Link to="/privacy" className="text-slate-600 hover:text-slate-900">Privacy</Link>
            <Link to="/terms" className="text-slate-600 hover:text-slate-900">Terms</Link>
          </div>
          <p className="text-sm text-slate-500">LinForensics does not provide legal, medical, mental health, emergency, or regulated professional advice, and does not make findings or determinations.</p>
        </div>
      </footer>
    </div>
  );
}

function HomePage() {
  return (
    <Layout>
      <section className="max-w-5xl mx-auto px-6 py-16">
        <span className="inline-flex rounded-full bg-indigo-50 text-indigo-700 text-sm px-3 py-1 border border-indigo-100">Decision-support software</span>
        <h1 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight text-slate-900">Structured communication review reports for human review</h1>
        <p className="mt-5 text-lg text-slate-500 max-w-3xl">LinForensics helps organize chat and message text into cited, audit-friendly communication pattern reports.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/pricing" className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 font-medium">Start Review</Link>
          <Link to="/pricing" className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-medium text-slate-700 hover:bg-slate-100">View Pricing</Link>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-10">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            ['1. Submit message text', 'Paste or upload the chat and message text you want to review.'],
            ['2. LinForensics organizes the evidence', 'LinForensics identifies cited excerpts and labels candidate communication patterns.'],
            ['3. Review the structured report', 'Receive an audit-friendly report formatted for independent human review.'],
          ].map(([title, body]) => (
            <article key={title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="font-semibold text-slate-900">{title}</h3>
              <p className="mt-2 text-slate-600">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-semibold">Report includes</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Feature title="Cited evidence snippets" body="Direct excerpts from the submitted text, preserved in context." />
          <Feature title="Candidate communication pattern labels" body="Patterns are labeled for structured interpretation and independent review." />
          <Feature title="Audit-friendly structure" body="Report is organized for review by the user or a qualified professional." />
          <Feature title="Human-review disclaimer" body="Every report includes a clear notice that outputs require independent review." />
          <Feature title="JSON / report export" body="Structured export formats for downstream use." soon />
        </div>
      </section>
    </Layout>
  );
}

function Feature({ title, body, soon = false }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2">
        <h3 className="font-semibold text-slate-900">{title}</h3>
        {soon ? <span className="text-xs rounded-full bg-slate-100 text-slate-600 px-2 py-1">coming soon</span> : null}
      </div>
      <p className="mt-2 text-slate-600">{body}</p>
    </article>
  );
}

function PricingPage() { return <Layout><section className="max-w-3xl mx-auto px-6 py-16"><h1 className="text-4xl font-semibold">Pricing</h1><p className="mt-3 text-slate-500">One clear product. No subscription. Pay once, receive your report.</p><div className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"><h2 className="text-2xl font-semibold">One Communication Review Report</h2><p className="mt-2 text-4xl font-semibold text-indigo-700">$49.99</p><p className="mt-3 text-slate-600">Purchase includes one self-service communication review report.</p><ul className="mt-4 space-y-2 text-slate-700 list-disc list-inside"><li>Cited evidence snippets from submitted text</li><li>Candidate communication pattern labels</li><li>Audit-friendly structured report</li><li>Human-review disclaimer included</li><li>Self-service delivery</li></ul><a href="https://linforensics.lemonsqueezy.com/checkout/buy/48510123-8132-4ab7-b1e2-9a960b68adb4" target="_blank" rel="noreferrer" className="mt-6 inline-flex rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 font-medium">Buy Report</a>{/* TODO: Remove this test-mode checkout note before public launch. */}<p className="mt-3 text-sm text-slate-500">Checkout is currently configured for pre-launch/test-mode validation. Full account-linked checkout will be enabled before public launch.</p></div><div className="mt-8 rounded-xl border border-slate-200 bg-white p-5"><h3 className="font-semibold">Important notice</h3><p className="mt-2 text-slate-600">LinForensics is decision-support software. It does not provide legal advice, medical advice, mental health advice, diagnoses, predictions, emergency support, or automated determinations.</p></div></section></Layout>; }

function TermsPage(){return <Layout><section className="max-w-4xl mx-auto px-6 py-16 space-y-6"><h1 className="text-4xl font-semibold">Terms of Use</h1><p className="text-slate-500">Last updated: May 2026 placeholder, review before public launch</p><div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-amber-900">Pre-launch notice: These placeholder terms are for development review only. Final terms must be reviewed and published before accepting live public purchases.</div>{sections.terms.map((s)=><article key={s.t} className="rounded-xl border border-slate-200 bg-white p-5"><h2 className="font-semibold text-lg">{s.t}</h2><p className="mt-2 text-slate-700">{s.b}</p></article>)}</section></Layout>;}
function PrivacyPage(){return <Layout><section className="max-w-4xl mx-auto px-6 py-16 space-y-6"><h1 className="text-4xl font-semibold">Privacy Notice</h1><p className="text-slate-500">Last updated: May 2026 placeholder, complete privacy policy will be published before public launch</p><div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-amber-900">Pre-launch notice: This placeholder privacy notice is for development review only. A complete privacy policy must be reviewed and published before accepting live public submissions.</div>{sections.privacy.map((s)=><article key={s.t} className="rounded-xl border border-slate-200 bg-white p-5"><h2 className="font-semibold text-lg">{s.t}</h2><p className="mt-2 text-slate-700">{s.b}</p></article>)}<div className="rounded-xl border border-slate-200 bg-slate-100 p-4 text-slate-700">A fuller privacy policy covering specific data practices, retention policies, third-party processors, and user rights will be added before full public launch. This placeholder notice is not a complete or binding privacy policy.</div></section></Layout>;}
function SuccessPage(){return <Layout><section className="max-w-3xl mx-auto px-6 py-16"><h1 className="text-4xl font-semibold">Payment received.</h1><p className="mt-4 text-slate-700">Your report access will be activated through the LinForensics report system. If automatic access is not yet available, retain your receipt and contact LinForensics support for assistance.</p><p className="mt-6 rounded-xl border border-slate-200 bg-white p-4 text-slate-700">LinForensics is decision-support software. It does not provide legal advice, medical advice, mental health advice, diagnoses, predictions, emergency support, or automated determinations.</p><Link to="/" className="mt-6 inline-flex rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 font-medium">Return to home</Link></section></Layout>;}

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
