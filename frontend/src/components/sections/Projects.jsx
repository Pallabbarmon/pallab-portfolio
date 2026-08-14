import { motion } from 'framer-motion'
import { useProjects } from '../../hooks/useProjects'
import ProjectCard from '../ui/ProjectCard'

export default function Projects() {
  const { projects } = useProjects()

  return (
    <section id="projects" className="max-w-5xl mx-auto px-6 py-24">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl font-bold mb-10"
      >
        Projects
      </motion.h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  )
}