import { useState } from 'react'
import AddressSearch from './AddressSearch'

export default function Hero({ onGetQuote }) {
  const [selectedLocation, setSelectedLocation] = useState(null)

  const handleLocationSelect = (location) => {
    console.log('Hero received location:', location)
    setSelectedLocation(location)
    
    // Show feedback to user
    if (location && location.zipCode) {
      console.log(`Zip code ${location.zipCode} selected for ${location.name}`)
    }
  }

  return (
    <section id="home" className="text-white py-12 sm:py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Main Headline - Above Everything */}
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight mb-6 sm:mb-8 text-orange-500 px-2">
            Get Instant Home Insurance Quotes
          </h1>
        </div>

        {/* Address Search - Focused and Prominent */}
        <div className="flex justify-center">
          <AddressSearch onLocationSelect={handleLocationSelect} />
        </div>

      </div>
    </section>
  )
}

