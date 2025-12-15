import { useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export default function QuoteForm({ minimal = false, defaultZipCode = '' }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    zipCode: defaultZipCode,
    address: '',
    squareFeet: '',
    yearBuilt: '',
    honeypot: ''
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success', 'error', null

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Full name (using firstName field)
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Full name is required'
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'Full name must be at least 2 characters'
    }
    
    // Auto-fill lastName with firstName for backend compatibility
    if (formData.firstName && !formData.lastName) {
      formData.lastName = formData.firstName
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Phone
    const cleanPhone = formData.phone.replace(/\D/g, '')
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required'
    } else if (cleanPhone.length < 10) {
      newErrors.phone = 'Please enter a valid 10-digit phone number'
    }


    if (!formData.zipCode && !formData.address) {
      newErrors.zipCode = 'Florida address or zip code is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate form
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch(`${API_URL}/api/quote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setSubmitStatus('success')
        // Track conversion (Google Analytics, Facebook Pixel, etc.)
        if (window.gtag) {
          window.gtag('event', 'conversion', {
            send_to: 'AW-CONVERSION_ID',
            value: 1.0,
            currency: 'USD'
          })
        }
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          zipCode: '',
          address: '',
          squareFeet: '',
          yearBuilt: '',
          honeypot: ''
        })
      } else {
        setSubmitStatus('error')
        if (data.errors) {
          setErrors(data.errors)
        }
      }
    } catch (error) {
      console.error('Submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitStatus === 'success') {
    return (
      <div className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-2xl mx-auto">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
        <p className="text-gray-600 mb-4">
          Your quote request has been received. A licensed agent will contact you shortly.
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Average response time: Under 30 minutes
        </p>
        <button
          onClick={() => setSubmitStatus(null)}
          className="text-orange-600 hover:text-orange-700 font-semibold"
        >
          Submit Another Request
        </button>
      </div>
    )
  }

  // Minimal version for hero section
  if (minimal) {
    return (
      <div className="w-full max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            name="honeypot"
            value={formData.honeypot}
            onChange={handleChange}
            style={{ display: 'none' }}
            tabIndex="-1"
            autoComplete="off"
          />
          
          <div className="flex-1 relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your Florida address"
              className="w-full pl-14 pr-4 py-5 text-lg bg-white text-gray-900 rounded-xl focus:ring-4 focus:ring-orange-500/50 focus:outline-none transition-all"
              disabled={isSubmitting}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-5 rounded-xl font-bold text-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl whitespace-nowrap"
          >
            {isSubmitting ? 'Processing...' : 'Get Quotes'}
          </button>
        </form>
        
        {errors.zipCode && (
          <p className="text-red-400 text-sm mt-2 text-center">{errors.zipCode}</p>
        )}
      </div>
    )
  }

  // Full form version
  return (
    <div className="bg-navy-900/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 lg:p-8 border border-white/10" id="quote-form">
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Finalize Quote</h2>
      
      {submitStatus === 'error' && !Object.keys(errors).length && (
        <div className="mb-6 p-4 bg-red-900/30 border border-red-500/50 rounded-lg">
          <p className="text-red-300 text-sm">
            There was an error. Please try again or call us at 772.244.4184.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Honeypot field - hidden from users */}
        <input
          type="text"
          name="honeypot"
          value={formData.honeypot}
          onChange={handleChange}
          style={{ display: 'none' }}
          tabIndex="-1"
          autoComplete="off"
        />

        {/* Property Details Dropdowns */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <select
              name="squareFeet"
              value={formData.squareFeet}
              onChange={handleChange}
              className="w-full px-4 py-4 text-base bg-navy-800/50 border-2 border-orange-500/30 text-white rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all appearance-none cursor-pointer"
              disabled={isSubmitting}
            >
              <option value="">Square Feet</option>
              <option value="0-1000">0 - 1,000 sq ft</option>
              <option value="1000-1500">1,000 - 1,500 sq ft</option>
              <option value="1500-2000">1,500 - 2,000 sq ft</option>
              <option value="2000-2500">2,000 - 2,500 sq ft</option>
              <option value="2500-3000">2,500 - 3,000 sq ft</option>
              <option value="3000+">3,000+ sq ft</option>
            </select>
          </div>

          <div>
            <select
              name="yearBuilt"
              value={formData.yearBuilt}
              onChange={handleChange}
              className="w-full px-4 py-4 text-base bg-navy-800/50 border-2 border-orange-500/30 text-white rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all appearance-none cursor-pointer"
              disabled={isSubmitting}
            >
              <option value="">Year Built</option>
              <option value="2020-2024">2020 - 2024</option>
              <option value="2015-2019">2015 - 2019</option>
              <option value="2010-2014">2010 - 2014</option>
              <option value="2000-2009">2000 - 2009</option>
              <option value="1990-1999">1990 - 1999</option>
              <option value="1980-1989">1980 - 1989</option>
              <option value="before-1980">Before 1980</option>
            </select>
          </div>
        </div>

        {/* Full Name */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Full Name"
            className={`w-full pl-12 pr-4 py-4 text-base bg-navy-800/50 border-2 text-white placeholder-gray-400 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all ${errors.firstName ? 'border-red-500' : 'border-orange-500/30'}`}
            disabled={isSubmitting}
          />
          {errors.firstName && (
            <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>
          )}
        </div>

        {/* Phone Number */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className={`w-full pl-12 pr-4 py-4 text-base bg-navy-800/50 border-2 text-white placeholder-gray-400 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all ${errors.phone ? 'border-red-500' : 'border-orange-500/30'}`}
            disabled={isSubmitting}
          />
          {errors.phone && (
            <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Email Address */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className={`w-full pl-12 pr-4 py-4 text-base bg-navy-800/50 border-2 text-white placeholder-gray-400 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all ${errors.email ? 'border-red-500' : 'border-orange-500/30'}`}
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-1">{errors.email}</p>
          )}
        </div>


        <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-6">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-full bg-gray-700/50 hover:bg-gray-700/70 active:bg-gray-700/80 text-white py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base transition-all flex items-center justify-center gap-2 touch-manipulation"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="hidden sm:inline">Previous</span>
            <span className="sm:hidden">Back</span>
          </button>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl flex items-center justify-center gap-2 touch-manipulation"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                Finalize Quote
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </>
            )}
          </button>
        </div>

        <p className="text-xs text-gray-400 text-center leading-relaxed px-4 mt-4">
          By pressing 'Get Quote' you are explicitly agreeing to our terms and conditions and privacy policy, and consenting to receive text messages. To unsubscribe, text STOP to (954) 866-8851
        </p>
      </form>
    </div>
  )
}

