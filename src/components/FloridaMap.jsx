import { useState, useEffect, useRef } from 'react'

export default function FloridaMap({ onLocationSelect }) {
  const [address, setAddress] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [selectedAddress, setSelectedAddress] = useState(null)
  const inputRef = useRef(null)

  // Florida cities with zip codes for autocomplete
  const floridaLocations = [
    // Major cities with multiple zip codes
    { address: '206 SE Courances Dr, Port St. Lucie, FL', city: 'Port St. Lucie', zipCode: '34952', state: 'FL' },
    { address: 'Downtown Miami, Miami, FL', city: 'Miami', zipCode: '33101', state: 'FL' },
    { address: 'South Beach, Miami Beach, FL', city: 'Miami Beach', zipCode: '33139', state: 'FL' },
    { address: 'Coral Gables, FL', city: 'Coral Gables', zipCode: '33134', state: 'FL' },
    { address: 'Kendall, Miami, FL', city: 'Kendall', zipCode: '33156', state: 'FL' },
    { address: 'Downtown Tampa, Tampa, FL', city: 'Tampa', zipCode: '33602', state: 'FL' },
    { address: 'Hyde Park, Tampa, FL', city: 'Tampa', zipCode: '33606', state: 'FL' },
    { address: 'Ybor City, Tampa, FL', city: 'Tampa', zipCode: '33605', state: 'FL' },
    { address: 'Downtown Orlando, Orlando, FL', city: 'Orlando', zipCode: '32801', state: 'FL' },
    { address: 'Winter Park, FL', city: 'Winter Park', zipCode: '32789', state: 'FL' },
    { address: 'Lake Nona, Orlando, FL', city: 'Orlando', zipCode: '32827', state: 'FL' },
    { address: 'Downtown Jacksonville, Jacksonville, FL', city: 'Jacksonville', zipCode: '32099', state: 'FL' },
    { address: 'Jacksonville Beach, FL', city: 'Jacksonville Beach', zipCode: '32250', state: 'FL' },
    { address: 'Ponte Vedra Beach, FL', city: 'Ponte Vedra Beach', zipCode: '32082', state: 'FL' },
    { address: 'Downtown St. Petersburg, St. Petersburg, FL', city: 'St. Petersburg', zipCode: '33701', state: 'FL' },
    { address: 'Downtown Fort Lauderdale, Fort Lauderdale, FL', city: 'Fort Lauderdale', zipCode: '33301', state: 'FL' },
    { address: 'Las Olas, Fort Lauderdale, FL', city: 'Fort Lauderdale', zipCode: '33316', state: 'FL' },
    { address: 'Hollywood Beach, Hollywood, FL', city: 'Hollywood', zipCode: '33019', state: 'FL' },
    { address: 'Pembroke Pines, FL', city: 'Pembroke Pines', zipCode: '33028', state: 'FL' },
    { address: 'Hialeah, FL', city: 'Hialeah', zipCode: '33010', state: 'FL' },
    { address: 'West Palm Beach, FL', city: 'West Palm Beach', zipCode: '33401', state: 'FL' },
    { address: 'Boca Raton, FL', city: 'Boca Raton', zipCode: '33432', state: 'FL' },
    { address: 'Delray Beach, FL', city: 'Delray Beach', zipCode: '33444', state: 'FL' },
    { address: 'Boynton Beach, FL', city: 'Boynton Beach', zipCode: '33435', state: 'FL' },
    { address: 'Clearwater Beach, Clearwater, FL', city: 'Clearwater', zipCode: '33755', state: 'FL' },
    { address: 'Dunedin, FL', city: 'Dunedin', zipCode: '34698', state: 'FL' },
    { address: 'Sarasota, FL', city: 'Sarasota', zipCode: '34236', state: 'FL' },
    { address: 'Siesta Key, Sarasota, FL', city: 'Sarasota', zipCode: '34242', state: 'FL' },
    { address: 'Fort Myers Beach, Fort Myers, FL', city: 'Fort Myers', zipCode: '33931', state: 'FL' },
    { address: 'Cape Coral, FL', city: 'Cape Coral', zipCode: '33904', state: 'FL' },
    { address: 'Naples, FL', city: 'Naples', zipCode: '34102', state: 'FL' },
    { address: 'Bonita Springs, FL', city: 'Bonita Springs', zipCode: '34134', state: 'FL' },
    { address: 'Tallahassee, FL', city: 'Tallahassee', zipCode: '32301', state: 'FL' },
    { address: 'Gainesville, FL', city: 'Gainesville', zipCode: '32601', state: 'FL' },
    { address: 'Ocala, FL', city: 'Ocala', zipCode: '34470', state: 'FL' },
    { address: 'Daytona Beach, FL', city: 'Daytona Beach', zipCode: '32114', state: 'FL' },
    { address: 'New Smyrna Beach, FL', city: 'New Smyrna Beach', zipCode: '32169', state: 'FL' },
    { address: 'Kissimmee, FL', city: 'Kissimmee', zipCode: '34741', state: 'FL' },
    { address: 'Celebration, FL', city: 'Celebration', zipCode: '34747', state: 'FL' },
    { address: 'The Villages, FL', city: 'The Villages', zipCode: '32162', state: 'FL' },
    { address: 'Palm Coast, FL', city: 'Palm Coast', zipCode: '32137', state: 'FL' },
  ]

  // Handle address input change
  const handleAddressChange = (e) => {
    const value = e.target.value
    setAddress(value)

    // Show suggestions when user types at least 2 characters
    if (value.length >= 2) {
      const filtered = floridaLocations.filter(location =>
        location.address.toLowerCase().includes(value.toLowerCase()) ||
        location.city.toLowerCase().includes(value.toLowerCase()) ||
        location.zipCode.includes(value)
      ).slice(0, 5) // Limit to 5 suggestions
      
      setSuggestions(filtered)
      
      // If user typed a 5-digit zip code that matches exactly, auto-select it
      if (value.length === 5 && /^\d{5}$/.test(value)) {
        const exactMatch = floridaLocations.find(loc => loc.zipCode === value)
        if (exactMatch) {
          setTimeout(() => {
            handleSuggestionClick(exactMatch)
          }, 100)
        }
      }
    } else {
      setSuggestions([])
    }
  }

  // Handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      // If there's exactly one suggestion, select it
      if (suggestions.length === 1) {
        handleSuggestionClick(suggestions[0])
      } else if (selectedAddress) {
        // If address is already selected, submit the form
        handleSubmit(e)
      }
    }
  }

  // Handle suggestion click
  const handleSuggestionClick = (location) => {
    console.log('Location selected:', location)
    setAddress(location.address)
    setSelectedAddress(location)
    setSuggestions([])
    
    // Immediately pass location to parent to update form
    if (onLocationSelect) {
      const locationData = {
        name: location.city,
        zipCode: location.zipCode,
        address: location.address
      }
      onLocationSelect(locationData)
      console.log('Called onLocationSelect with:', locationData)
    }
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted with selected address:', selectedAddress)
    
    if (selectedAddress) {
      // Pass location to parent
      if (onLocationSelect) {
        onLocationSelect({
          name: selectedAddress.city,
          zipCode: selectedAddress.zipCode,
          address: selectedAddress.address
        })
      }
      
      // Scroll to form
      const formElement = document.getElementById('quote-form')
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
        
        // Focus on the form after scrolling
        setTimeout(() => {
          const firstInput = formElement.querySelector('input, select')
          if (firstInput) {
            firstInput.focus()
          }
        }, 500)
      }
    } else {
      alert('Please select an address from the suggestions')
    }
  }

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setSuggestions([])
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative w-full mx-auto lg:sticky lg:top-24">
      <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 shadow-2xl border border-white/20 hover:shadow-orange-500/10 transition-all duration-300">
        
        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-2 sm:p-3 rounded-lg sm:rounded-xl shadow-lg flex-shrink-0">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                Florida Coverage Map
              </h3>
              <p className="text-xs sm:text-sm text-gray-300">
                Real-time rates by region
              </p>
            </div>
          </div>
        </div>

        {/* Address Search Form */}
        <form onSubmit={handleSubmit} className="relative" ref={inputRef}>
          <div className="relative">
            {/* House Icon */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>

            {/* Input Field */}
            <input
              type="text"
              value={address}
              onChange={handleAddressChange}
              onKeyDown={handleKeyDown}
              placeholder="Type city, zip, or address... (e.g., Miami, 33101)"
              className="w-full pl-12 sm:pl-14 pr-28 sm:pr-32 py-5 text-base sm:text-lg text-gray-900 bg-white/95 backdrop-blur-sm border-2 border-gray-300 hover:border-gray-400 focus:border-orange-500 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all shadow-lg hover:shadow-xl touch-manipulation font-medium"
              autoComplete="off"
            />

            {/* Get Quote Button */}
            <button
              type="submit"
              disabled={!selectedAddress}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 active:scale-95 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:opacity-60 text-white px-4 sm:px-6 py-3 rounded-xl font-bold text-sm sm:text-base transition-all shadow-lg hover:shadow-xl flex items-center gap-2 touch-manipulation min-h-[44px] whitespace-nowrap"
              title={!selectedAddress ? 'Please select an address first' : 'Fill quote form with this location'}
            >
              <span className="hidden sm:inline">{selectedAddress ? '✓ ' : ''}Get Quote</span>
              <span className="sm:hidden">{selectedAddress ? '✓' : 'Quote'}</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Autocomplete Suggestions Dropdown */}
          {suggestions.length > 0 && (
            <div className="absolute z-50 w-full mt-2 bg-white border-2 border-orange-500/50 rounded-2xl shadow-2xl overflow-hidden animate-fadeIn">
              <div className="text-xs text-gray-600 px-4 py-3 bg-gradient-to-r from-orange-50 to-orange-100 border-b-2 border-orange-200 flex items-center gap-2">
                <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold">Select Your Location</span>
              </div>
              {suggestions.map((location, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSuggestionClick(location)}
                  className="w-full px-4 sm:px-5 py-4 text-left hover:bg-orange-50 active:bg-orange-100 transition-all border-b border-gray-200 last:border-b-0 touch-manipulation group hover:shadow-inner"
                >
                  <div className="flex items-start gap-3">
                    <div className="bg-orange-100 group-hover:bg-orange-200 p-2 rounded-lg transition-colors flex-shrink-0">
                      <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-900 group-hover:text-orange-600 text-base transition-colors truncate">
                        {location.address}
                      </p>
                      <p className="text-sm text-gray-600 group-hover:text-gray-800 mt-1 flex items-center gap-2">
                        <span className="font-semibold">{location.city}, {location.state}</span>
                        <span className="bg-gray-200 group-hover:bg-orange-200 px-2 py-0.5 rounded text-xs font-mono">{location.zipCode}</span>
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </form>

        {/* Trust Badges */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 text-xs sm:text-sm">
          <div className="flex items-center gap-1.5 sm:gap-2 text-green-400">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-semibold">Licensed</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 text-green-400">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <span className="font-semibold">Secure</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 text-green-400">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="font-semibold">Highest Rated</span>
          </div>
        </div>

        {/* Selected Address Display */}
        {selectedAddress && (
          <div className="mt-6 p-4 bg-green-500/20 border-2 border-green-500/50 rounded-xl animate-fadeIn backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <div className="bg-green-500/20 p-2 rounded-lg flex-shrink-0">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-bold text-green-400 text-sm sm:text-base">✓ Location Selected</p>
                <p className="text-green-300 text-xs sm:text-sm mt-1">{selectedAddress.address}</p>
                <p className="text-green-400 font-semibold text-xs mt-1">Zip: {selectedAddress.zipCode}</p>
              </div>
            </div>
          </div>
        )}

        {/* Market Rate Comparison */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 text-center border border-white/20">
            <p className="text-gray-300 text-xs sm:text-sm mb-1 sm:mb-2 font-semibold">Florida Average</p>
            <p className="text-2xl sm:text-3xl font-black text-white">
              $6,147
            </p>
            <p className="text-xs text-gray-400">/year</p>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-4 sm:p-5 text-center border border-orange-400 shadow-xl">
            <p className="text-white text-xs sm:text-sm mb-1 sm:mb-2 font-semibold">Your Quote</p>
            <p className="text-2xl sm:text-3xl font-black text-white">
              $2,847
            </p>
            <p className="text-xs text-orange-100">/year</p>
            <div className="mt-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 inline-block">
              <p className="text-white text-xs sm:text-sm font-bold">💰 Save $3,300/year</p>
            </div>
          </div>
        </div>

        {/* Florida Map Visualization */}
        <div className="mt-6 relative">
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-2 sm:p-4 border border-white/20 relative overflow-hidden shadow-2xl">
            {/* Map Background */}
            <div className="relative w-full h-[500px] sm:h-[600px] lg:h-[700px]">
              {/* Embedded Google Map */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3595568.1447081566!2d-84.64164645!3d28.4158826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88c1766591562abf%3A0xf72e13d35bc74ed0!2sFlorida!5e0!3m2!1sen!2sus!4v1650000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: '8px', filter: 'brightness(0.7) saturate(1.2)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Florida Map"
                className="rounded-lg"
              ></iframe>

              {/* Pricing Overlays on Map */}
              <div className="absolute inset-0 pointer-events-none">
                {/* North Florida - Tallahassee Area */}
                <div className="absolute left-[15%] top-[15%] bg-gradient-to-br from-orange-500 to-orange-600 backdrop-blur-md rounded-xl p-2 sm:p-3 border-2 border-white/30 shadow-2xl">
                  <div className="text-white/70 text-xs sm:text-sm font-medium line-through">$312/mo</div>
                  <div className="text-white font-black text-base sm:text-lg">$187/mo</div>
                  <div className="bg-white/20 rounded-full px-2 py-0.5 inline-block mt-1">
                    <div className="text-white text-[10px] sm:text-xs font-bold">40% OFF</div>
                  </div>
                </div>

                {/* Northeast - Jacksonville Area */}
                <div className="absolute right-[18%] top-[20%] bg-gradient-to-br from-orange-500 to-orange-600 backdrop-blur-md rounded-xl p-2 sm:p-3 border-2 border-white/30 shadow-2xl">
                  <div className="text-white/70 text-xs sm:text-sm font-medium line-through">$378/mo</div>
                  <div className="text-white font-black text-base sm:text-lg">$219/mo</div>
                  <div className="bg-white/20 rounded-full px-2 py-0.5 inline-block mt-1">
                    <div className="text-white text-[10px] sm:text-xs font-bold">42% OFF</div>
                  </div>
                </div>

                {/* Central Florida - Orlando Area */}
                <div className="absolute left-[45%] top-[42%] bg-gradient-to-br from-orange-500 to-orange-600 backdrop-blur-md rounded-xl p-2 sm:p-3 border-2 border-white/30 shadow-2xl">
                  <div className="text-white/70 text-xs sm:text-sm font-medium line-through">$421/mo</div>
                  <div className="text-white font-black text-base sm:text-lg">$247/mo</div>
                  <div className="bg-white/20 rounded-full px-2 py-0.5 inline-block mt-1">
                    <div className="text-white text-[10px] sm:text-xs font-bold">41% OFF</div>
                  </div>
                </div>

                {/* West Coast - Tampa Area */}
                <div className="absolute left-[22%] top-[48%] bg-gradient-to-br from-orange-500 to-orange-600 backdrop-blur-md rounded-xl p-2 sm:p-3 border-2 border-white/30 shadow-2xl">
                  <div className="text-white/70 text-xs sm:text-sm font-medium line-through">$467/mo</div>
                  <div className="text-white font-black text-base sm:text-lg">$268/mo</div>
                  <div className="bg-white/20 rounded-full px-2 py-0.5 inline-block mt-1">
                    <div className="text-white text-[10px] sm:text-xs font-bold">43% OFF</div>
                  </div>
                </div>

                {/* Southeast - Miami Area */}
                <div className="absolute right-[12%] bottom-[12%] bg-gradient-to-br from-orange-500 to-orange-600 backdrop-blur-md rounded-xl p-2 sm:p-3 border-2 border-white/30 shadow-2xl">
                  <div className="text-white/70 text-xs sm:text-sm font-medium line-through">$682/mo</div>
                  <div className="text-white font-black text-base sm:text-lg">$391/mo</div>
                  <div className="bg-white/20 rounded-full px-2 py-0.5 inline-block mt-1">
                    <div className="text-white text-[10px] sm:text-xs font-bold">43% OFF</div>
                  </div>
                </div>

                {/* Southwest - Naples Area */}
                <div className="absolute left-[28%] bottom-[18%] bg-gradient-to-br from-orange-500 to-orange-600 backdrop-blur-md rounded-xl p-2 sm:p-3 border-2 border-white/30 shadow-2xl">
                  <div className="text-white/70 text-xs sm:text-sm font-medium line-through">$548/mo</div>
                  <div className="text-white font-black text-base sm:text-lg">$314/mo</div>
                  <div className="bg-white/20 rounded-full px-2 py-0.5 inline-block mt-1">
                    <div className="text-white text-[10px] sm:text-xs font-bold">43% OFF</div>
                  </div>
                </div>
              </div>

              {/* "FLORIDA" Text Overlay */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <div className="text-white/20 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-widest">
                  FLORIDA
                </div>
              </div>
            </div>

            {/* Powered By Google */}
            <div className="absolute bottom-3 sm:bottom-6 right-3 sm:right-6 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] sm:text-xs text-gray-600 flex items-center gap-1">
              <span className="hidden sm:inline">powered by</span>
              <svg className="w-10 h-3 sm:w-12 sm:h-4" viewBox="0 0 272 92" fill="none">
                <text x="0" y="70" fontFamily="Arial" fontSize="60" fill="#333333" fontWeight="bold">G</text>
                <text x="45" y="70" fontFamily="Arial" fontSize="60" fill="#1a1a1a" fontWeight="bold">o</text>
                <text x="90" y="70" fontFamily="Arial" fontSize="60" fill="#4d4d4d" fontWeight="bold">o</text>
                <text x="135" y="70" fontFamily="Arial" fontSize="60" fill="#333333" fontWeight="bold">g</text>
                <text x="178" y="70" fontFamily="Arial" fontSize="60" fill="#1a1a1a" fontWeight="bold">l</text>
                <text x="205" y="70" fontFamily="Arial" fontSize="60" fill="#262626" fontWeight="bold">e</text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
