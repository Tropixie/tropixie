import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function About() {
  const [aboutData, setAboutData] = useState({ images: [], aboutText: [], whyChooseUsText: [] })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [popupSlide, setPopupSlide] = useState(null)

  useEffect(() => {
    fetch('/api/content')
      .then((r) => r.json())
      .then((data) => {
        if (data?.about) {
          setAboutData({
            images: data.about.images || [],
            aboutText: data.about.aboutText || [],
            whyChooseUsText: data.about.whyChooseUsText || [],
          })
        }
      })
      .catch(() => { })
  }, [])

  const slideImages = aboutData.images

  useEffect(() => {
    if (popupSlide || isModalOpen) return
    const timer = setInterval(() => {
      if (slideImages.length > 0) {
        setCurrentSlide((prev) => (prev + 1) % slideImages.length)
      }
    }, 4000)
    return () => clearInterval(timer)
  }, [slideImages.length, popupSlide, isModalOpen, currentSlide])

  useEffect(() => {
    if (isModalOpen || popupSlide) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isModalOpen, popupSlide])

  return (
    <>
      <section id="about" className="relative py-20 lg:py-32 overflow-hidden text-gray-900 bg-transparent">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(168,85,247,0.08),transparent_70%)] pointer-events-none -translate-y-1/2 translate-x-1/3 z-0"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(147,51,234,0.06),transparent_70%)] pointer-events-none translate-y-1/3 -translate-x-1/3 z-0"></div>

        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-stretch gap-16 lg:gap-12">

          {/* Left Side: Text Content */}
          <div className="w-full lg:w-[45%] flex flex-col items-start text-left relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="w-full max-w-xl relative z-10 bg-white/90 backdrop-blur-md rounded-[2rem] p-8 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-white/50 h-full flex flex-col justify-center"
            >
              <div className="mb-6 md:mb-8">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-[var(--font-space)] tracking-tight whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-indigo-800 via-purple-500 to-indigo-800 animate-text-gradient drop-shadow-xl">
                  About Us
                </h2>
              </div>
              <div className="space-y-6 text-gray-700 font-[var(--font-outfit)] text-base md:text-lg mb-8 leading-relaxed font-light">
                {aboutData.aboutText.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              <div className="mb-6 md:mb-8 mt-2">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-[var(--font-space)] tracking-tight whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-indigo-800 via-purple-500 to-indigo-800 animate-text-gradient drop-shadow-xl">
                  Why Choose Us
                </h2>
              </div>
              <div className="space-y-6 text-gray-700 font-[var(--font-outfit)] text-base md:text-lg mb-2 leading-relaxed font-light">
                {aboutData.whyChooseUsText.map((para, i) =>
                  i === aboutData.whyChooseUsText.length - 1 ? (
                    <p key={i} className="font-semibold italic text-indigo-900 mt-4 text-lg">{para}</p>
                  ) : (
                    <p key={i}>{para}</p>
                  )
                )}
              </div>
            </motion.div>
          </div>

          {/* Right Side: 3D Holographic Slideshow */}
          <div className="w-full lg:w-[55%] relative z-20 flex flex-col items-center justify-center" style={{ perspective: '2000px' }}>

            {/* Back Card (Next Slide Preview) */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="absolute w-[80%] sm:w-[75%] lg:w-[85%] aspect-[4/3] lg:aspect-auto lg:h-[95%] rounded-3xl sm:rounded-[2rem] overflow-hidden border border-gray-900/10 shadow-[0_30px_60px_rgba(0,0,0,0.6)] z-10 hidden md:block"
              style={{ transform: 'translateX(40px) scale(0.9) rotateY(-15deg)' }}
            >
              <img src={slideImages[(currentSlide + 1) % slideImages.length]?.url} className="w-full h-full object-cover opacity-50 blur-[2px]" alt="Next slide preview" />
              <div className="absolute inset-0 bg-tropixie-dark/50"></div>
            </motion.div>

            {/* Main Active Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-full sm:w-[90%] aspect-[4/3] lg:aspect-auto lg:h-full rounded-3xl sm:rounded-[2rem] overflow-hidden border border-gray-900/20 shadow-[0_50px_100px_rgba(168,85,247,0.15)] z-20 bg-tropixie-dark-card"
            >
              <div className="absolute inset-0">
                <AnimatePresence>
                  <motion.img
                    key={currentSlide}
                    src={slideImages[currentSlide]?.url}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-700"
                    alt={`Slide ${currentSlide + 1}`}
                    onClick={() => setPopupSlide(slideImages[currentSlide])}
                    draggable={false}
                  />
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Outside Controls (Bottom Arrows) */}
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex gap-6 z-30">
              <button
                onClick={() => setCurrentSlide((prev) => (prev === 0 ? slideImages.length - 1 : prev - 1))}
                className="w-12 h-12 bg-white/80 hover:bg-white text-gray-900 hover:text-tropixie-primary rounded-full flex items-center justify-center shadow-[0_10px_20px_rgba(0,0,0,0.1)] transition-all hover:scale-110 active:scale-95 border border-gray-900/10 backdrop-blur-md"
                aria-label="Previous slide"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
              </button>

              <button
                onClick={() => setCurrentSlide((prev) => (prev + 1) % slideImages.length)}
                className="w-12 h-12 bg-white/80 hover:bg-white text-gray-900 hover:text-tropixie-primary rounded-full flex items-center justify-center shadow-[0_10px_20px_rgba(0,0,0,0.1)] transition-all hover:scale-110 active:scale-95 border border-gray-900/10 backdrop-blur-md"
                aria-label="Next slide"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>

        </div>

      </section>

      {/* Image Popup Modal */}
      <AnimatePresence>
        {popupSlide && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPopupSlide(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[300] cursor-zoom-out flex items-center justify-center p-4 md:p-8"
            >
              <div className="relative pointer-events-auto inline-flex flex-col items-center max-w-full max-h-full">
                {/* Popup Bottom Arrows */}
                <div className="fixed bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex gap-6 z-30 pointer-events-auto">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const idx = slideImages.findIndex(img => img.url === popupSlide.url);
                      setPopupSlide(slideImages[idx === 0 ? slideImages.length - 1 : idx - 1]);
                    }}
                    className="w-12 h-12 bg-white/80 hover:bg-white text-gray-900 hover:text-tropixie-primary rounded-full flex items-center justify-center shadow-2xl transition-colors border border-gray-900/10"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const idx = slideImages.findIndex(img => img.url === popupSlide.url);
                      setPopupSlide(slideImages[(idx + 1) % slideImages.length]);
                    }}
                    className="w-12 h-12 bg-white/80 hover:bg-white text-gray-900 hover:text-tropixie-primary rounded-full flex items-center justify-center shadow-2xl transition-colors border border-gray-900/10"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  <motion.img
                    key={popupSlide.url}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    src={popupSlide.url}
                    alt={popupSlide.description || "Popup content"}
                    onClick={(e) => e.stopPropagation()}
                    className="w-auto h-auto max-w-[95vw] max-h-[85vh] object-contain rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] cursor-default"
                  />
                </AnimatePresence>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setPopupSlide(null);
                  }}
                  className="absolute -top-4 -right-4 md:-top-6 md:-right-6 w-12 h-12 bg-white hover:bg-tropixie-primary text-gray-800 hover:text-gray-900 rounded-full flex items-center justify-center transition-colors shadow-2xl z-30"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </>
  )
}
