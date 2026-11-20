import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Stats() {
  const [stats, setStats] = useState([])

  useEffect(() => {
    fetch('/api/content')
      .then((r) => r.json())
      .then((data) => {
        if (data?.stats?.length > 0) setStats(data.stats)
      })
      .catch(() => { })
  }, [])

  if (!stats || stats.length === 0) return null

  return (
    <section className="relative py-8 lg:py-12 overflow-hidden text-slate-800 bg-transparent">
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat._id || idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.45 }}
              className="group relative bg-white/85 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-white/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_28px_rgba(253,140,66,0.15)] hover:border-orange-200/80 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-center items-center text-center"
            >
              <div className="absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-orange-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-[var(--font-space)] tracking-tight bg-gradient-to-r from-orange-500 via-amber-500 to-purple-600 bg-clip-text text-transparent mb-1 drop-shadow-sm">
                {stat.title}
              </h3>
              <p className="font-semibold text-xs sm:text-sm text-slate-600 font-[var(--font-outfit)] uppercase tracking-wider">
                {stat.subtitle}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
