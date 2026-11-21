import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Contact() {
  const [tagline, setTagline] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    message: ''
  })

  useEffect(() => {
    fetch('/api/content')
      .then((r) => r.json())
      .then((data) => {
        if (data?.contact?.tagline) setTagline(data.contact.tagline)
      })
      .catch(() => { })
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleEmailSubmit = (e) => {
    e.preventDefault()
    const emailAddress = "hello.tropixie@gmail.com"
    const subject = encodeURIComponent(`New Inquiry: ${formData.subject}`)
    const body = encodeURIComponent(`Name: ${formData.name}\n\nMessage:\n${formData.message}`)
    const mailtoUrl = `mailto:${emailAddress}?subject=${subject}&body=${body}`
    window.location.href = mailtoUrl
  }

  return (
    <section id="contact" className="relative py-5 sm:py-6 lg:py-8 overflow-hidden text-slate-800 bg-transparent">
      <div className="relative z-10 max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Unified Premium Contact Card */}
        <motion.div
          id="contact-box"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="bg-white/85 backdrop-blur-md rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.04)] grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch"
        >
          {/* Left Side: Pitch & Information */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="mb-3 sm:mb-4">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-[var(--font-space)] leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-800 via-purple-500 to-indigo-800 animate-text-gradient drop-shadow-xl">
                  Let's Create
                </h2>
              </div>
              <span className="font-[var(--font-space)] tracking-[0.1em] text-base sm:text-lg md:text-xl font-semibold uppercase mb-4 text-gray-900/90 block">
                SOMETHING AMAZING TOGETHER
              </span>
              <p className="text-slate-600 font-[var(--font-outfit)] text-xs sm:text-sm leading-relaxed">
                {tagline || 'Have an idea for a show, 3D commercial, or animation project? We would love to collaborate and bring your concept to life.'}
              </p>
            </div>

            {/* Quick Contact Chips */}
            <div className="mt-5 pt-5 border-t border-slate-100 space-y-2.5">
              <a
                href="mailto:hello.tropixie@gmail.com"
                className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 hover:bg-orange-50/60 border border-slate-100 hover:border-orange-200/70 transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Email Directly</p>
                  <p className="text-xs font-semibold text-slate-700 group-hover:text-orange-600 transition-colors truncate">
                    hello.tropixie@gmail.com
                  </p>
                </div>
              </a>

              <a
                href="tel:+918436601135"
                className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 hover:bg-orange-50/60 border border-slate-100 hover:border-orange-200/70 transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Studio Phone</p>
                  <p className="text-xs font-semibold text-slate-700 group-hover:text-orange-600 transition-colors">
                    +91 8436601135
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="lg:col-span-7 bg-slate-50/70 border border-slate-100 rounded-xl p-4 sm:p-5 flex flex-col justify-center">
            <form onSubmit={handleEmailSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Alex Morgan"
                  className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
                  Subject / Project Type
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="e.g. 3D Animation / Commercial"
                  className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell us about your project vision, timeline, or requirements..."
                  rows="3"
                  className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full btn-gradient py-2.5 justify-center text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-orange-500/25 mt-1"
              >
                Send Inquiry
              </button>
            </form>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
