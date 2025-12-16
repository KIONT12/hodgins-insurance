import { useState } from 'react'
import QuoteForm from './components/QuoteForm'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import Education from './components/Education'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import FloatingCTA from './components/FloatingCTA'

function App() {
  const [showQuoteModal, setShowQuoteModal] = useState(false)

  const scrollToForm = () => {
    const formElement = document.getElementById('quote-form')
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <div className="min-h-screen relative florida-background">
      {/* Subtle overlay for better text readability - optimized to show Florida silhouette clearly */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40 pointer-events-none"></div>
      
      <div className="relative z-10">
      {/* Header - Modern Glassmorphism Design */}
      <header className="bg-black/40 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50 shadow-2xl">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3 sm:py-5 lg:py-6 gap-2 sm:gap-4">
            {/* Logo */}
            <div className="flex items-center">
              <div className="bg-black/95 backdrop-blur-sm px-3 sm:px-5 md:px-6 py-2 sm:py-3 md:py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-orange-500/30">
                <img 
                  src="/jpeg.jpg" 
                  alt="HODGINS Insurance Group" 
                  className="h-14 sm:h-16 md:h-20 lg:h-24 xl:h-28 w-auto max-w-[200px] sm:max-w-none"
                />
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden lg:flex items-center gap-8 text-white font-medium">
              <a href="#home" className="hover:text-orange-400 transition-colors duration-200 scroll-smooth">Home</a>
              <a href="#how-it-works" className="hover:text-orange-400 transition-colors duration-200 scroll-smooth">How It Works</a>
              <a href="#faq" className="hover:text-orange-400 transition-colors duration-200 scroll-smooth">FAQ</a>
              <a href="#contact" className="hover:text-orange-400 transition-colors duration-200 scroll-smooth">Contact</a>
            </nav>
            
            {/* CTA Buttons */}
            <div className="flex items-center gap-1.5 sm:gap-3">
              <a
                href="tel:7722444350"
                className="group relative bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-3 sm:px-5 lg:px-7 py-2 sm:py-3 lg:py-3.5 rounded-full font-semibold transition-all duration-300 flex items-center gap-1.5 sm:gap-2 shadow-lg hover:shadow-xl hover:scale-105 text-xs sm:text-sm lg:text-base whitespace-nowrap"
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="hidden xs:inline sm:hidden md:inline">772.244.4350</span>
                <span className="xs:hidden sm:inline md:hidden">Call</span>
              </a>
              <button
                onClick={scrollToForm}
                className="hidden lg:flex items-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-5 lg:px-7 py-2.5 lg:py-3.5 rounded-full font-semibold transition-all duration-300 border border-white/30 hover:border-white/50 shadow-lg hover:scale-105 text-sm lg:text-base whitespace-nowrap"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Support
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <Hero onGetQuote={scrollToForm} />

      {/* How It Works */}
      <HowItWorks />

      {/* FAQ */}
      <FAQ />

      {/* Footer */}
      <Footer />

      {/* Floating CTA Button (Mobile) */}
      <FloatingCTA onClick={scrollToForm} />
      </div>
    </div>
  )
}

export default App
