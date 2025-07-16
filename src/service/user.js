const API_URL = 'http://localhost:3001/api/v1/user'

export async function login(email, password) {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })

  const data = await response.json()
  if (!response.ok) throw new Error(data.message)
  return data.body
}

export async function getProfile(token) {
  const response = await fetch(`${API_URL}/profile`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  const data = await response.json()
  if (!response.ok) throw new Error(data.message)
  return data.body
}
