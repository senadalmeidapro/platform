import i18n from '../i18n';

const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || '/api/v1').replace(/\/$/, '');

export async function apiGet<T>(path: string): Promise<T> {
  const normalizedPath = path.startsWith('/') ? path : '/' + path;
  const response = await fetch(apiBaseUrl + normalizedPath, {
    credentials: 'include',
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(i18n.t('api.requestFailed', { status: response.status }));
  }

  return response.json() as Promise<T>;
}
