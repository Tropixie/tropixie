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

      <div className="relative overflow-x-hidden min-h-screen bg-[#fafafc]">
        {/* Global Website Background (Mobile & PC) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {/* Mobile Background */}
          <img
            src="/mob.png"
            alt=""
            decoding="async"
            className="block lg:hidden w-full h-full object-cover object-top opacity-[0.08]"
          />

          {/* PC Background */}
          <img
            src="/pC.png"
            alt=""
            decoding="async"
            className="hidden lg:block w-full h-full object-cover object-top opacity-[0.09]"
          />

          {/* Soft Ambient Light & Aesthetic Vignette Gradients */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-white/20 to-white/60 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(168,85,247,0.06),transparent_70%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_85%_35%,rgba(245,158,11,0.05),transparent_60%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_15%_65%,rgba(99,102,241,0.06),transparent_70%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_75%_90%,rgba(236,72,153,0.04),transparent_60%)] pointer-events-none" />
        </div>

        <Navbar />
        <main className="relative z-10 mt-24 lg:mt-20">
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
