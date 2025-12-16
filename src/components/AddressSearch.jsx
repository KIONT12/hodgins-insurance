import { useState, useEffect, useRef } from 'react'

export default function AddressSearch({ onLocationSelect }) {
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
      
      // Scroll to form if it exists
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
    <div className="w-full max-w-3xl mx-auto px-1 sm:px-0">
      {/* Address Search Form */}
      <form onSubmit={handleSubmit} className="relative" ref={inputRef}>
        <div className="relative">
          {/* House Icon */}
          <div className="absolute left-3 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 text-gray-400 z-10">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>

          {/* Input Field - Responsive sizing */}
          <input
            type="text"
            value={address}
            onChange={handleAddressChange}
            onKeyDown={handleKeyDown}
            placeholder="Enter address, city, or zip..."
            className="w-full pl-12 sm:pl-14 md:pl-16 lg:pl-20 pr-20 sm:pr-24 md:pr-28 lg:pr-32 py-4 sm:py-5 md:py-6 lg:py-7 text-base sm:text-lg md:text-xl lg:text-2xl text-gray-900 bg-white border-2 sm:border-3 border-gray-300 hover:border-gray-400 focus:border-orange-500 rounded-xl sm:rounded-2xl focus:ring-2 sm:focus:ring-4 focus:ring-orange-500/30 outline-none transition-all shadow-lg sm:shadow-2xl hover:shadow-xl sm:hover:shadow-3xl touch-manipulation font-medium"
            autoComplete="off"
            autoFocus
          />

          {/* Get Quote Button - Responsive */}
          <button
            type="submit"
            disabled={!selectedAddress}
            className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 active:scale-95 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:opacity-60 text-white px-3 sm:px-4 md:px-6 lg:px-8 py-2.5 sm:py-3 md:py-4 lg:py-5 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm md:text-base lg:text-lg transition-all shadow-lg sm:shadow-xl hover:shadow-xl sm:hover:shadow-2xl flex items-center gap-1 sm:gap-2 touch-manipulation min-h-[44px] sm:min-h-[48px] md:min-h-[56px] whitespace-nowrap"
            title={!selectedAddress ? 'Please select an address first' : 'Get your quote'}
          >
            <span className="hidden sm:inline">{selectedAddress ? '✓ ' : ''}Get Quote</span>
            <span className="sm:hidden">{selectedAddress ? '✓' : 'Quote'}</span>
            <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Autocomplete Suggestions Dropdown */}
        {suggestions.length > 0 && (
          <div className="absolute z-50 w-full mt-2 sm:mt-3 bg-white border-2 border-orange-500/50 rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl overflow-hidden animate-fadeIn">
            <div className="text-xs sm:text-sm text-gray-600 px-3 sm:px-4 md:px-5 py-2 sm:py-3 md:py-4 bg-gradient-to-r from-orange-50 to-orange-100 border-b-2 border-orange-200 flex items-center gap-2">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="font-bold">Select Your Location</span>
            </div>
            {suggestions.map((location, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleSuggestionClick(location)}
                className="w-full px-3 sm:px-4 md:px-5 lg:px-6 py-3 sm:py-4 md:py-5 text-left hover:bg-orange-50 active:bg-orange-100 transition-all border-b border-gray-200 last:border-b-0 touch-manipulation group hover:shadow-inner"
              >
                <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
                  <div className="bg-orange-100 group-hover:bg-orange-200 p-2 sm:p-2.5 md:p-3 rounded-lg transition-colors flex-shrink-0">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 group-hover:text-orange-600 text-sm sm:text-base md:text-lg transition-colors truncate">
                      {location.address}
                    </p>
                    <p className="text-xs sm:text-sm md:text-base text-gray-600 group-hover:text-gray-800 mt-1 flex items-center gap-2 flex-wrap">
                      <span className="font-semibold">{location.city}, {location.state}</span>
                      <span className="bg-gray-200 group-hover:bg-orange-200 px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 rounded-md sm:rounded-lg text-xs sm:text-sm font-mono font-bold">{location.zipCode}</span>
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </form>

      {/* Selected Address Display */}
      {selectedAddress && (
        <div className="mt-4 sm:mt-6 p-3 sm:p-4 md:p-5 bg-green-500/20 border-2 border-green-500/50 rounded-lg sm:rounded-xl animate-fadeIn backdrop-blur-sm">
          <div className="flex items-start gap-2 sm:gap-3">
            <div className="bg-green-500/20 p-2 sm:p-2.5 md:p-3 rounded-lg flex-shrink-0">
              <svg className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-green-400 text-sm sm:text-base md:text-lg">✓ Location Selected</p>
              <p className="text-green-300 text-xs sm:text-sm md:text-base mt-1 truncate">{selectedAddress.address}</p>
              <p className="text-green-400 font-semibold text-xs sm:text-sm mt-1">Zip: {selectedAddress.zipCode}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

