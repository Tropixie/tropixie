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

  // Last service displayed as special centered card (like 3D Printing before)
  const mainServices = services.slice(0, services.length - 1)
  const specialService = services[services.length - 1]

  return (
    <section id="services" className="relative py-20 lg:py-32 border-y border-tropixie-border/40 overflow-hidden text-gray-900 bg-transparent">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">

        <div className="flex flex-col items-center text-center mb-12 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative inline-flex items-center justify-center mt-6"
          >
            <h2 className="relative z-10 text-4xl md:text-5xl lg:text-6xl font-bold font-[var(--font-space)] tracking-tight whitespace-nowrap px-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-800 via-purple-500 to-indigo-800 animate-text-gradient drop-shadow-xl">
              Our Services
            </h2>
          </motion.div>
        </div>

        {/* Smooth Background Highlight for Cards */}
        <div className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] max-w-5xl h-[80%] bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.08),transparent_70%)] rounded-full pointer-events-none z-0"></div>

        {/* Grid */}
        <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {mainServices.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.5 }}
              onClick={() => setSelectedService(service)}
              className="cursor-pointer group relative bg-gradient-to-br from-white to-tropixie-dark rounded-xl p-4 sm:p-6 border border-tropixie-border shadow-lg hover:border-tropixie-primary hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] transition-all duration-300 flex flex-col justify-center items-center"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shadow-lg border border-tropixie-primary/20 mb-4 sm:mb-5 group-hover:scale-110 group-hover:border-tropixie-primary transition-all duration-300">
                <img src={service.icon?.url} alt={service.title} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-2 font-[var(--font-space)] leading-tight w-full text-center">{service.title}</h3>
            </motion.div>
          ))}
        </div>

        {/* Special Last Service Centered Card */}
        {specialService && (
          <div className="flex justify-center mt-4 sm:mt-6">
            <div className="w-[calc(50%-0.5rem)] sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)]">
              <motion.div
                onClick={() => setSelectedService(specialService)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="flex flex-col justify-center items-center cursor-pointer group relative bg-gradient-to-br from-tropixie-dark to-[#ffe4e6] rounded-xl p-4 sm:p-6 border border-purple-500/50 shadow-[0_0_25px_rgba(168,85,247,0.3)] hover:shadow-[0_0_35px_rgba(168,85,247,0.6)] hover:border-purple-400 transition-all duration-300 h-full block"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shadow-[0_0_15px_rgba(168,85,247,0.5)] border border-purple-400/50 mb-4 sm:mb-5 group-hover:scale-110 transition-all duration-300">
                  <img src={specialService.icon?.url} alt={specialService.title} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-2 font-[var(--font-space)] leading-tight w-full text-center">{specialService.title}</h3>
              </motion.div>
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
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[200]"
            />
            <motion.div
              data-lenis-prevent
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-lg bg-white rounded-[2rem] z-[201] p-8 md:p-10 shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-gray-100 flex flex-col items-center text-center"
            >
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-gray-50 hover:bg-tropixie-primary text-gray-500 hover:text-white rounded-full flex items-center justify-center transition-all duration-300 shadow-sm"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>

              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shadow-lg border border-tropixie-primary/20 mb-6">
                <img src={selectedService.icon?.url} alt={selectedService.title} className="w-full h-full object-cover" />
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 font-[var(--font-space)]">
                {selectedService.title}
              </h3>

              <p className="text-gray-600 font-[var(--font-outfit)] text-base leading-relaxed">
                {selectedService.fullDesc}
              </p>

              {selectedService.externalLink && (
                <a
                  href={selectedService.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 px-8 py-3 bg-gradient-to-r from-tropixie-primary to-purple-600 rounded-full text-white font-bold text-sm shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_rgba(168,85,247,0.8)] transition-all duration-300"
                >
                  Explore
                </a>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}