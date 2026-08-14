import { useState } from 'react'
import { motion } from 'framer-motion'
import { api } from '../../api/client'

export default function DocumentForm({ docType, label, onSaved }) {
  const [title, setTitle] = useState('')
  const [file, setFile] = useState(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) {
      setError('Please select a PDF file')
      return
    }
    setError('')
    setSaving(true)

    const formData = new FormData()
    formData.append('doc_type', docType)
    formData.append('title', title || label)
    formData.append('file', file)

    try {
      await api.post('/api/documents', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      setTitle('')
      setFile(null)
      e.target.reset()
      onSaved()
    } catch {
      setError('Upload failed. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const inputClass =
    'px-3 py-2 rounded-md bg-transparent border border-[var(--glass-border)] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]'

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass p-6 flex flex-col gap-3"
    >
      <h2 className="text-lg font-semibold mb-1">Upload {label}</h2>

      <input
        placeholder={`Title (optional, defaults to "${label}")`}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={inputClass}
      />

      <label className="text-sm text-[var(--text-secondary)]">PDF file</label>
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
        required
        className="text-sm text-[var(--text-secondary)] file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-[var(--accent)]/10 file:text-[var(--accent)]"
      />

      {error && <p className="text-sm text-red-400">{error}</p>}

      <motion.button
        type="submit"
        disabled={saving}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="mt-2 py-2 rounded-md font-medium text-white disabled:opacity-50"
        style={{ background: 'linear-gradient(90deg, var(--accent), var(--accent-2))' }}
      >
        {saving ? 'Uploading...' : `Upload ${label}`}
      </motion.button>
    </motion.form>
  )
}