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

  return (
    <section className="relative py-10 lg:py-16 overflow-hidden text-gray-900 bg-transparent">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="group relative bg-gradient-to-br from-white to-tropixie-dark rounded-xl p-6 sm:p-8 border border-tropixie-border shadow-lg hover:border-tropixie-primary hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] transition-all duration-300 flex flex-col justify-center items-center text-center"
            >
              <h3 className="text-4xl md:text-5xl font-bold font-[var(--font-space)] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-800 via-purple-500 to-indigo-800 mb-2 drop-shadow-sm">
                {stat.title}
              </h3>
              <p className="font-bold text-base sm:text-lg text-gray-900 font-[var(--font-space)] leading-tight text-center">
                {stat.subtitle}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
