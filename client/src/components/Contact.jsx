import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Contact() {
  const [tagline, setTagline] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    message: ''
  });

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
    });
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    const emailAddress = "hello.tropixie@gmail.com";
    const subject = encodeURIComponent(`New Inquiry: ${formData.subject}`);
    const body = encodeURIComponent(`Name: ${formData.name}\n\nMessage:\n${formData.message}`);
    const mailtoUrl = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
    window.location.href = mailtoUrl;
  };

  return (
    <section id="contact" className="relative pt-10 lg:pt-12 pb-20 overflow-hidden text-gray-900 bg-transparent">
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 lg:px-8">
        {/* Main Contact Box */}
        <motion.div
          id="contact-box"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-tropixie-dark-card rounded-3xl p-8 md:p-12 text-gray-900 shadow-[0_10px_30px_rgba(0,0,0,0.3)] border border-tropixie-border flex flex-col md:flex-row gap-8 lg:gap-12"
        >
          {/* Left side: Info */}
          <div className="flex-1 flex flex-col justify-start -mt-4 md:-mt-6">
            <div className="mb-4">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-[var(--font-space)] leading-tight tracking-tight whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-indigo-800 via-purple-500 to-indigo-800 animate-text-gradient drop-shadow-xl">
                Let's Create
              </h2>
            </div>
            <span className="font-[var(--font-space)] tracking-[0.1em] text-xl md:text-2xl font-semibold uppercase mb-6 text-gray-900/90 block">
              SOMETHING AMAZING TOGETHER
            </span>

            <div className="space-y-6">
              <p className="text-gray-700 font-[var(--font-outfit)] text-sm md:text-base leading-relaxed font-light">
                {tagline}
              </p>
            </div>
          </div>

          {/* Right side: Form */}
          <div className="flex-1 bg-white border border-tropixie-border rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-lg">
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Your Name" className="w-full bg-white border border-tropixie-border rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-500 outline-none focus:border-tropixie-primary focus:ring-2 focus:ring-tropixie-primary/20 transition-all" />
              <input type="text" name="subject" value={formData.subject} onChange={handleChange} required placeholder="Subject" className="w-full bg-white border border-tropixie-border rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-500 outline-none focus:border-tropixie-primary focus:ring-2 focus:ring-tropixie-primary/20 transition-all" />
              <textarea name="message" value={formData.message} onChange={handleChange} required placeholder="Your Message" rows="4" className="w-full bg-white border border-tropixie-border rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-500 outline-none focus:border-tropixie-primary focus:ring-2 focus:ring-tropixie-primary/20 transition-all resize-none"></textarea>

              <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white font-bold font-[var(--font-outfit)] py-3 px-8 rounded-xl text-sm flex items-center justify-center gap-2 hover:shadow-lg transition-all w-full mt-4">
                Submit
              </button>
            </form>
          </div>
        </motion.div>

      </div>

    </section>
  )
}
