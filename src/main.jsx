import React, { useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './index.css';
import { hasSupabaseConfig, supabase } from './supabaseClient';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

function CheckIcon({ className = 'h-5 w-5 text-indigo-600 shrink-0 mt-0.5' }) { return <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M5 10.5l3.5 3.5L15 6.5" /></svg>; }
function ShieldIcon({ className = 'h-4 w-4 text-white' }) { return <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M10 2l6 2v5c0 4-2.5 7-6 9-3.5-2-6-5-6-9V4l6-2z" /><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 10l1.5 1.5L13 7.5" /></svg>; }
function Eyebrow({ children }) { return <p className="text-xs font-semibold uppercase tracking-wider text-indigo-700">{children}</p>; }

function useAuth() {
  const [session, setSession] = useState(null);
  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => setSession(data.session ?? null));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => setSession(nextSession));
    return () => listener.subscription.unsubscribe();
  }, []);
  return { session, user: session?.user ?? null };
}

function Layout({ children, user, onSignOut }) {
  return <div className="min-h-screen flex flex-col"><header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-slate-200/70"><nav className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between gap-4"><Link to="/" className="flex items-center gap-2"><span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600"><ShieldIcon /></span><span className="text-lg font-semibold tracking-tight text-slate-900">LinForensics</span></Link><div className="flex items-center gap-4 text-sm"><Link to="/pricing" className="text-slate-600 hover:text-slate-900 transition-colors">Pricing</Link><Link to="/privacy" className="text-slate-600 hover:text-slate-900 transition-colors">Privacy</Link><Link to="/terms" className="text-slate-600 hover:text-slate-900 transition-colors">Terms</Link>{user ? <><span className="text-slate-600 hidden md:inline">{user.email}</span><button onClick={onSignOut} className="text-slate-600 hover:text-slate-900">Sign out</button></> : <Link to="/auth" className="text-slate-600 hover:text-slate-900">Log in</Link>}<Link to="/pricing" className="inline-flex items-center rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 text-sm font-medium">Start Review</Link></div></nav></header><main className="flex-1">{children}</main><footer className="border-t border-slate-200 bg-white mt-16"><div className="max-w-5xl mx-auto px-6 py-10 grid gap-8 md:grid-cols-3"><div className="space-y-2"><div className="flex items-center gap-2"><span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-indigo-600"><ShieldIcon className="h-3.5 w-3.5 text-white" /></span><p className="text-base font-semibold tracking-tight">LinForensics</p></div><p className="text-sm text-slate-600 leading-relaxed">Decision-support software for structured communication review.</p></div><div className="flex flex-col gap-2 text-sm"><p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Links</p><Link to="/pricing" className="text-slate-600 hover:text-slate-900 transition-colors">Pricing</Link><Link to="/privacy" className="text-slate-600 hover:text-slate-900 transition-colors">Privacy</Link><Link to="/terms" className="text-slate-600 hover:text-slate-900 transition-colors">Terms</Link></div><p className="text-xs text-slate-500 leading-relaxed">LinForensics does not provide legal, medical, mental health, emergency, or regulated professional advice, and does not make findings or determinations.</p></div></footer></div>;
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
  return <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">Configuration error: missing {missing.join(', ')}.</div>;
}

