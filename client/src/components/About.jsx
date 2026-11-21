import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function About() {
  const [aboutData, setAboutData] = useState({ images: [], aboutText: [], whyChooseUsText: [] })
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
    if (popupSlide) return
    if (!slideImages || slideImages.length <= 1) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideImages.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [slideImages.length, popupSlide])

  useEffect(() => {
    if (popupSlide) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [popupSlide])

  return (
    <>
      <section id="about" className="relative py-5 sm:py-6 lg:py-8 overflow-hidden text-slate-800 bg-transparent">
        <div className="max-w-7xl xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">

            {/* Left Side: About & Why Choose Us Text */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-6 bg-white/85 backdrop-blur-md rounded-2xl p-5 sm:p-7 border border-white/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex flex-col justify-between"
            >
              <div>
                <div className="mb-4 sm:mb-6">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-[var(--font-space)] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-800 via-purple-500 to-indigo-800 animate-text-gradient drop-shadow-xl">
                    About Us
                  </h2>
                </div>

                <div className="space-y-3 text-slate-600 font-[var(--font-outfit)] text-xs sm:text-sm leading-relaxed">
                  {aboutData.aboutText.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>

              {aboutData.whyChooseUsText && aboutData.whyChooseUsText.length > 0 && (
                <div className="mt-5 pt-5 border-t border-slate-100">
                  <div className="mb-3 sm:mb-4">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-[var(--font-space)] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-800 via-purple-500 to-indigo-800 animate-text-gradient drop-shadow-xl">
                      Why Choose Us
                    </h2>
                  </div>
                  <div className="space-y-1.5 text-slate-600 font-[var(--font-outfit)] text-xs sm:text-sm leading-relaxed">
                    {aboutData.whyChooseUsText.map((para, i) =>
                      i === aboutData.whyChooseUsText.length - 1 ? (
                        <p key={i} className="font-semibold text-orange-600 italic">{para}</p>
                      ) : (
                        <p key={i}>{para}</p>
                      )
                    )}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Right Side: Showcase Carousel with perfect fit */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-6 relative flex flex-col justify-center min-h-[300px] sm:min-h-[380px]"
            >
              {slideImages && slideImages.length > 0 ? (
                <div className="relative w-full h-full min-h-[300px] sm:min-h-[380px] rounded-2xl overflow-hidden border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.06)] bg-slate-950 group">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentSlide}
                      src={slideImages[currentSlide]?.url}
                      initial={{ opacity: 0, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0 w-full h-full object-cover cursor-pointer"
                      alt={`Slide ${currentSlide + 1}`}
                      onClick={() => setPopupSlide(slideImages[currentSlide])}
                      draggable={false}
                    />
                  </AnimatePresence>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                  {/* Clean bottom controls */}
                  <div className="absolute bottom-3.5 inset-x-3.5 flex items-center justify-between z-20 pointer-events-auto">
                    <div className="bg-black/45 backdrop-blur-md px-2.5 py-1 rounded-full text-white/90 text-[11px] font-mono border border-white/10">
                      {currentSlide + 1} / {slideImages.length}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setCurrentSlide((prev) => (prev === 0 ? slideImages.length - 1 : prev - 1))}
                        className="w-8 h-8 bg-white/90 hover:bg-white text-slate-800 hover:text-orange-600 rounded-full flex items-center justify-center shadow-md backdrop-blur-md transition-all active:scale-95"
                        aria-label="Previous slide"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={() => setCurrentSlide((prev) => (prev + 1) % slideImages.length)}
                        className="w-8 h-8 bg-white/90 hover:bg-white text-slate-800 hover:text-orange-600 rounded-full flex items-center justify-center shadow-md backdrop-blur-md transition-all active:scale-95"
                        aria-label="Next slide"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full min-h-[300px] rounded-2xl bg-white/60 border border-slate-200/80 flex items-center justify-center text-slate-400">
                  No preview images available
                </div>
              )}
            </motion.div>

          </div>
        </div>
      </section>

      {/* Image Popup Modal */}
      <AnimatePresence>
        {popupSlide && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPopupSlide(null)}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[300] cursor-zoom-out flex items-center justify-center p-4 sm:p-6"
          >
            <div className="relative pointer-events-auto inline-flex flex-col items-center max-w-4xl max-h-[85vh]">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setPopupSlide(null)
                }}
                className="absolute -top-3 -right-3 sm:-top-5 sm:-right-5 w-9 h-9 bg-white hover:bg-orange-500 text-slate-800 hover:text-white rounded-full flex items-center justify-center shadow-lg transition-colors z-30"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <motion.img
                key={popupSlide.url}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                src={popupSlide.url}
                alt="Popup content"
                onClick={(e) => e.stopPropagation()}
                className="w-auto h-auto max-w-[92vw] max-h-[80vh] object-contain rounded-2xl shadow-2xl cursor-default"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
