import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Showreel() {
  const [projects, setProjects] = useState([])
  const [selectedVideo, setSelectedVideo] = useState(null)

  useEffect(() => {
    fetch('/api/content')
      .then((r) => r.json())
      .then((data) => {
        if (data?.showreel?.length > 0) setProjects(data.showreel)
      })
      .catch(() => { })
  }, [])

  useEffect(() => {
    if (selectedVideo) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedVideo])

  return (
    <section id="portfolio" className="relative py-12 lg:py-20 overflow-hidden text-slate-800 bg-transparent">
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10 lg:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="relative inline-flex items-center justify-center mt-2 sm:mt-4"
          >
            <h2 className="relative z-10 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-[var(--font-space)] tracking-tight text-center px-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-800 via-purple-500 to-indigo-800 animate-text-gradient drop-shadow-xl">
              Our Recent Work
            </h2>
          </motion.div>
        </div>

        {/* Balanced 2-column Showcase Grid with tight gaps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
          {projects.map((project, idx) => (
            <motion.div
              key={project._id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.45 }}
              onClick={() => setSelectedVideo(project)}
              className="group cursor-pointer relative rounded-2xl overflow-hidden aspect-video bg-slate-900 border border-white/80 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_32px_rgba(253,140,66,0.18)] hover:border-orange-300/80 hover:-translate-y-1 transition-all duration-300"
            >
              {/* Thumbnail Image */}
              <img
                src={project.thumbnail?.url || `https://img.youtube.com/vi/${project.youtubeId}/maxresdefault.jpg`}
                alt={project.title}
                onError={(e) => {
                  if (!project.thumbnail?.url) {
                    e.target.onerror = null
                    e.target.src = `https://img.youtube.com/vi/${project.youtubeId}/hqdefault.jpg`
                  }
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
              />

              {/* Refined Proportional Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/95 text-orange-600 rounded-full flex items-center justify-center backdrop-blur-md shadow-lg group-hover:scale-110 group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-amber-500 group-hover:text-white transition-all duration-300">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>

              {/* Bottom Glass Caption */}
              {project.title && (
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-between pointer-events-none">
                  <h3 className="text-white font-bold font-[var(--font-space)] text-xs sm:text-sm tracking-tight truncate drop-shadow">
                    {project.title}
                  </h3>
                  <span className="text-[10px] sm:text-xs text-white/90 font-semibold px-2.5 py-0.5 bg-white/20 backdrop-blur-md rounded-full ml-3 shrink-0">
                    Watch Reel
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Popup Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedVideo(null)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[200]"
            />
            <motion.div
              data-lenis-prevent
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-5xl bg-white border border-slate-100 rounded-3xl overflow-hidden z-[201] shadow-2xl flex flex-col"
            >
              <div className="relative w-full aspect-video bg-black">
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="absolute top-4 right-4 w-9 h-9 bg-black/60 hover:bg-orange-500 text-white rounded-full flex items-center justify-center transition-colors z-20 backdrop-blur-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0`}
                  title={selectedVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                ></iframe>
              </div>

              {/* Title Bar */}
              <div className="p-3.5 sm:p-4 bg-white flex items-center justify-between border-t border-slate-100">
                <h3 className="font-bold text-sm sm:text-base font-[var(--font-space)] text-slate-900 truncate">
                  {selectedVideo.title}
                </h3>
                <span className="text-xs text-slate-500 font-semibold">
                  Tropixie Showcase
                </span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
