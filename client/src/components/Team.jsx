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

  // Split team into row 1 (first 3 members) and row 2 (remaining 4 members)
  const firstRow = team.slice(0, 3)
  const secondRow = team.slice(3)

  const renderMemberCard = (member, idx, isThirdMemberInRow1 = false) => (
    <motion.div
      key={member._id || idx}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.04, duration: 0.35 }}
      onClick={() => setSelectedMember(member)}
      className={`group cursor-pointer flex flex-col items-center text-center relative ${
        isThirdMemberInRow1 ? 'col-span-2 md:col-span-1 w-full flex items-center justify-center' : ''
      }`}
    >
      <div className="flex flex-col items-center">
        {/* Profile Image */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden mb-2 z-10 border-[3px] sm:border-4 border-white group-hover:border-[#635BFF] transition-all duration-300 shadow-md group-hover:shadow-lg relative bg-slate-100 flex-shrink-0 group-hover:scale-105">
          {member.image?.url ? (
            <img
              src={member.image.url}
              alt={member.name}
              className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500 ease-out"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center font-bold text-slate-400 bg-slate-100 text-xl sm:text-2xl">
              {member.name?.charAt(0) || '👤'}
            </div>
          )}
          <div className="absolute inset-0 rounded-full shadow-[inset_0_0_10px_rgba(0,0,0,0.08)] pointer-events-none transition-all duration-300"></div>
        </div>

        {/* Paint Brush Style Tags */}
        <div className="relative -mt-4 sm:-mt-5 z-20 flex flex-col items-center">
          {/* Name Tag (Blue/Purple Brush Stroke) */}
          <div className="relative z-10 px-3 py-1 sm:px-4 sm:py-1.5 transform hover:-translate-y-0.5 transition-transform duration-300 flex items-center justify-center group/name">
            <div
              className="absolute inset-0 bg-[#635BFF] transition-colors duration-300 group-hover/name:bg-[#5249ea] shadow-sm"
              style={{
                filter: 'url(#team-brush-texture)',
                borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px',
              }}
            ></div>
            <h4 className="relative z-10 font-bold text-white font-[var(--font-space)] text-[11px] sm:text-xs md:text-sm text-center tracking-wide leading-tight whitespace-nowrap drop-shadow-sm px-1.5">
              {member.name}
            </h4>
          </div>

          {/* Role Tag (Magenta/Pink Brush Stroke) */}
          <div className="relative -mt-0.5 z-0 px-2.5 py-0.5 sm:px-3 sm:py-1 transform hover:-translate-y-0.5 transition-transform duration-300 flex items-center justify-center group/role">
            <div
              className="absolute inset-0 bg-[#C83681] transition-colors duration-300 group-hover/role:bg-[#b02b6e] shadow-sm"
              style={{
                filter: 'url(#team-brush-texture)',
                borderRadius: '15px 225px 15px 255px/255px 15px 225px 15px',
              }}
            ></div>
            <p className="relative z-10 text-white text-[9px] sm:text-[10px] md:text-[11px] font-black uppercase tracking-wider text-center whitespace-nowrap drop-shadow-sm px-1.5">
              {member.role}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )

  return (
    <>
      <section id="team" className="relative py-12 lg:py-20 overflow-hidden text-slate-800 bg-transparent">
        {/* SVG Filter with Fine Distortion Scale for Clean Paint Brush Texture */}
        <svg className="hidden" aria-hidden="true">
          <filter id="team-brush-texture" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.02 0.3" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </svg>

        <div className="relative z-10 max-w-5xl xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="flex flex-col items-center text-center mb-8 lg:mb-12 relative">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="relative inline-flex items-center justify-center mt-2 sm:mt-4"
            >
              <h2 className="relative z-10 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-[var(--font-space)] tracking-tight text-center px-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-800 via-purple-500 to-indigo-800 animate-text-gradient drop-shadow-xl">
                Meet Our Team
              </h2>
            </motion.div>
          </div>

          {/* Row 1: First 3 Team Members (Co-Founders) */}
          {/* On Mobile: 2 columns with the 3rd centered; On Desktop: 3 columns in 1 row */}
          {firstRow.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 max-w-2xl md:max-w-3xl mx-auto gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-6 sm:gap-y-8 md:gap-y-10 mb-6 sm:mb-8 md:mb-10">
              {firstRow.map((member, idx) => renderMemberCard(member, idx, idx === 2))}
            </div>
          )}

          {/* Row 2: Next 4 Team Members */}
          {/* On Mobile: 2 columns; On Desktop: 4 columns in 1 row */}
          {secondRow.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 max-w-2xl md:max-w-4xl lg:max-w-5xl mx-auto gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-6 sm:gap-y-8 md:gap-y-10">
              {secondRow.map((member, idx) => renderMemberCard(member, idx + 3, false))}
            </div>
          )}

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
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[200]"
            />
            <motion.div
              data-lenis-prevent
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-2xl max-h-[85vh] overflow-y-auto bg-white rounded-3xl z-[201] shadow-2xl flex flex-col md:flex-row overflow-hidden border border-slate-100"
            >
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 w-9 h-9 bg-slate-100 hover:bg-orange-500 text-slate-600 hover:text-white rounded-full flex items-center justify-center transition-colors z-20 shadow-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Portrait Side */}
              <div className="w-full md:w-[42%] bg-slate-100 flex items-center justify-center p-6 relative">
                {selectedMember.image?.url ? (
                  <img
                    src={selectedMember.image.url}
                    alt={selectedMember.name}
                    className="w-36 h-36 md:w-full md:h-full max-h-[260px] object-cover object-top rounded-2xl shadow-md"
                  />
                ) : (
                  <div className="w-28 h-28 rounded-2xl bg-slate-200 flex items-center justify-center text-3xl text-slate-400">
                    👤
                  </div>
                )}
              </div>

              {/* Details Side */}
              <div className="w-full md:w-[58%] p-6 sm:p-7 flex flex-col justify-center">
                <span className="inline-block px-3 py-1 rounded-full bg-orange-50 text-orange-600 border border-orange-200/60 font-semibold text-xs tracking-wider uppercase mb-2 w-max">
                  {selectedMember.role}
                </span>

                <h3 className="text-xl sm:text-2xl font-bold font-[var(--font-space)] text-slate-900 mb-2">
                  {selectedMember.name}
                </h3>

                <p className="text-slate-600 font-[var(--font-outfit)] text-xs sm:text-sm leading-relaxed">
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
