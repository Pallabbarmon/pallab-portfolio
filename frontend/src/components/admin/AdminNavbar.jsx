import { motion } from 'framer-motion'
import { FaSignOutAlt } from 'react-icons/fa'
import ThemeToggle from '../ui/ThemeToggle'

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'projects-admin', label: 'Projects' },
  { id: 'certificates-admin', label: 'Certificates' },
]

export default function AdminNavbar({ onLogout }) {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="glass sticky top-4 z-50 mx-6 mt-4 flex items-center justify-between px-5 py-3 rounded-2xl"
    >
      <div className="flex items-center gap-3">
        <span
          className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm text-white"
          style={{ background: 'linear-gradient(135deg, var(--accent-2), var(--accent))' }}
        >
          PB
        </span>
        <span className="text-sm font-semibold text-[var(--text-primary)]">
          Admin Panel
        </span>
      </div>

      <div className="hidden sm:flex items-center gap-1">
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            className="px-3 py-2 rounded-full text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5 transition-colors"
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        <button
          onClick={onLogout}
          className="flex items-center gap-2 px-3 py-2 rounded-full text-sm text-[var(--text-secondary)] hover:text-red-400 transition-colors"
        >
          <FaSignOutAlt />
          <span className="hidden sm:inline">Log out</span>
        </button>
      </div>
    </motion.nav>
  )
}