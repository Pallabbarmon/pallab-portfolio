import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaDownload } from 'react-icons/fa'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
}
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
}

const codeLines = [
  { indent: 0, text: 'class Developer:' },
  { indent: 1, text: 'def __init__(self):' },
  { indent: 2, text: 'self.name = "Pallab Bormon"' },
  { indent: 2, text: 'self.role = "Python Developer"' },
  { indent: 2, text: 'self.focus = ["Backend", "ML", "Data Science"]' },
  { indent: 1, text: 'def is_available(self):' },
  { indent: 2, text: 'return True' },
]

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-[88vh] max-w-5xl mx-auto px-6 pt-24 flex items-center"
    >
      <div className="grid md:grid-cols-2 gap-12 items-center w-full">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p
            variants={item}
            className="text-sm font-semibold tracking-wide uppercase text-[var(--accent)] mb-3"
          >
            Python Developer &middot; Backend &amp; Machine Learning
          </motion.p>

          <motion.h1
            variants={item}
            className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight"
          >
            Hi, I'm <span className="gradient-text">Pallob Barmon</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-4 text-base md:text-lg text-[var(--text-secondary)] leading-relaxed max-w-lg"
          >
            I build backend applications and data-driven projects with Python. — from REST APIs to machine learning pipelines. Recently
            graduated in Computer Science, actively seeking software
            engineering opportunities.
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-3 rounded-full font-medium text-white text-sm"
              style={{ background: 'linear-gradient(90deg, var(--accent), var(--accent-2))' }}
            >
              View Projects
            </motion.a>
            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass px-5 py-3 rounded-full font-medium text-sm flex items-center gap-2"
            >
              <FaDownload /> Resume
            </motion.a>
            <motion.a
              href="https://github.com/Pallabbarmon"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="GitHub"
              className="glass w-11 h-11 rounded-full flex items-center justify-center text-lg"
            >
              <FaGithub />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/pallab-barman02"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="LinkedIn"
              className="glass w-11 h-11 rounded-full flex items-center justify-center text-lg"
            >
              <FaLinkedin />
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="glass rounded-2xl overflow-hidden max-w-md mx-auto shadow-2xl"
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--glass-border)]">
              <span className="w-3 h-3 rounded-full bg-red-400/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
              <span className="w-3 h-3 rounded-full bg-green-400/80" />
              <span className="ml-3 text-xs text-[var(--text-secondary)] font-mono">
                developer.py
              </span>
            </div>
            <div className="p-5 font-mono text-sm leading-relaxed">
              {codeLines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.15, duration: 0.4 }}
                  style={{ paddingLeft: `${line.indent * 1.25}rem` }}
                >
                  <span className="text-[var(--text-secondary)]">
                    {line.text.includes('"') ? (
                      <>
                        {line.text.split('"')[0]}
                        <span className="text-[var(--accent)]">
                          "{line.text.split('"')[1]}"
                        </span>
                        {line.text.split('"')[2]}
                      </>
                    ) : (
                      line.text
                    )}
                  </span>
                </motion.div>
              ))}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="inline-block w-2 h-4 bg-[var(--accent)] ml-6 align-middle"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}