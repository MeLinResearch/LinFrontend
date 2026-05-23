const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const hasSupabaseConfig = Boolean(supabaseUrl && supabaseAnonKey);
const STORAGE_KEY = 'linforensics.supabase.session';

function getStoredSession() {
  if (!hasSupabaseConfig) return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function setStoredSession(session) {
  if (session) localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  else localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event('linforensics-auth-change'));
}

async function authRequest(path, body) {
  const response = await fetch(`${supabaseUrl}/auth/v1/${path}`, {
    method: 'POST',
    headers: {
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${supabaseAnonKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  if (!response.ok) {
    return { data: null, error: { message: data.msg || data.error_description || data.error || 'Authentication failed.' } };
  }
  return { data, error: null };
}

export const supabase = {
  auth: {
    async signUp({ email, password }) {
      const result = await authRequest('signup', { email, password });
      if (result.data?.access_token) setStoredSession(result.data);
      return result;
    },
    async signInWithPassword({ email, password }) {
      const result = await authRequest('token?grant_type=password', { email, password });
      if (result.data?.access_token) setStoredSession(result.data);
      return result;
    },
    async signOut() { setStoredSession(null); return { error: null }; },
    async getSession() {
      const session = getStoredSession();
      return { data: { session: session ? { access_token: session.access_token, user: session.user } : null } };
    },
    onAuthStateChange(callback) {
      const handler = () => {
        const session = getStoredSession();
        callback('SIGNED_IN', session ? { access_token: session.access_token, user: session.user } : null);
      };
      window.addEventListener('storage', handler);
      window.addEventListener('linforensics-auth-change', handler);
      return { data: { subscription: { unsubscribe: () => { window.removeEventListener('storage', handler); window.removeEventListener('linforensics-auth-change', handler); } } } };
    },
  },
};
