import { useState, useEffect } from 'react'
import QuoteForm from './QuoteForm'
import FloridaMap from './FloridaMap'

export default function Hero({ onGetQuote }) {
  const [selectedLocation, setSelectedLocation] = useState(null)

  const handleLocationSelect = (city) => {
    setSelectedLocation(city)
    // Scroll to form smoothly
    const formElement = document.getElementById('quote-form')
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }

  // Initialize QuoteRush Widget
  useEffect(() => {
    if (window.YourWidget) {
      window.YourWidget.init({
        containerId: 'your-widget',
        WidgetId: 'satHSYkzi8aS0c5Dyr8bgqO9euniDpofvOjRBfWf7w1ah1m3Js1agkdQKFHtJm4V-LnQ8GlPksOl2m8yW4Uy_QtASfhVxIfeMCRHx6CFzQFOfe1J83oyjYoq7jKuZRlLeEJXxrRhsvRfE48DFCz7lyVYzoFylkTh2Vq54JX8_LpN3gOyfUYBKmXfmJgpZDW8dOUF373vrTZR9QcA27iaog',
        Agency: '4c1f9c26-d6a7-11f0-9b65-00224853ff9b'
      });
    }
  }, [])

  return (
    <section className="text-white py-6 lg:py-16">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 w-full">
        {/* Two Column Layout: Form Left, Map Right - Stacks on Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left Column - Headline and Form */}
          <div className="flex flex-col justify-center order-2 lg:order-1">
            {/* Main Headline */}
            <div className="mb-6 lg:mb-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-lg text-orange-500">
                Find Your Perfect Home Insurance – Fast & Free!
              </h1>
            </div>

            {/* QuoteRush Widget */}
            <div id="your-widget" className="mb-6 lg:mb-8"></div>

            {/* Full Quote Form */}
            <QuoteForm minimal={false} defaultZipCode={selectedLocation?.zipCode} />
          </div>

          {/* Right Column - Map */}
          <div className="flex flex-col h-full order-1 lg:order-2">
            <FloridaMap onLocationSelect={handleLocationSelect} />
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-col items-center gap-4 mt-12">
          {/* Google Reviews */}
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-5 py-2 rounded-full">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <div className="flex text-yellow-400">
                {'★★★★★'.split('').map((star, i) => <span key={i}>{star}</span>)}
              </div>
              <span className="font-semibold">2,000+ Reviews</span>
            </div>
            <span className="text-gray-300">|</span>
            <span className="font-semibold">#1 Rated in Florida</span>
          </div>

          {/* Carrier Logos */}
          <div className="flex flex-wrap items-center justify-center gap-4 opacity-80">
            <div className="text-white text-xs font-semibold bg-white/10 px-4 py-2 rounded-lg">
              TRAVELERS
            </div>
            <div className="text-white text-xs font-semibold bg-white/10 px-4 py-2 rounded-lg">
              AMERICAN INTEGRITY
            </div>
            <div className="text-white text-xs font-semibold bg-white/10 px-4 py-2 rounded-lg">
              EDISON
            </div>
            <div className="text-white text-xs font-semibold bg-white/10 px-4 py-2 rounded-lg">
              CITIZENS
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

