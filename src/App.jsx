import { useState } from 'react'
import QuoteForm from './components/QuoteForm'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import Benefits from './components/Benefits'
import Testimonials from './components/Testimonials'
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
    <div 
      className="min-h-screen relative"
      style={{
        backgroundImage: 'url(/pop.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Dark overlay for entire site */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/60 pointer-events-none"></div>
      
      <div className="relative z-10">
      {/* Header */}
      <header className="bg-navy-900 border-b border-white/10 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center py-2 sm:py-3 md:py-4 gap-2">
            <div className="flex items-center bg-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg shadow-md">
              <img 
                src="/popo.png" 
                alt="HODGINS Insurance Group" 
                className="h-12 sm:h-14 md:h-16 lg:h-20 w-auto"
              />
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <a
                href="tel:7722444184"
                className="bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-lg font-semibold transition-colors flex items-center gap-1 sm:gap-2 text-sm sm:text-base touch-manipulation"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="hidden sm:inline">772.244.4184</span>
                <span className="sm:hidden">Call</span>
              </a>
              <button
                onClick={scrollToForm}
                className="hidden md:block bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white px-4 lg:px-6 py-2.5 lg:py-3 rounded-lg font-semibold transition-colors text-sm sm:text-base touch-manipulation"
              >
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

      {/* Benefits Section */}
      <Benefits />

      {/* Testimonials */}
      <Testimonials />

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
