import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaEnvelope, FaLinkedin, FaGithub, FaMapMarkerAlt, FaRegCopy, FaCheck, FaDownload } from 'react-icons/fa'

const EMAIL = 'pallabbarman02@gmail.com'

const contacts = [
  {
    icon: FaEnvelope,
    label: 'Email',
    value: EMAIL,
    href: `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}`,
    isEmail: true,
  },
  {
    icon: FaLinkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/pallab-barman02',
    href: 'https://www.linkedin.com/in/pallab-barman02',
  },
  {
    icon: FaGithub,
    label: 'GitHub',
    value: 'github.com/Pallabbarmon',
    href: 'https://github.com/Pallabbarmon',
  },
  {
    icon: FaDownload,
    label: 'Resume',
    value: 'Download PDF',
    href: '/resume.pdf',
    isResume: true,
  },
]

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    await navigator.clipboard.writeText(EMAIL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" className="max-w-5xl mx-auto px-6 py-24">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl font-bold mb-4"
      >
        Get in Touch
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-[var(--text-secondary)] mb-10 max-w-xl"
      >
        I'm actively looking for opportunities in software development and
        data science. Feel free to reach out — I'd love to connect.
      </motion.p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {contacts.map((c, i) => (
          <motion.a
            key={c.label}
            href={c.href}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -6, scale: 1.02 }}
            className="glass p-6 flex flex-col items-center text-center gap-3 relative"
          >
            <c.icon className="text-2xl text-[var(--accent)]" />
            <div>
              <p className="text-sm font-semibold">{c.label}</p>
              <p className="text-xs text-[var(--text-secondary)] mt-1 break-all">
                {c.value}
              </p>
            </div>

            {c.isEmail && (
              <button
                onClick={handleCopy}
                className="mt-1 flex items-center gap-1 text-xs text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
              >
                {copied ? (
                  <>
                    <FaCheck /> Copied
                  </>
                ) : (
                  <>
                    <FaRegCopy /> Copy email
                  </>
                )}
              </button>
            )}
          </motion.a>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mt-8 flex items-center justify-center gap-2 text-sm text-[var(--text-secondary)]"
      >
        <FaMapMarkerAlt className="text-[var(--accent)]" />
        Dhaka, Bangladesh
      </motion.div>
    </section>
  )
}