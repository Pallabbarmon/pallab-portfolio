import { motion } from 'framer-motion'
import { FaPython, FaServer, FaBrain, FaGlobeEurope } from 'react-icons/fa'

const highlights = [
  { icon: FaPython, label: 'Python' },
  { icon: FaServer, label: 'Backend Development' },
  { icon: FaBrain, label: 'Machine Learning' },
  { icon: FaGlobeEurope, label: 'Building an International Career' },
]

export default function About() {
  return (
    <section id="about" className="max-w-5xl mx-auto px-6 py-24">
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="text-4xl font-bold mb-10"
      >
        About Me
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="glass p-8"
      >
        <p className="text-[var(--text-secondary)] leading-relaxed">
          I'm a Computer Science graduate focused on Python development,
          backend engineering, and machine learning. My undergraduate research
          applied deep learning to satellite imagery for automatic
          topographic classification — work that sharpened both my technical
          depth and my ability to solve real, messy problems with clean code.
        </p>
        <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
          I'm currently building production-style projects and preparing for
          software engineering roles, with a long-term goal of working
          internationally in Europe.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          {highlights.map((h) => (
            <motion.span
              key={h.label}
              whileHover={{ y: -3 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-[var(--accent)]/10 text-[var(--text-primary)]"
            >
              <h.icon className="text-[var(--accent)]" />
              {h.label}
            </motion.span>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-[var(--glass-border)]">
          <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1">
            Education
          </h3>
          <p className="text-sm text-[var(--text-secondary)]">
            Bachelor of Science in Computer Science &amp; Engineering (B.Sc. CSE)
          </p>
          <p className="text-sm text-[var(--text-secondary)]">
            Graduated 2026 &middot; CGPA: 3.32 / 4.00
          </p>
        </div>
      </motion.div>
    </section>
  )
}