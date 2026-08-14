import { motion } from 'framer-motion'

const skillGroups = [
  { title: 'Programming Languages', skills: ['Python', 'JavaScript', 'Java', 'C'] },
  { title: 'Frontend Development', skills: ['HTML5', 'CSS3', 'React.js', 'Bootstrap'] },
  { title: 'Backend Development', skills: ['Flask (Learning)', 'REST APIs'] },
  { title: 'Databases', skills: ['MySQL', 'SQLite'] },
  { title: 'Machine Learning & Data Science', skills: ['Scikit-learn', 'TensorFlow', 'Deep Learning', 'Data Analysis', 'Pandas', 'NumPy', 'OpenCV'] },
  { title: 'Cloud & DevOps', skills: ['Git', 'GitHub', 'Linux', 'Docker (Learning)', 'Cloud Computing Fundamentals'] },
  { title: 'Tools', skills: ['VS Code', 'Google Earth Engine', 'Jupyter Notebook', 'Google Colab', 'Microsoft Office'] },
]

export default function Skills() {
  return (
    <section id="skills" className="max-w-5xl mx-auto px-6 py-24 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="text-4xl font-bold mb-3"
      >
        Skills
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-[var(--text-secondary)] mb-12"
      >
        Technologies and tools I work with
      </motion.p>

      <div className="flex flex-col gap-10">
        {skillGroups.map((group, gi) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: gi * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h3 className="text-xs uppercase tracking-wider text-[var(--accent)] font-semibold mb-4">
              {group.title}
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {group.skills.map((skill) => (
                <motion.span
                  key={skill}
                  whileHover={{ y: -3, scale: 1.05 }}
                  className="px-5 py-2.5 rounded-full text-sm font-medium glass"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}