import { motion } from 'framer-motion'

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 ${
            i % 2 === 0 ? 'bg-[var(--accent)]' : 'bg-[var(--accent-2)]'
          }`}
          style={{ top: `${i * 30}%`, left: `${i * 25}%` }}
          animate={{ x: [0, 60, -40, 0], y: [0, -50, 40, 0] }}
          transition={{ duration: 20 + i * 5, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}