import { useState, useEffect } from 'react'

export default function TrustSignals() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Major insurance carriers (logos as text for now - can be replaced with actual logos)
  const carriers = [
    { name: 'State Farm', rating: '4.8' },
    { name: 'Allstate', rating: '4.7' },
    { name: 'Progressive', rating: '4.6' },
    { name: 'GEICO', rating: '4.7' },
    { name: 'USAA', rating: '4.9' },
    { name: 'Travelers', rating: '4.6' },
    { name: 'Nationwide', rating: '4.5' },
    { name: 'Farmers', rating: '4.6' }
  ]

  return (
    <section className="py-8 sm:py-12 lg:py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Trust Signals Card */}
        <div className={`bg-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 md:p-10 border border-white/20 shadow-2xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Top Section - Ratings & Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10">
            {/* Overall Rating */}
            <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 backdrop-blur-sm rounded-2xl p-4 sm:p-5 border border-orange-500/30 text-center">
              <div className="flex justify-center items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white mb-1">4.9</div>
              <div className="text-xs sm:text-sm text-gray-300">Overall Rating</div>
              <div className="text-xs text-gray-400 mt-1">2,847+ Reviews</div>
            </div>

            {/* Customers Served */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-5 border border-white/10 text-center">
              <div className="text-2xl sm:text-3xl font-black text-orange-500 mb-1">10,000+</div>
              <div className="text-xs sm:text-sm text-gray-300">Customers Served</div>
            </div>

            {/* Total Savings */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-5 border border-white/10 text-center">
              <div className="text-2xl sm:text-3xl font-black text-green-400 mb-1">$4.5M+</div>
              <div className="text-xs sm:text-sm text-gray-300">Total Savings</div>
            </div>

            {/* Satisfaction Rate */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-5 border border-white/10 text-center">
              <div className="text-2xl sm:text-3xl font-black text-blue-400 mb-1">98%</div>
              <div className="text-xs sm:text-sm text-gray-300">Satisfaction</div>
            </div>
          </div>

          {/* Carrier Logos Section */}
          <div className="mb-8 sm:mb-10">
            <h3 className="text-center text-white text-lg sm:text-xl font-bold mb-4 sm:mb-6">
              Compare Quotes from Top Florida Carriers
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
              {carriers.map((carrier, index) => (
                <div 
                  key={index}
                  className="bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/10 hover:border-orange-500/30 transition-all duration-300 hover:scale-105 text-center group"
                >
                  <div className="text-xs sm:text-sm font-bold text-white mb-1 group-hover:text-orange-400 transition-colors">
                    {carrier.name}
                  </div>
                  <div className="flex items-center justify-center gap-0.5 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <div className="text-xs text-gray-400">{carrier.rating}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Security & Trust Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {/* Licensed & Insured */}
            <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-green-500/30 flex items-center gap-3 sm:gap-4">
              <div className="bg-green-500/20 p-2 sm:p-3 rounded-lg flex-shrink-0">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <div className="text-white font-bold text-sm sm:text-base mb-1">Licensed in Florida</div>
                <div className="text-gray-300 text-xs">State Licensed Agency</div>
              </div>
            </div>

            {/* SSL Secure */}
            <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-blue-500/30 flex items-center gap-3 sm:gap-4">
              <div className="bg-blue-500/20 p-2 sm:p-3 rounded-lg flex-shrink-0">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <div className="text-white font-bold text-sm sm:text-base mb-1">SSL Secured</div>
                <div className="text-gray-300 text-xs">256-bit Encryption</div>
              </div>
            </div>

            {/* Privacy Protected */}
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-purple-500/30 flex items-center gap-3 sm:gap-4">
              <div className="bg-purple-500/20 p-2 sm:p-3 rounded-lg flex-shrink-0">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <div className="text-white font-bold text-sm sm:text-base mb-1">Privacy Protected</div>
                <div className="text-gray-300 text-xs">GDPR Compliant</div>
              </div>
            </div>
          </div>

          {/* Additional Trust Text */}
          <div className="mt-6 sm:mt-8 text-center">
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
              <span className="font-semibold text-white">100% Free</span> • No Credit Check Required • 
              <span className="font-semibold text-white"> No Spam</span> • Compare Multiple Carriers • 
              <span className="font-semibold text-white"> Licensed Agents</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

