export async function apiFetch(path: string, opts: RequestInit = {}) {
const token = localStorage.getItem('adminToken');
const headers = { ...(opts.headers as Record<string, string> || {}), ...(token ? { Authorization: `Bearer ${token}` } : {}) };
const res = await fetch(`/api${path}`, { ...opts, headers });
return res;
}