import { useEffect, useState } from 'react'
import { api } from '../api/client'

export function useStats() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    api.get('/api/stats').then((res) => setStats(res.data)).catch(() => {})
  }, [])

  return stats
}