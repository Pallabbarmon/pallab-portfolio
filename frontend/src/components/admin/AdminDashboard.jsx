import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { api, setAuthToken } from '../../api/client'
import ProjectForm from './ProjectForm'
import CertificateForm from './CertificateForm'
import VisitStats from './VisitStats'
import AdminNavbar from './AdminNavbar'
import DocumentForm from './DocumentForm'

export default function AdminDashboard({ onLogout }) {
  const [projects, setProjects] = useState([])
  const [certificates, setCertificates] = useState([])

  const loadProjects = () => {
    api.get('/api/projects').then((res) => setProjects(res.data))
  }

  const loadCertificates = () => {
    api.get('/api/certificates').then((res) => setCertificates(res.data))
  }

  useEffect(() => {
    loadProjects()
    loadCertificates()
  }, [])

  const handleDeleteProject = async (id) => {
    await api.delete(`/api/projects/${id}`)
    loadProjects()
  }

  const handleDeleteCertificate = async (id) => {
    await api.delete(`/api/certificates/${id}`)
    loadCertificates()
  }

  const handleLogout = () => {
    setAuthToken(null)
    onLogout()
  }

  const API_BASE = import.meta.env.VITE_API_URL

  return (
    <div className="pb-16">
      <AdminNavbar onLogout={handleLogout} />

      <div id="overview" className="max-w-4xl mx-auto px-6 pt-12">
        <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>
        <VisitStats projectCount={projects.length} certificateCount={certificates.length} />
      </div>

      <div id="projects-admin" className="max-w-4xl mx-auto px-6 pt-8">
        <ProjectForm onSaved={loadProjects} />

        <h2 className="text-xl font-semibold mt-12 mb-4">Existing Projects</h2>
        <div className="flex flex-col gap-3">
          {projects.length === 0 && (
            <p className="text-sm text-[var(--text-secondary)]">No projects yet.</p>
          )}
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass p-4 flex items-center justify-between"
            >
              <span>{p.title}</span>
              <button
                onClick={() => handleDeleteProject(p.id)}
                className="text-sm text-red-400 hover:text-red-300"
              >
                Delete
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      <div id="certificates-admin" className="max-w-4xl mx-auto px-6 pt-16">
        <CertificateForm onSaved={loadCertificates} />

        <h2 className="text-xl font-semibold mt-12 mb-4">Existing Certificates</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {certificates.length === 0 && (
            <p className="text-sm text-[var(--text-secondary)] col-span-full">
              No certificates yet.
            </p>
          )}
          {certificates.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass p-3 flex flex-col gap-2"
            >
              <img
                src={`${API_BASE}${c.image_path}`}
                alt={c.title}
                className="w-full h-32 object-cover rounded-md"
              />
              <p className="text-sm font-medium">{c.title}</p>
              {c.issuer && (
                <p className="text-xs text-[var(--text-secondary)]">{c.issuer}</p>
              )}
              <button
                onClick={() => handleDeleteCertificate(c.id)}
                className="text-xs text-red-400 hover:text-red-300 self-start"
              >
                Delete
              </button>
            </motion.div>
          ))}
        </div>
      </div>
      <div id="documents-admin" className="max-w-4xl mx-auto px-6 pt-16">
        <DocumentForm docType="thesis" label="Thesis Paper" onSaved={() => {}} />
      </div>
    </div>
  )
}