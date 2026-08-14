import { useEffect, useState } from 'react'
import { api } from '../api/client'

export function useCertificates() {
  const [certificates, setCertificates] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    api.get('/api/certificates')
      .then(res => { if (mounted) setCertificates(res.data) })
      .catch(() => {})
      .finally(() => mounted && setLoading(false))
    return () => { mounted = false }
  }, [])

  return { certificates, loading }
}