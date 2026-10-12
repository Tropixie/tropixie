import { motion } from 'framer-motion'
import { useState } from 'react'

export default function Footer() {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('privacy');

  return (
    <footer className="bg-transparent pt-16 pb-8 border-t border-gray-200/80 text-gray-600 font-[var(--font-outfit)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="grid grid-cols-2 lg:grid-cols-12 gap-x-6 gap-y-10 lg:gap-8 mb-12">

          {/* Col 1 */}
          <div className="col-span-2 lg:col-span-4 flex flex-col items-center justify-center w-full">
            <img src="/logo.png" alt="Tropixie" className="w-80 max-w-full sm:w-88 md:w-80 lg:w-80 h-auto object-contain mb-6 lg:mb-10" />

            {/* Social Icons */}
            <div className="flex items-center justify-center gap-4 w-full">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-600 flex items-center justify-center hover:bg-tropixie-primary hover:text-gray-900 hover:border-transparent transition-all shadow-sm">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-600 flex items-center justify-center hover:bg-tropixie-primary hover:text-gray-900 hover:border-transparent transition-all shadow-sm">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-600 flex items-center justify-center hover:bg-tropixie-primary hover:text-gray-900 hover:border-transparent transition-all shadow-sm">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.015 3.015 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="col-span-1 lg:col-span-2 flex flex-col items-start text-left">
            <h4 className="text-gray-900 font-bold font-[var(--font-space)] text-lg md:text-xl mb-6 tracking-wide">Quick Links</h4>
            <ul className="space-y-3 text-base md:text-lg font-medium">
              <li><a href="#hero" className="hover:text-tropixie-primary transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-tropixie-primary transition-colors">About Us</a></li>
              <li><a href="#portfolio" className="hover:text-tropixie-primary transition-colors">Portfolio</a></li>
              <li><a href="#services" className="hover:text-tropixie-primary transition-colors">Services</a></li>
              <li><a href="#team" className="hover:text-tropixie-primary transition-colors">Our Team</a></li>
              <li><a href="#contact" className="hover:text-tropixie-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Col 3: Contact Info */}
          <div className="col-span-1 lg:col-span-3 flex flex-col items-start text-left">
            <h4 className="text-gray-900 font-bold font-[var(--font-space)] text-lg md:text-xl mb-6 tracking-wide">Contact Us</h4>
            <div className="space-y-1 text-sm md:text-base font-medium text-gray-600">
              <p>Our office- Swajan,</p>
              <p>Michael MadhusudanNagar,</p>
              <p>Midnapur Town,</p>
              <p>Dist. PaschimMidnapore</p>
              <p>(West Bengal) Pin-721101</p>
              <p className="pt-2 text-gray-800">Mob: <a href="tel:+918436601135" className="hover:text-tropixie-primary transition-colors">8436601135</a></p>
              <p className="text-gray-800">Email: <a href="mailto:hello.tropixie@gmail.com" className="hover:text-tropixie-primary transition-colors">hello.tropixie@gmail.com</a></p>
            </div>
          </div>

          {/* Col 4: Map */}
          <div className="col-span-2 lg:col-span-3 flex flex-col items-center lg:items-start w-full">
            <h4 className="text-gray-900 font-bold font-[var(--font-space)] text-lg md:text-xl mb-6 tracking-wide">Find Us Here</h4>
            <div
              className="w-full h-[200px] rounded-xl overflow-hidden relative shadow-lg border border-gray-900/10 bg-tropixie-dark-card group cursor-pointer"
              onClick={() => window.open("https://www.google.com/maps/place/Tropixie+Animation+Sutdio/@22.4333449,87.3158112,17z/data=!3m1!4b1!4m6!3m5!1s0x3a1d5b0071966335:0x5b0e0f6481845aef!8m2!3d22.4333449!4d87.3183861!16s%2Fg%2F11zgcv_rz6", "_blank")}
            >
              <iframe
                src="https://maps.google.com/maps?q=22.4333449,87.3183861&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <div className="absolute inset-0 bg-tropixie-dark/0 group-hover:bg-tropixie-dark/40 transition-colors duration-300 flex items-center justify-center pointer-events-none">
                <div className="bg-white px-4 py-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-2 text-xs font-bold text-gray-800">
                  <span>Open in Maps</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-medium">
          <p>&copy; 2026 Tropixie Animation Studio. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <button onClick={(e) => { e.preventDefault(); setModalType('privacy'); setShowModal(true); }} className="hover:text-tropixie-primary transition-colors cursor-pointer">Privacy Policy</button>
            <span>|</span>
            <button onClick={(e) => { e.preventDefault(); setModalType('terms'); setShowModal(true); }} className="hover:text-tropixie-primary transition-colors cursor-pointer">Terms & Conditions</button>
          </div>
        </div>

      </div>

      {/* Modal for Privacy / Terms */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6 lg:p-8 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 cursor-pointer"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h3 className="text-2xl font-bold font-[var(--font-space)] text-gray-900 mb-4">
              {modalType === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
            </h3>
            <div className="text-gray-600 space-y-4 font-[var(--font-outfit)]">
              {modalType === 'privacy' ? (
                <>
                  <p>At Tropixie Animation Studio, we are committed to protecting your privacy. This policy outlines how we handle your personal information.</p>
                  <p>1. <strong>Information Collection:</strong> We collect information you provide directly to us when you request our services or contact us.</p>
                  <p>2. <strong>Use of Information:</strong> Your information is used to communicate with you, fulfill your requests, and improve our services.</p>
                  <p>3. <strong>Data Security:</strong> We implement appropriate security measures to protect your personal information against unauthorized access or disclosure.</p>
                  <p>If you have any questions about our privacy practices, please contact us.</p>
                </>
              ) : (
                <>
                  <p>Welcome to Tropixie Animation Studio. By using our website and services, you agree to comply with the following terms and conditions.</p>
                  <p>1. <strong>Services:</strong> We provide animation and design services as described on our website. All service timelines and deliverables will be agreed upon in writing.</p>
                  <p>2. <strong>Intellectual Property:</strong> All content, designs, and animations created by us remain our intellectual property until full payment is received, at which point rights are transferred as agreed.</p>
                  <p>3. <strong>Limitation of Liability:</strong> We shall not be liable for any indirect, incidental, or consequential damages arising out of the use of our services.</p>
                  <p>These terms are governed by applicable laws. For detailed terms regarding a specific project, please refer to your project agreement.</p>
                </>
              )}
            </div>
            <div className="mt-8 flex justify-between items-center">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-semibold cursor-pointer"
              >
                Close
              </button>
              {/* Admin Link */}
              <a href="/admin/login" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-colors cursor-pointer" title="Admin Login">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}
    </footer>
  )
}
