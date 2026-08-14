import { motion } from 'framer-motion'
import { useStats } from '../../hooks/useStats'

export default function VisitStats({ projectCount = 0, certificateCount = 0 }) {
  const stats = useStats()
  if (!stats) return null

  const days = Object.entries(stats.visits_by_day).slice(-7)
  const maxCount = Math.max(...days.map(([, count]) => count), 1)

  const cards = [
    { label: 'Total Visits', value: stats.total_visits, color: 'var(--accent)' },
    { label: 'Projects', value: projectCount, color: 'var(--accent-2)' },
    { label: 'Certificates', value: certificateCount, color: 'var(--accent)' },
  ]

  return (
    <div className="mb-12">
      <div className="grid grid-cols-3 gap-4 mb-6">
        {cards.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass p-5 text-center"
          >
            <p className="text-3xl font-bold" style={{ color: c.color }}>
              {c.value}
            </p>
            <p className="text-xs text-[var(--text-secondary)] mt-1">{c.label}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass p-6"
      >
        <h2 className="text-sm font-semibold text-[var(--text-secondary)] mb-4">
          Visits — Last 7 Days
        </h2>
        <div className="flex items-end gap-2 h-32">
          {days.map(([day, count]) => (
            <div key={day} className="flex-1 flex flex-col items-center gap-1">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(count / maxCount) * 100}%` }}
                transition={{ duration: 0.5 }}
                className="w-full rounded-t-md"
                style={{ background: 'linear-gradient(180deg, var(--accent), var(--accent-2))', minHeight: 4 }}
              />
              <span className="text-[10px] text-[var(--text-secondary)]">{day.slice(5)}</span>
              <span className="text-xs font-medium">{count}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}