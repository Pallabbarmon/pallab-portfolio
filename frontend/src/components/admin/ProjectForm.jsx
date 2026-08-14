import { useState } from 'react'
import { motion } from 'framer-motion'
import { api } from '../../api/client'

const empty = {
  title: '',
  description: '',
  tech_stack: '',
  image_url: '',
  live_url: '',
  github_url: '',
  featured: false,
}

const inputClass =
  'px-3 py-2 rounded-md bg-transparent border border-[var(--glass-border)] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]'

export default function ProjectForm({ onSaved }) {
  const [form, setForm] = useState(empty)
  const [saving, setSaving] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await api.post('/api/projects', form)
      setForm(empty)
      onSaved()
    } finally {
      setSaving(false)
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass p-6 flex flex-col gap-3"
    >
      <h2 className="text-lg font-semibold mb-1">Add New Project</h2>

      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
        className={inputClass}
      />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        required
        rows={3}
        className={inputClass}
      />
      <input
        name="tech_stack"
        placeholder="Tech stack (comma separated)"
        value={form.tech_stack}
        onChange={handleChange}
        className={inputClass}
      />
      <input
        name="image_url"
        placeholder="Image URL"
        value={form.image_url}
        onChange={handleChange}
        className={inputClass}
      />
      <input
        name="live_url"
        placeholder="Live URL"
        value={form.live_url}
        onChange={handleChange}
        className={inputClass}
      />
      <input
        name="github_url"
        placeholder="GitHub URL"
        value={form.github_url}
        onChange={handleChange}
        className={inputClass}
      />

      <label className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
        <input
          type="checkbox"
          name="featured"
          checked={form.featured}
          onChange={handleChange}
        />
        Featured
      </label>

      <motion.button
        type="submit"
        disabled={saving}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="mt-2 py-2 rounded-md font-medium text-white disabled:opacity-50"
        style={{ background: 'linear-gradient(90deg, var(--accent), var(--accent-2))' }}
      >
        {saving ? 'Saving...' : 'Save Project'}
      </motion.button>
    </motion.form>
  )
}