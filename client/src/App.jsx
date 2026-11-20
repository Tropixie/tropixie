import { useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Stats from './components/Stats'
import Services from './components/Services'
import Showreel from './components/Showreel'
import Team from './components/Team'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import FloatingNav from './components/FloatingNav'
import AdminLogin from './admin/AdminLogin'
import AdminDashboard from './admin/AdminDashboard'
import ProtectedRoute from './admin/ProtectedRoute'

gsap.registerPlugin(ScrollTrigger)

function MainSite() {
  const lenisRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    })

    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    const stopScroll = () => lenis.stop()
    const startScroll = () => lenis.start()

    window.addEventListener('stop-scroll', stopScroll)
    window.addEventListener('start-scroll', startScroll)

    return () => {
      window.removeEventListener('stop-scroll', stopScroll)
      window.removeEventListener('start-scroll', startScroll)
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])

  return (
    <>
      <Helmet>
        <title>Tropixie Animation Studio | 3D Animation, VFX & Motion Graphics</title>
        <meta
          name="description"
          content="Tropixie Animation Studio — Premium 3D animation, VFX, motion graphics, and AI-driven content from Medinipur, India."
        />
      </Helmet>

      <div className="relative overflow-x-hidden min-h-screen bg-gradient-to-b from-[#fdfbf7] via-[#f7f3fb] to-[#f2f6fc] text-slate-800 antialiased selection:bg-orange-500 selection:text-white">
        {/* Global Website Premium Ambient Gradient Background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          {/* Rich luminous gradient mesh orbs */}
          <div className="absolute -top-[10%] -left-[10%] w-[65vw] h-[65vw] max-w-[800px] max-h-[800px] rounded-full bg-gradient-to-br from-orange-400/25 via-amber-300/20 to-transparent blur-[100px]" />
          <div className="absolute top-[12%] -right-[12%] w-[70vw] h-[70vw] max-w-[850px] max-h-[850px] rounded-full bg-gradient-to-bl from-purple-500/22 via-indigo-400/18 to-transparent blur-[110px]" />
          <div className="absolute top-[42%] -left-[10%] w-[60vw] h-[60vw] max-w-[750px] max-h-[750px] rounded-full bg-gradient-to-tr from-sky-400/18 via-indigo-300/16 to-transparent blur-[100px]" />
          <div className="absolute top-[68%] -right-[10%] w-[65vw] h-[65vw] max-w-[800px] max-h-[800px] rounded-full bg-gradient-to-tl from-rose-400/20 via-purple-300/18 to-transparent blur-[110px]" />
          <div className="absolute -bottom-[10%] left-[20%] w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-full bg-gradient-to-t from-amber-300/20 via-orange-300/15 to-transparent blur-[100px]" />

          {/* Micro-dot grid for depth & studio polish */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #1e293b 1px, transparent 0)',
              backgroundSize: '32px 32px',
            }}
          />

          {/* Soft ambient vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/40 pointer-events-none" />
        </div>

        <Navbar />
        <main className="relative z-10 mt-16 lg:mt-20">
          <Hero />
          <About />
          <Stats />
          <Services />
          <Showreel />
          <Team />
          <Contact />
        </main>
        <div className="relative z-10">
          <Footer />
        </div>
        <FloatingNav />
        <WhatsAppButton />
      </div>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainSite />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
