import { useState, useEffect } from 'react'
import AdminLogin from '../components/admin/AdminLogin'
import AdminDashboard from '../components/admin/AdminDashboard'

export default function Admin() {
  const [authed, setAuthed] = useState(!!localStorage.getItem('admin_token'))

  useEffect(() => {
    setAuthed(!!localStorage.getItem('admin_token'))
  }, [])

  return authed
    ? <AdminDashboard onLogout={() => setAuthed(false)} />
    : <AdminLogin onSuccess={() => setAuthed(true)} />
}