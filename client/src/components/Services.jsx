import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Services() {
  const [services, setServices] = useState([])
  const [selectedService, setSelectedService] = useState(null)

  useEffect(() => {
    fetch('/api/content')
      .then((r) => r.json())
      .then((data) => {
        if (data?.services?.length > 0) setServices(data.services)
      })
      .catch(() => { })
  }, [])

  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedService])

  // Split services so the last one (e.g. 3D Printing) sits in its own individual centered row
  const mainServices = services.slice(0, services.length - 1)
  const specialService = services.length > 0 ? services[services.length - 1] : null

  const renderServiceCard = (service, idx, isSpecial = false) => (
    <motion.div
      key={service._id || idx}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.04, duration: 0.4 }}
      onClick={() => setSelectedService(service)}
      className={`cursor-pointer group relative bg-white/85 backdrop-blur-md rounded-2xl p-4 sm:p-5 border shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_28px_rgba(253,140,66,0.15)] hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center h-full ${
        isSpecial
          ? 'border-purple-200/80 hover:border-purple-400 bg-gradient-to-br from-white/90 to-purple-50/40'
          : 'border-white/80 hover:border-orange-300/80'
      }`}
    >
      {/* Subtle top indicator line */}
      <div
        className={`absolute top-0 inset-x-6 h-[2px] bg-gradient-to-r from-transparent ${
          isSpecial ? 'via-purple-400/60' : 'via-orange-400/50'
        } to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      />

      {/* Icon Container - Perfectly proportioned */}
      <div
        className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shadow-sm border border-slate-100 mb-3 flex items-center justify-center p-2.5 group-hover:scale-105 group-hover:shadow-md transition-all duration-300 shrink-0 ${
          isSpecial ? 'bg-gradient-to-br from-purple-100/70 to-pink-100/70' : 'bg-gradient-to-br from-orange-50 to-purple-50'
        }`}
      >
        {service.icon?.url ? (
          <img src={service.icon.url} alt={service.title} className="w-full h-full object-contain" />
        ) : (
          <div
            className={`w-full h-full rounded-lg flex items-center justify-center font-bold text-base ${
              isSpecial ? 'bg-purple-100 text-purple-600' : 'bg-orange-100/60 text-orange-600'
            }`}
          >
            {service.title?.charAt(0) || '★'}
          </div>
        )}
      </div>

      {/* Title */}
      <h3
        className={`font-bold text-xs sm:text-sm lg:text-base text-slate-800 ${
          isSpecial ? 'group-hover:text-purple-600' : 'group-hover:text-orange-600'
        } font-[var(--font-space)] transition-colors leading-snug line-clamp-2`}
      >
        {service.title}
      </h3>

      {/* Detail button */}
      <div
        className={`mt-auto pt-3 inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold ${
          isSpecial ? 'text-purple-600' : 'text-orange-500'
        } opacity-85 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all`}
      >
        <span>Detail</span>
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </motion.div>
  )

  return (
    <section id="services" className="relative py-5 sm:py-6 lg:py-8 overflow-hidden text-slate-800 bg-transparent">
      <div className="relative z-10 max-w-7xl xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-5 sm:mb-6 lg:mb-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative inline-flex items-center justify-center mt-2 sm:mt-4"
          >
            <h2 className="relative z-10 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-[var(--font-space)] tracking-tight text-center px-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-800 via-purple-500 to-indigo-800 animate-text-gradient drop-shadow-xl">
              Our Services
            </h2>
          </motion.div>
        </div>

        {/* Main Services Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {mainServices.map((service, idx) => renderServiceCard(service, idx, false))}
        </div>

        {/* Individual Row in the Middle for the Last Service (3D Printing) */}
        {specialService && (
          <div className="flex justify-center mt-3 sm:mt-4 lg:mt-5">
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 max-w-[320px]">
              {renderServiceCard(specialService, mainServices.length, true)}
            </div>
          </div>
        )}
      </div>

      {/* Service Popup Modal */}
      <AnimatePresence>
        {selectedService && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[200]"
            />
            <motion.div
              data-lenis-prevent
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-lg bg-white rounded-3xl z-[201] p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.2)] border border-slate-100 flex flex-col items-center text-center"
            >
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 w-9 h-9 bg-slate-100 hover:bg-orange-500 text-slate-600 hover:text-white rounded-full flex items-center justify-center transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shadow-md border border-slate-100 mb-4 bg-gradient-to-br from-orange-50 to-purple-50 p-3">
                {selectedService.icon?.url ? (
                  <img src={selectedService.icon.url} alt={selectedService.title} className="w-full h-full object-contain" />
                ) : (
                  <div className="w-full h-full rounded-xl bg-orange-100/60 flex items-center justify-center text-orange-600 font-bold text-lg">
                    {selectedService.title?.charAt(0) || '★'}
                  </div>
                )}
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 font-[var(--font-space)]">
                {selectedService.title}
              </h3>

              <p className="text-slate-600 font-[var(--font-outfit)] text-xs sm:text-sm leading-relaxed">
                {selectedService.fullDesc || selectedService.shortDesc}
              </p>

              {selectedService.externalLink && (
                <a
                  href={selectedService.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 px-6 py-2 btn-gradient text-xs font-bold uppercase tracking-wider"
                >
                  Explore Work
                </a>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
