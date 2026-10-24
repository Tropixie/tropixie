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
    <section id="portfolio" className="relative py-20 lg:py-32 overflow-hidden text-gray-900 bg-transparent">
      <div className="relative z-10 max-w-7xl xl:max-w-[1450px] 2xl:max-w-[1600px] mx-auto px-6 lg:px-8 xl:px-12">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="relative inline-flex items-center justify-center mt-6"
          >
            <h2 className="relative z-10 text-4xl md:text-5xl lg:text-6xl font-bold font-[var(--font-space)] tracking-tight text-center px-4 whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-indigo-800 via-purple-500 to-indigo-800 animate-text-gradient drop-shadow-xl">
              Our Recent Work
            </h2>
          </motion.div>
        </div>

        {/* Grid - 1 col on mobile, 2 large cols on PC */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-10 xl:gap-12">
          {projects.map((project, idx) => (
            <motion.div
              key={project._id || idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              onClick={() => setSelectedVideo(project)}
              className="group cursor-pointer relative rounded-2xl lg:rounded-3xl overflow-hidden aspect-video bg-tropixie-dark border border-gray-900/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] lg:shadow-[0_20px_50px_rgba(0,0,0,0.45)] hover:border-tropixie-primary hover:shadow-[0_25px_65px_rgba(168,85,247,0.35)] hover:-translate-y-1.5 transition-all duration-300"
            >
              {/* Thumbnail Image */}
              <img
                src={project.thumbnail?.url || `https://img.youtube.com/vi/${project.youtubeId}/maxresdefault.jpg`}
                alt={project.title}
                onError={(e) => {
                  if (!project.thumbnail?.url) {
                    e.target.onerror = null;
                    e.target.src = `https://img.youtube.com/vi/${project.youtubeId}/hqdefault.jpg`;
                  }
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-70 group-hover:opacity-100"
              />

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 lg:w-24 lg:h-24 xl:w-28 xl:h-28 bg-tropixie-primary/85 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-tropixie-primary transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.5)] lg:shadow-[0_0_35px_rgba(168,85,247,0.7)] group-hover:scale-110">
                  <svg className="w-8 h-8 lg:w-11 lg:h-11 xl:w-13 xl:h-13 text-white ml-1 lg:ml-1.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                </div>
              </div>

              {/* Subtle title info bar */}
              {project.title && (
                <div className="absolute inset-x-0 bottom-0 p-4 lg:p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-between pointer-events-none">
                  <h3 className="text-white font-bold font-[var(--font-space)] text-sm sm:text-base lg:text-lg xl:text-xl tracking-tight truncate drop-shadow">
                    {project.title}
                  </h3>
                  <span className="text-[11px] lg:text-xs text-purple-200 font-semibold px-2.5 py-1 bg-white/15 backdrop-blur-md rounded-full ml-3 shrink-0 hidden sm:inline-block">
                    Watch Video
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
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[200]"
            />
            <motion.div
              data-lenis-prevent
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] lg:w-[90%] max-w-7xl h-auto max-h-[90vh] bg-white border border-tropixie-border rounded-3xl overflow-hidden z-[201] shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col lg:flex-row"
            >
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/40 hover:bg-tropixie-primary text-white rounded-full flex items-center justify-center transition-colors z-[210] backdrop-blur-sm shadow-md"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>

              {/* Main Video Player */}
              <div className="w-full lg:w-[70%] xl:w-[75%] bg-black relative flex-shrink-0 flex flex-col justify-center">
                <div className="w-full aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0`}
                    title={selectedVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  ></iframe>
                </div>
              </div>

              {/* Title and Playlist Container */}
              <div className="flex-1 bg-white/90 p-4 lg:p-6 flex flex-col overflow-hidden max-h-[40vh] lg:max-h-none">
                <h3 className="text-lg lg:text-2xl font-bold text-purple-900 mb-4 tracking-tight truncate shrink-0">
                  {selectedVideo.title}
                </h3>

                <h4 className="text-gray-900 font-bold font-[var(--font-outfit)] text-sm mb-4 flex items-center justify-between shrink-0">
                  More Videos
                  <span className="bg-tropixie-primary/20 text-tropixie-primary text-xs px-2 py-1 rounded-full">{projects.length}</span>
                </h4>

                {/* Thumbnails Scroll Area */}
                <div className="flex lg:flex-col gap-3 lg:gap-4 overflow-x-auto lg:overflow-x-hidden lg:overflow-y-auto pb-2 lg:pb-0 lg:pr-2 flex-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {projects.map((project, idx) => (
                    <div
                      key={project._id || idx}
                      onClick={() => setSelectedVideo(project)}
                      className={`flex-shrink-0 w-36 lg:w-full aspect-video rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-300 relative group ${selectedVideo._id === project._id || selectedVideo.youtubeId === project.youtubeId ? 'border-tropixie-primary opacity-100 shadow-[0_0_15px_rgba(168,85,247,0.5)] lg:scale-[1.02] ml-1 mr-1 lg:ml-0 lg:mr-0' : 'border-transparent opacity-60 hover:opacity-100 hover:border-tropixie-primary/50'}`}
                    >
                      <img
                        src={project.thumbnail?.url || `https://img.youtube.com/vi/${project.youtubeId}/mqdefault.jpg`}
                        alt={project.title}
                        onError={(e) => {
                          if (!project.thumbnail?.url) {
                            e.target.onerror = null;
                            e.target.src = `https://img.youtube.com/vi/${project.youtubeId}/hqdefault.jpg`;
                          }
                        }}
                        className="w-full h-full object-cover"
                      />
                      {(selectedVideo.youtubeId !== project.youtubeId) && (
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                          <div className="w-8 h-8 bg-tropixie-primary/80 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-tropixie-primary transition-all duration-300 lg:group-hover:scale-110">
                            <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
