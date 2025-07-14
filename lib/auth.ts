export async function isAuthenticated(): Promise<boolean> {
  try {
    const res = await fetch('/api/check-session', {
      method: 'GET',
      credentials: 'include',
    })
    const data = await res.json()
    return data.isAuthenticated
  } catch {
    return false
  }
}
