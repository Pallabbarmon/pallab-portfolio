import { useState } from 'react'
import axios from 'axios'
import { setAuthToken } from '../../api/client'

export default function AdminLogin({ onSuccess }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const form = new URLSearchParams()
      form.append('username', username)
      form.append('password', password)
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/token`, form)
      setAuthToken(res.data.access_token)
      onSuccess()
    } catch {
      setError('Invalid credentials')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="glass p-8 w-80 flex flex-col gap-3"
      >
        <h2 className="text-xl font-semibold mb-2">Admin Login</h2>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="px-3 py-2 rounded-md bg-transparent border border-[var(--glass-border)] text-[var(--text-primary)]"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-3 py-2 rounded-md bg-transparent border border-[var(--glass-border)] text-[var(--text-primary)]"
        />
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          className="mt-2 py-2 rounded-md font-medium text-white"
          style={{ background: 'linear-gradient(90deg, var(--accent), var(--accent-2))' }}
        >
          Log in
        </button>
      </form>
    </div>
  )
}