import { useEffect, useState } from 'react'
import { api } from '../api/client'
import { fallbackProjects } from '../data/fallbackData'

export function useProjects() {
  const [projects, setProjects] = useState(fallbackProjects)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    api.get('/api/projects')
      .then(res => { if (mounted && res.data?.length) setProjects(res.data) })
      .catch(() => {})
      .finally(() => mounted && setLoading(false))
    return () => { mounted = false }
  }, [])

  return { projects, loading }
}