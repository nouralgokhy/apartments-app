export type ApiResult<T> = T | { error: string };
export const API_BASE =
  typeof window === "undefined" ? process.env.INTERNAL_API_BASE : process.env.NEXT_PUBLIC_API_BASE;

export async function baseApi<T>(url: string, options?: RequestInit): Promise<ApiResult<T>> {
  try {
    const base =
    typeof window === "undefined"
      ? process.env.INTERNAL_API_BASE 
      : process.env.NEXT_PUBLIC_API_BASE 
    const res = await fetch(`${base}${url}`, options);
    console.log('API Response:', res);
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Failed to load' }));
      return err?.error ? err : { error: 'Failed to load' };
    }
    return await res.json();
  } catch {
    return { error: 'Failed to load' };
  }
}
