import { useState } from 'react'
import AddressSearch from './AddressSearch'
import QuoteFlow from './QuoteFlow'

export default function Hero({ onGetQuote }) {
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [showQuoteFlow, setShowQuoteFlow] = useState(false)

  const handleLocationSelect = (location) => {
    console.log('Hero received location:', location)
    setSelectedLocation(location)
    setShowQuoteFlow(true) // Start the quote flow
    
    // Show feedback to user
    if (location && location.zipCode) {
      console.log(`Zip code ${location.zipCode} selected for ${location.name}`)
    }
  }

  const handleQuoteComplete = (data) => {
    console.log('Quote completed:', data)
    
    // If user wants to reset (go back to address search)
    if (data && data.action === 'reset') {
      setShowQuoteFlow(false)
      setSelectedLocation(null)
      return
    }
    
    // Can trigger analytics or other actions here
  }

  return (
    <section id="home" className="text-white py-8 sm:py-12 md:py-16 lg:py-24 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 w-full">
        {/* Show Quote Flow if address is selected */}
        {showQuoteFlow && selectedLocation ? (
          <QuoteFlow 
            initialAddress={selectedLocation}
            onComplete={handleQuoteComplete}
          />
        ) : (
          <>
            {/* Main Headline - Above Everything */}
            <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black leading-tight mb-4 sm:mb-6 md:mb-8 text-orange-500 px-2">
                Get Instant Home Insurance Quotes
              </h1>
            </div>

            {/* Address Search - Focused and Prominent */}
            <div className="flex justify-center px-2 sm:px-0">
              <AddressSearch onLocationSelect={handleLocationSelect} />
            </div>
          </>
        )}
      </div>
    </section>
  )
}

