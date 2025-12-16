export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer id="contact" className="bg-black/50 backdrop-blur-xl text-gray-300 py-12 sm:py-14 md:py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content - Card Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-10 md:mb-12">
          
          {/* Logo & About Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl sm:col-span-2 md:col-span-1">
            <div className="bg-black/80 backdrop-blur-sm px-4 sm:px-5 py-2 sm:py-3 rounded-xl sm:rounded-2xl inline-block mb-5 sm:mb-6 border border-orange-500/30 hover:border-orange-500/50 transition-all">
              <img 
                src="/jpeg.jpg" 
                alt="HODGINS Insurance Group" 
                className="h-14 sm:h-16 md:h-20 w-auto"
              />
            </div>
            <p className="text-sm sm:text-base leading-relaxed mb-5 sm:mb-6 text-gray-200">
              Florida's trusted partner for home insurance. Licensed, reliable, and dedicated to saving you money.
            </p>
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-4 shadow-lg">
              <div className="flex items-center gap-2 text-white font-bold text-base">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Licensed in Florida
              </div>
            </div>
          </div>
          
          {/* Quick Links Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl">
            <div className="flex items-center gap-2 sm:gap-3 mb-5 sm:mb-6">
              <div className="bg-orange-500 p-2 rounded-lg flex-shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-white font-bold text-lg sm:text-xl">Quick Links</h4>
            </div>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
              <li>
                <a href="#how-it-works" className="flex items-center gap-2 hover:text-orange-400 transition-colors group">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full group-hover:scale-150 transition-transform"></span>
                  How It Works
                </a>
              </li>
              <li>
                <a href="#benefits" className="flex items-center gap-2 hover:text-orange-400 transition-colors group">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full group-hover:scale-150 transition-transform"></span>
                  Benefits
                </a>
              </li>
              <li>
                <a href="#testimonials" className="flex items-center gap-2 hover:text-orange-400 transition-colors group">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full group-hover:scale-150 transition-transform"></span>
                  Reviews
                </a>
              </li>
              <li>
                <a href="#faq" className="flex items-center gap-2 hover:text-orange-400 transition-colors group">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full group-hover:scale-150 transition-transform"></span>
                  FAQ
                </a>
              </li>
              <li>
                <a href="/privacy" className="flex items-center gap-2 hover:text-orange-400 transition-colors group">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full group-hover:scale-150 transition-transform"></span>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="flex items-center gap-2 hover:text-orange-400 transition-colors group">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full group-hover:scale-150 transition-transform"></span>
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 sm:gap-3 mb-5 sm:mb-6">
              <div className="bg-orange-500 p-2 rounded-lg flex-shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="text-white font-bold text-lg sm:text-xl">Contact Us</h4>
            </div>
            <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base">
              <li>
                <a href="tel:7722444350" className="flex items-center gap-3 hover:text-orange-400 transition-colors bg-white/5 rounded-xl p-3 hover:bg-white/10">
                  <div className="bg-orange-500/20 p-2 rounded-lg">
                    <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Phone/Text</p>
                    <p className="font-semibold">772.244.4350</p>
                  </div>
                </a>
              </li>
              <li>
                <a href="tel:7722444350" className="flex items-center gap-3 hover:text-orange-400 transition-colors bg-white/5 rounded-xl p-3 hover:bg-white/10">
                  <div className="bg-orange-500/20 p-2 rounded-lg">
                    <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Office</p>
                    <p className="font-semibold">772.244.4350</p>
                  </div>
                </a>
              </li>
              <li>
                <a href="mailto:chris@hodgins.insure" className="flex items-center gap-3 hover:text-orange-400 transition-colors bg-white/5 rounded-xl p-3 hover:bg-white/10">
                  <div className="bg-orange-500/20 p-2 rounded-lg">
                    <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="truncate">
                    <p className="text-xs text-gray-400">Email</p>
                    <p className="font-semibold text-sm">chris@hodgins.insure</p>
                  </div>
                </a>
              </li>
              <li className="bg-white/5 rounded-xl p-3 text-sm">
                <p className="text-gray-400 mb-1"><strong className="text-white">Support:</strong></p>
                <p className="text-gray-300">customerservice@hodgins.insure</p>
                <p className="text-gray-400 text-xs mt-1">772.244.4350 x 102</p>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          {/* Copyright & License */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
              <p className="text-gray-300">&copy; {currentYear} Hodgins.insure. All rights reserved.</p>
              <div className="flex items-center gap-2">
                <div className="bg-orange-500/20 px-4 py-2 rounded-full">
                  <p className="text-orange-400 font-semibold">License #: FL-L123456</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Legal Disclaimer */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-sm leading-relaxed">
            <div className="flex items-start gap-3 mb-4">
              <div className="bg-orange-500 p-2 rounded-lg flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="mb-3 text-gray-200">
                  <strong className="text-white">Important:</strong> By submitting a quote request, you consent to receive communications from Hodgins.insure and partner carriers via phone, email, and text regarding insurance services. Message and data rates may apply. Reply STOP to opt out. No obligation to purchase.
                </p>
                <p className="text-gray-300">
                  Quotes are estimates and subject to underwriting approval. Your information is secure and never sold. See our <a href="/privacy" className="text-orange-400 hover:text-orange-300 underline font-semibold">Privacy Policy</a> for details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

