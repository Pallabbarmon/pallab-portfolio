import { useEffect, useState } from 'react'
import { api } from '../api/client'

export function useDocument(docType) {
  const [doc, setDoc] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    api.get(`/api/documents/${docType}`)
      .then((res) => { if (mounted) setDoc(res.data) })
      .catch(() => { if (mounted) setDoc(null) })
      .finally(() => mounted && setLoading(false))
    return () => { mounted = false }
  }, [docType])

  return { doc, loading }
}