function HomePage(props){return <Layout {...props}><section className="bg-gradient-to-b from-white via-indigo-50/40 to-slate-50"><div className="max-w-5xl mx-auto px-6 py-20 md:py-24"><span className="inline-flex items-center rounded-full bg-indigo-50 text-indigo-700 text-xs font-medium uppercase tracking-wider px-3 py-1 ring-1 ring-indigo-100">Decision-support software</span><h1 className="mt-5 text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05] text-slate-900 max-w-3xl text-balance">Structured communication review reports for human review</h1><p className="mt-5 text-lg text-slate-600 max-w-2xl leading-relaxed">LinForensics helps organize chat and message text into cited, audit-friendly communication pattern reports.</p><div className="mt-8 flex flex-wrap gap-3"><Link to="/pricing" className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 font-medium">Start Review</Link><Link to="/pricing" className="rounded-xl border border-slate-200 bg-white/60 hover:bg-white hover:border-slate-300 px-5 py-3 font-medium text-slate-700">View Pricing</Link></div></div></section></Layout>}

function AuthPage({ user, onAuthSuccess, ...layoutProps }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const buyIntent = location.state?.fromBuy;
  useEffect(() => { if (user && buyIntent) navigate('/pricing'); }, [user, buyIntent, navigate]);

  async function run(type) {
    setError(''); setMessage('');
    if (!hasSupabaseConfig || !supabase) { setError('Authentication is not configured yet.'); return; }
    const fn = type === 'signup' ? supabase.auth.signUp : supabase.auth.signInWithPassword;
    const { error: authError } = await fn({ email, password });
    if (authError) { setError(authError.message); return; }
    setMessage(type === 'signup' ? 'Account created. Check your email if confirmation is required.' : 'Signed in.');
    onAuthSuccess?.();
  }

  return <Layout {...layoutProps}><section className="max-w-xl mx-auto px-6 py-16"><Eyebrow>Account</Eyebrow><h1 className="mt-2 text-3xl font-semibold">Log in or create an account</h1>{buyIntent ? <p className="mt-3 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3">Log in or create an account to buy a report.</p> : null}<ConfigError /><div className="mt-6 space-y-4"><input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" className="w-full rounded-lg border px-3 py-2" /><input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" className="w-full rounded-lg border px-3 py-2" /><div className="flex gap-3"><button onClick={()=>run('signin')} className="rounded-xl bg-indigo-600 text-white px-4 py-2">Log in</button><button onClick={()=>run('signup')} className="rounded-xl border px-4 py-2">Sign up</button></div>{message ? <p className="text-sm text-emerald-700">{message}</p> : null}{error ? <p className="text-sm text-rose-700">{error}</p> : null}</div></section></Layout>;
}

function PricingPage({ user, ...layoutProps }) {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleBuy() {
    setError('');
    if (!user) { navigate('/auth', { state: { fromBuy: true } }); return; }
    if (!hasSupabaseConfig || !apiBaseUrl || !supabase) { setError('Configuration error: missing VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, or VITE_API_BASE_URL.'); return; }
    setLoading(true);
    try {
      const { data } = await supabase.auth.getSession();
      const accessToken = data.session?.access_token;
      if (!accessToken) { setError('Please log in again.'); setLoading(false); return; }
      const response = await fetch(`${apiBaseUrl}/v1/billing/checkout`, { method: 'POST', headers: { Authorization: `Bearer ${accessToken}` } });
      if (response.status === 401) { setError('Please log in again.'); return; }
      if (response.status === 503) { setError('Billing is not configured yet.'); return; }
      if (!response.ok) { setError('Checkout failed. Please try again.'); return; }
      const body = await response.json();
      if (!body.checkout_url) { setError('Checkout failed. Please try again.'); return; }
      window.location.href = body.checkout_url;
    } catch {
      setError('Checkout failed. Please try again.');
    } finally { setLoading(false); }
  }

  return <Layout {...layoutProps}><section className="bg-gradient-to-b from-white via-indigo-50/40 to-slate-50"><div className="max-w-3xl mx-auto px-6 py-20"><div className="text-center"><Eyebrow>Pricing</Eyebrow><h1 className="mt-2 text-4xl md:text-5xl font-semibold tracking-tight text-slate-900">Pricing</h1><p className="mt-3 text-slate-600">One clear product. No subscription. Pay once, receive your report.</p></div><div className="mt-10 max-w-xl mx-auto rounded-2xl bg-white p-8 ring-1 ring-slate-200"><h2 className="text-xl font-semibold text-slate-900">One Communication Review Report</h2><div className="mt-5 flex items-baseline gap-2"><span className="text-5xl font-semibold tracking-tight text-slate-900">$49.99</span><span className="text-sm text-slate-500">per report</span></div><button onClick={handleBuy} disabled={loading} className="mt-7 inline-flex w-full md:w-auto justify-center rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white px-5 py-3 font-medium">{loading ? 'Starting checkout...' : 'Buy Report'}</button>{error ? <p className="mt-3 text-sm text-rose-700">{error}</p> : null}<ConfigError /></div></div></section></Layout>;
}

function SuccessPage(props) { return <Layout {...props}><section className="max-w-3xl mx-auto px-6 py-20"><Eyebrow>Confirmation</Eyebrow><h1 className="mt-2 text-4xl md:text-5xl font-semibold tracking-tight text-slate-900">Purchase received.</h1><p className="mt-4 text-slate-700 leading-relaxed">Purchase received. Your report credit should be available shortly. You can return to LinForensics to continue.</p><Link to="/" className="mt-6 inline-flex rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 font-medium">Return to home</Link></section></Layout>; }
function TermsPage(props){return <Layout {...props}><section className="max-w-4xl mx-auto px-6 py-20"><h1 className="text-4xl font-semibold">Terms of Use</h1></section></Layout>}
function PrivacyPage(props){return <Layout {...props}><section className="max-w-4xl mx-auto px-6 py-20"><h1 className="text-4xl font-semibold">Privacy Notice</h1></section></Layout>}

function App() {
  const { user } = useAuth();
  const onSignOut = async () => { if (supabase) await supabase.auth.signOut(); };
  const sharedProps = { user, onSignOut };
  return <Routes><Route path="/" element={<HomePage {...sharedProps} />} /><Route path="/pricing" element={<PricingPage {...sharedProps} />} /><Route path="/privacy" element={<PrivacyPage {...sharedProps} />} /><Route path="/terms" element={<TermsPage {...sharedProps} />} /><Route path="/success" element={<SuccessPage {...sharedProps} />} /><Route path="/auth" element={<AuthPage {...sharedProps} />} /></Routes>;
}

ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode><BrowserRouter><App /></BrowserRouter></React.StrictMode>);
