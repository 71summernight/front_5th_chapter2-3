const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const apiClient = {
  async get<T>(url: string): Promise<T> {
    const res = await fetch(`${BASE_URL}${url}`)
    if (!res.ok) throw new Error(`GET ${url} 실패`)
    return res.json()
  },

  async post<T>(url: string, body: unknown): Promise<T> {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    if (!res.ok) throw new Error(`POST ${url} 실패`)
    return res.json()
  },

  async put<T>(url: string, body: unknown): Promise<T> {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    if (!res.ok) throw new Error(`PUT ${url} 실패`)
    return res.json()
  },

  async patch<T>(url: string, body: unknown): Promise<T> {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    if (!res.ok) throw new Error(`PATCH ${url} 실패`)
    return res.json()
  },

  async delete(url: string): Promise<void> {
    const res = await fetch(`${BASE_URL}${url}`, { method: "DELETE" })
    if (!res.ok) throw new Error(`DELETE ${url} 실패`)
  },
}
