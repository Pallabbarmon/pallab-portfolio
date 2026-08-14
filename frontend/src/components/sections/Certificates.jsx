import { useState } from 'react'
import { motion } from 'framer-motion'
import { useCertificates } from '../../hooks/useCertificates'
import Lightbox from '../ui/Lightbox'

export default function Certificates() {
  const { certificates } = useCertificates()
  const [selected, setSelected] = useState(null)

  if (certificates.length === 0) return null

  const API_BASE = import.meta.env.VITE_API_URL

  return (
    <section id="certificates" className="max-w-5xl mx-auto px-6 py-24">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl font-bold mb-10"
      >
        Certificates
      </motion.h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {certificates.map((c, i) => {
          const imageSrc = `${API_BASE}${c.image_path}`
          return (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => setSelected(imageSrc)}
              className="glass p-4 flex flex-col cursor-pointer"
            >
              <img
                src={imageSrc}
                alt={c.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-base font-semibold">{c.title}</h3>
              {c.issuer && (
                <p className="text-sm text-[var(--text-secondary)] mt-1">
                  {c.issuer}
                </p>
              )}
            </motion.div>
          )
        })}
      </div>

      <Lightbox
        image={selected}
        alt="Certificate"
        onClose={() => setSelected(null)}
      />
    </section>
  )
}