import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Team', href: '#team' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)

      const sections = NAV_LINKS.map((l) => l.href.replace('#', ''))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            setActiveSection(sections[i])
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const scrollTo = (href) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav className="absolute top-0 left-0 right-0 z-[100] flex items-center h-16 lg:h-20">
        {/* Subtle Glass Background */}
        <div 
          className="absolute inset-0 bg-white/75 backdrop-blur-sm pointer-events-none"
        ></div>

        <div className="relative z-10 max-w-7xl xl:max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-full">
          {/* Logo / Studio Name */}
          <div
            className="flex items-center gap-2 cursor-pointer select-none"
            onClick={() => scrollTo('#hero')}
          >
            {/* Mobile View: Clean Proportional Logo */}
            <img 
              src="/logo.png" 
              alt="Tropixie Logo" 
              className="h-9 sm:h-10 w-auto object-contain lg:hidden" 
            />

            {/* Desktop View: Studio Wordmark */}
            <span className="hidden lg:flex items-start text-2xl lg:text-3xl font-bold font-[var(--font-space)]">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-800 via-purple-500 to-indigo-800 animate-text-gradient drop-shadow-sm">
                Tropixie Animation Studio
              </span>
              <span className="ml-1.5 -mt-0.5 flex items-center justify-center w-4 h-4 border-[1.5px] border-indigo-800 rounded-full text-[7px] font-bold tracking-tighter text-indigo-800">
                TM
              </span>
            </span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                className={`relative font-[var(--font-outfit)] text-sm font-bold tracking-widest uppercase py-1 transition-all duration-300 group ${
                  activeSection === link.href.replace('#', '')
                    ? 'text-orange-600'
                    : 'text-slate-600 hover:text-orange-500'
                }`}
                onClick={() => scrollTo(link.href)}
              >
                {link.label}

                {/* Underline Indicator */}
                <span
                  className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-[2px] rounded-full transition-all duration-300 ${
                    activeSection === link.href.replace('#', '')
                      ? 'w-full bg-orange-500 shadow-[0_0_8px_rgba(253,140,66,0.6)]'
                      : 'w-0 bg-transparent group-hover:w-1/2 group-hover:bg-orange-300'
                  }`}
                ></span>
              </button>
            ))}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            className="lg:hidden relative z-[101] w-10 h-10 rounded-xl bg-slate-100/80 active:bg-slate-200/80 flex flex-col items-center justify-center gap-1.5 transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="w-5 h-0.5 bg-slate-800 block rounded-full transition-all"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-5 h-0.5 bg-slate-800 block rounded-full transition-all"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="w-5 h-0.5 bg-slate-800 block rounded-full transition-all"
            />
          </button>
        </div>
      </nav>

      {/* Mobile Fullscreen Overlay Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[150] bg-white/95 backdrop-blur-2xl pt-20 px-6 pb-8 flex flex-col justify-between"
          >
            <div className="flex flex-col gap-4 items-center mt-6">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ delay: i * 0.04, duration: 0.25 }}
                  className={`relative font-[var(--font-space)] text-2xl font-bold tracking-wider uppercase py-2 transition-colors ${
                    activeSection === link.href.replace('#', '')
                      ? 'text-orange-600'
                      : 'text-slate-700 hover:text-slate-900'
                  }`}
                  onClick={() => scrollTo(link.href)}
                >
                  {link.label}
                </motion.button>
              ))}
            </div>

            {/* Quick Contact at bottom of mobile menu */}
            <div className="pt-6 border-t border-slate-100 flex flex-col items-center gap-2 text-center text-xs text-slate-500">
              <p className="font-semibold text-slate-700">Tropixie Animation Studio</p>
              <a href="mailto:hello.tropixie@gmail.com" className="text-orange-600 font-medium">
                hello.tropixie@gmail.com
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
