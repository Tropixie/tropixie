import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Team() {
  const [team, setTeam] = useState([])
  const [selectedMember, setSelectedMember] = useState(null)

  useEffect(() => {
    fetch('/api/content')
      .then((r) => r.json())
      .then((data) => {
        if (data?.team?.length > 0) setTeam(data.team)
      })
      .catch(() => { })
  }, [])

  useEffect(() => {
    if (selectedMember) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedMember])

  return (
    <>
      <section id="team" className="relative py-20 lg:py-28 overflow-hidden text-gray-900 bg-transparent">
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">

          {/* SVG Filter for Realistic Brush Stroke Texture */}
          <svg className="hidden" aria-hidden="true">
            <filter id="brush-texture" x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence type="fractalNoise" baseFrequency="0.01 0.3" numOctaves="3" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="12" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </svg>

          {/* Header */}
          <div className="flex flex-col items-center text-center mb-12 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative inline-flex items-center justify-center mt-6"
            >
              <h2 className="relative z-10 text-4xl md:text-5xl lg:text-6xl font-bold font-[var(--font-space)] tracking-tight text-center px-4 whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-indigo-800 via-purple-500 to-indigo-800 animate-text-gradient drop-shadow-xl">
                Meet Our Team
              </h2>
            </motion.div>
          </div>

          {/* Grid - No Scroll, All Visible */}
          <div className="flex flex-wrap justify-center gap-x-8 sm:gap-x-12 gap-y-24 pb-8 pt-4">
            {team.map((member, idx) => (
              <motion.div
                key={member._id || idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.5, type: 'spring', stiffness: 100 }}
                onClick={() => setSelectedMember(member)}
                className={`flex flex-col items-center cursor-pointer group ${idx === 2 ? 'w-full sm:w-full' : 'w-[calc(50%-1rem)] sm:w-[calc(50%-1.5rem)]'} ${idx < 3 ? 'md:w-[calc(33.333%-2rem)]' : 'md:w-[calc(25%-2.25rem)]'} relative`}
              >
                {/* Profile Image */}
                <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden mb-2 z-10 border-[6px] border-white group-hover:border-[#085da6] transition-colors duration-300 shadow-[0_15px_35px_rgba(0,0,0,0.1)] relative bg-gray-100 flex-shrink-0">
                  <img
                    src={member.image?.url}
                    alt={member.name}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 rounded-full shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] pointer-events-none transition-all duration-300"></div>
                </div>

                {/* Paint Brush Style Tags */}
                <div className="relative -mt-6 sm:-mt-8 z-20 flex flex-col items-center">

                  {/* Name Tag (Blue/Purple Stroke) */}
                  <div className="relative z-10 px-3 py-1 transform hover:-translate-y-0.5 transition-transform duration-300 flex items-center justify-center group/name">
                    <div
                      className="absolute inset-0 bg-[#635BFF] transition-colors duration-300 group-hover/name:bg-[#5249ea]"
                      style={{ filter: 'url(#brush-texture)', borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px' }}
                    ></div>
                    <h4 className="relative z-10 font-bold text-white font-[var(--font-space)] text-sm sm:text-base md:text-lg text-center tracking-wide leading-tight whitespace-nowrap drop-shadow-sm">
                      {member.name}
                    </h4>
                  </div>

                  {/* Role Tag (Magenta/Pink Stroke) */}
                  <div className="relative -mt-0.5 z-0 px-2.5 py-0.5 transform hover:-translate-y-0.5 transition-transform duration-300 flex items-center justify-center group/role">
                    <div
                      className="absolute inset-0 bg-[#C83681] transition-colors duration-300 group-hover/role:bg-[#b02b6e]"
                      style={{ filter: 'url(#brush-texture)', borderRadius: '15px 225px 15px 255px/255px 15px 225px 15px' }}
                    ></div>
                    <p className="relative z-10 text-white text-[10px] sm:text-xs md:text-sm font-black uppercase tracking-widest text-center whitespace-nowrap drop-shadow-sm">
                      {member.role}
                    </p>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </section>

      {/* Team Member Modal */}
      <AnimatePresence>
        {selectedMember && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMember(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
            />
            <motion.div
              data-lenis-prevent
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-[2rem] z-[201] shadow-2xl flex flex-col md:flex-row overflow-hidden"
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 bg-white/50 backdrop-blur-md md:bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full flex items-center justify-center transition-colors z-10 shadow-sm"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>

              {/* Image Side */}
              <div className="w-full md:w-[45%] flex-shrink-0 aspect-square md:aspect-auto md:h-full min-h-[300px] relative bg-gray-100 flex items-center justify-center p-6 md:p-10">
                <img
                  src={selectedMember.image?.url}
                  alt={selectedMember.name}
                  className="w-full h-full max-h-[60vh] object-contain rounded-2xl shadow-md"
                />
              </div>

              {/* Content Side */}
              <div className="w-full md:w-[55%] p-8 md:p-12 flex flex-col justify-center bg-tropixie-light">
                <span className="inline-block px-4 py-1.5 rounded-full bg-tropixie-primary/10 text-tropixie-primary font-semibold text-xs tracking-widest uppercase mb-4 w-max">
                  {selectedMember.role}
                </span>

                <h3 className="text-3xl md:text-4xl font-bold font-[var(--font-space)] text-[#1a102b] mb-6">
                  {selectedMember.name}
                </h3>

                <p className="text-gray-600 font-[var(--font-outfit)] text-base md:text-lg leading-relaxed mb-8">
                  {selectedMember.bio}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
