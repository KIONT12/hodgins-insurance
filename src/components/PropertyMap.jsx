import { useState, useEffect, useRef, useMemo } from 'react'

// Cache for geocoded addresses to avoid re-geocoding
const geocodeCache = new Map()

// Mobile detection helper
const isMobile = () => {
  if (typeof window === 'undefined') return false
  return window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

export default function PropertyMap({ address, onNext, onBack }) {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const markerRef = useRef(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [mapError, setMapError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isMobileDevice, setIsMobileDevice] = useState(false)

  useEffect(() => {
    // Detect mobile on mount
    setIsMobileDevice(isMobile())
    
    // Load Google Maps API
    const loadGoogleMaps = () => {
      // Check if already loaded
      if (window.google && window.google.maps) {
        initializeMap()
        return
      }

      // Check if script is already being loaded
      if (document.querySelector('script[src*="maps.googleapis.com"]')) {
        const checkInterval = setInterval(() => {
          if (window.google && window.google.maps) {
            clearInterval(checkInterval)
            initializeMap()
          }
        }, 100)
        return () => clearInterval(checkInterval)
      }

      // Get API key from environment
      // Set VITE_GOOGLE_MAPS_API_KEY in your .env file
      // For development, you can use a test key or the key from estimator-widget.js
      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 
                     (window.widgetConfig && window.widgetConfig.mapsKey) ||
                     'AIzaSyDummyKeyForDevelopment'
      
      if (apiKey === 'AIzaSyDummyKeyForDevelopment') {
        console.warn('⚠️ Google Maps API key not configured. Set VITE_GOOGLE_MAPS_API_KEY in .env file')
      }
      
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geometry`
      script.async = true
      script.defer = true
      script.onload = () => {
        console.log('✅ Google Maps API loaded')
        initializeMap()
      }
      script.onerror = () => {
        console.error('❌ Failed to load Google Maps API')
        setMapError('Unable to load map. Please continue to the next step.')
        setIsLoading(false)
      }
      document.head.appendChild(script)
    }

    const initializeMap = () => {
      if (!mapRef.current || !window.google) return

      setIsLoading(true)
      
      // Check cache first
      const cachedLocation = geocodeCache.get(address)
      if (cachedLocation) {
        console.log('✅ Using cached geocode result')
        createMap(cachedLocation)
        return
      }
      
      // Geocode the address with shorter timeout on mobile
      const geocoder = new window.google.maps.Geocoder()
      const timeoutDuration = isMobileDevice ? 3000 : 5000 // Faster timeout on mobile
      const geocodeTimeout = setTimeout(() => {
        console.warn('⚠️ Geocoding timeout')
        setMapError('Geocoding took too long. Please continue to the next step.')
        setIsLoading(false)
      }, timeoutDuration)
      
      geocoder.geocode({ 
        address: address,
        region: 'us',
        componentRestrictions: { country: 'us', administrativeArea: 'FL' }
      }, (results, status) => {
        clearTimeout(geocodeTimeout)
        
        if (status === 'OK' && results[0]) {
          const location = results[0].geometry.location
          
          // Cache the result
          geocodeCache.set(address, location)
          
          // Limit cache size to prevent memory issues
          if (geocodeCache.size > 50) {
            const firstKey = geocodeCache.keys().next().value
            geocodeCache.delete(firstKey)
          }
          
          createMap(location)
        } else {
          console.error('Geocoding failed:', status)
          setMapError('Unable to find the address on the map. Please continue to the next step.')
          setIsLoading(false)
        }
      })
    }

    const createMap = (location) => {
      if (!mapRef.current) return
      
      // Reuse existing map if available
      if (mapInstanceRef.current) {
        mapInstanceRef.current.setCenter(location)
        if (markerRef.current) {
          markerRef.current.setPosition(location)
        } else {
          createMarker(location)
        }
        setMapLoaded(true)
        setIsLoading(false)
        return
      }
      
      // Mobile-optimized map settings
      const mobileOptimized = isMobileDevice
      const map = new window.google.maps.Map(mapRef.current, {
        center: location,
        zoom: mobileOptimized ? 18 : 19, // Lower zoom on mobile for faster loading
        mapTypeId: window.google.maps.MapTypeId.SATELLITE,
        disableDefaultUI: mobileOptimized, // Disable all UI on mobile for performance
        zoomControl: !mobileOptimized, // Only show zoom on desktop
        mapTypeControl: false, // Always disabled for performance
        streetViewControl: false, // Always disabled for performance
        fullscreenControl: !mobileOptimized, // Only on desktop
        gestureHandling: 'greedy',
        // Performance optimizations
        optimizeForLatLng: true,
        maxZoom: mobileOptimized ? 20 : 21, // Lower max zoom on mobile
        // Mobile-specific optimizations
        ...(mobileOptimized && {
          disableDoubleClickZoom: false,
          keyboardShortcuts: false,
          scrollwheel: true,
          draggable: true
        })
      })

      mapInstanceRef.current = map
      createMarker(location)
      
      setMapLoaded(true)
      setIsLoading(false)
    }

    const createMarker = (location) => {
      if (!mapInstanceRef.current) return
      
      // Pre-create marker icon
      const markerIcon = {
        url: 'data:image/svg+xml;base64,' + btoa(`
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="#ff6b35">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        `),
        scaledSize: new window.google.maps.Size(40, 40),
        anchor: new window.google.maps.Point(20, 40)
      }
      
      markerRef.current = new window.google.maps.Marker({
        position: location,
        map: mapInstanceRef.current,
        title: address,
        icon: markerIcon,
        optimized: true // Use optimized rendering
      })
    }

    if (address) {
      loadGoogleMaps()
    }

    return () => {
      // Cleanup timers
      if (debounceTimerRef) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [address])

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-4 sm:p-6 border border-white/20 shadow-2xl">
      <div className="mb-4 sm:mb-6">
        <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">Confirm Your Property</h2>
        <p className="text-gray-300 text-sm sm:text-base">Verify the location on the satellite map</p>
      </div>

      {/* Address Display */}
      <div className="bg-white/5 rounded-xl p-4 mb-4 sm:mb-6 border border-white/10">
        <div className="flex items-start gap-3">
          <div className="bg-orange-500/20 p-2 rounded-lg flex-shrink-0">
            <svg className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-xs text-gray-400 mb-1">Property Address</p>
            <p className="text-white font-semibold text-sm sm:text-base">{address}</p>
          </div>
        </div>
      </div>

      {/* Map Container - Optimized for mobile */}
      <div className="relative mb-4 sm:mb-6">
        <div 
          ref={mapRef} 
          className="w-full h-[250px] sm:h-[400px] md:h-[500px] rounded-xl overflow-hidden border-2 border-white/20"
          style={{ 
            minHeight: '250px',
            willChange: 'transform', // Optimize for mobile rendering
            transform: 'translateZ(0)' // Force GPU acceleration on mobile
          }}
        />
        
        {/* Loading Overlay - Simplified on mobile */}
        {isLoading && (
          <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center z-10" style={{ backdropFilter: isMobileDevice ? 'none' : 'blur(4px)' }}>
            <div className="text-center">
              <svg className="animate-spin h-8 w-8 sm:h-10 sm:w-10 text-orange-500 mx-auto mb-2 sm:mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-white text-xs sm:text-sm">Loading map...</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {mapError && (
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm rounded-xl flex items-center justify-center z-10">
            <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 m-4 text-center">
              <p className="text-red-300 text-sm">{mapError}</p>
            </div>
          </div>
        )}

        {/* Map Controls Info - Hidden on mobile for performance */}
        {mapLoaded && !isMobileDevice && (
          <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2 text-xs text-white">
            <p>📍 Property location marked</p>
            <p className="text-gray-400 mt-1">Use controls to zoom and explore</p>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 bg-white/10 hover:bg-white/20 text-white py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="hidden sm:inline">Change Address</span>
          <span className="sm:hidden">Back</span>
        </button>
        <button
          type="button"
          onClick={onNext}
          className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-4 rounded-xl font-bold transition-all shadow-xl hover:scale-105 flex items-center justify-center gap-2 min-h-[56px]"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading Map...
            </>
          ) : (
            <>
              Continue to Details
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </>
          )}
        </button>
      </div>
      
      {/* Skip Map Option (shown if loading takes too long) */}
      {isLoading && !mapError && (
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={onNext}
            className="text-orange-400 hover:text-orange-300 text-sm font-semibold underline transition-colors"
          >
            Skip map and continue
          </button>
        </div>
      )}
    </div>
  )
}

