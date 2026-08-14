import { motion } from 'framer-motion'

export default function ProjectCard({ project, index }) {
  const tech = project.tech_stack?.split(',').filter(Boolean) || []

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ y: -8 }}
      className="glass overflow-hidden flex flex-col group"
    >
      <div className="relative h-44 overflow-hidden bg-[var(--bg-secondary)]">
        {project.image_url ? (
          <motion.img
            src={project.image_url}
            alt={project.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.4 }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-3xl font-bold gradient-text opacity-50">
              {project.title.slice(0, 2).toUpperCase()}
            </span>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-semibold">{project.title}</h3>
        <p className="mt-2 text-sm text-[var(--text-secondary)] flex-1 line-clamp-3">
          {project.description}
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          {tech.map((t) => (
            <span
              key={t}
              className="text-xs px-2.5 py-1 rounded-full bg-[var(--accent)]/10 text-[var(--accent)]"
            >
              {t.trim()}
            </span>
          ))}
        </div>

        <div className="mt-4 flex gap-4 text-sm">
          {project.live_url && (
            <motion.a
              href={project.live_url}
              target="_blank"
              rel="noreferrer"
              whileHover={{ x: 3 }}
              className="text-[var(--accent)] font-medium"
            >
              Live →
            </motion.a>
          )}
          {project.github_url && (
            <motion.a
              href={project.github_url}
              target="_blank"
              rel="noreferrer"
              whileHover={{ x: 3 }}
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            >
              GitHub
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  )
}