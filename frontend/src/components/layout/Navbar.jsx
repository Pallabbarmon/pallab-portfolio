import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes } from 'react-icons/fa'
import ThemeToggle from '../ui/ThemeToggle'

const links = ['About', 'Skills', 'Projects', 'Experience', 'Contact']

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const scrollTo = (id) => {
    setOpen(false)
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Desktop navbar */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="glass fixed top-4 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center gap-1 px-3 py-2 rounded-full"
      >
        <button
          onClick={() => scrollTo('hero')}
          className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm text-white mr-2"
          style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-2))' }}
        >
          PB
        </button>

        {links.map((link, i) => (
          <motion.button
            key={link}
            onClick={() => scrollTo(link)}
            whileHover={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
            className="px-4 py-2 rounded-full text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            {link}
          </motion.button>
        ))}

        <div className="w-px h-5 bg-[var(--glass-border)] mx-1" />
        <ThemeToggle />
      </motion.nav>

      {/* Mobile navbar */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="glass fixed top-4 left-4 right-4 z-50 flex md:hidden items-center justify-between px-4 py-3 rounded-full"
      >
        <button
          onClick={() => scrollTo('hero')}
          className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm text-white"
          style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-2))' }}
        >
          PB
        </button>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="w-9 h-9 flex items-center justify-center text-[var(--text-primary)]"
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="glass fixed top-20 left-4 right-4 z-40 flex md:hidden flex-col p-2 rounded-2xl"
          >
            {links.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className="text-left px-4 py-3 rounded-xl text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5 transition-colors"
              >
                {link}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}