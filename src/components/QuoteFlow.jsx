import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import PropertyMap from './PropertyMap'
import QuoteDetailsForm from './QuoteDetailsForm'

// API Configuration
const getApiUrl = () => {
  if (import.meta.env.PROD) {
    return import.meta.env.VITE_API_URL || 'https://api.hodgins.insure'
  }
  return import.meta.env.VITE_API_URL || 'http://localhost:3001'
}

const API_URL = getApiUrl()

export default function QuoteFlow({ initialAddress, onComplete }) {
  const [currentStep, setCurrentStep] = useState(1) // 1: Address, 2: Map, 3: Details, 4: Contact, 5: Success
  const [formData, setFormData] = useState({
    address: initialAddress?.address || '',
    city: initialAddress?.city || '',
    zipCode: initialAddress?.zipCode || '',
    state: 'FL',
    squareFeet: '',
    yearBuilt: '',
    fullName: '',
    phone: '',
    email: '',
    honeypot: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  // Update form data when initial address changes and start at map step
  useEffect(() => {
    if (initialAddress && initialAddress.address) {
      setFormData(prev => {
        // Only update if address actually changed
        if (prev.address === initialAddress.address) {
          return prev
        }
        return {
          ...prev,
          address: initialAddress.address,
          city: initialAddress.name || initialAddress.city || prev.city,
          zipCode: initialAddress.zipCode || prev.zipCode
        }
      })
      // Start at map step (step 2) when address is provided
      setCurrentStep(2)
    }
  }, [initialAddress?.address]) // Only depend on address string

  const handleFieldChange = useCallback((name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error for this field
    setErrors(prev => {
      if (prev[name]) {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      }
      return prev
    })
  }, [])

  const validateStep = (step) => {
    const newErrors = {}
    
    if (step === 2) {
      // Map step - address should already be validated
      if (!formData.address || !formData.zipCode) {
        newErrors.address = 'Please select a valid address'
      }
    }
    
    if (step === 3) {
      // Property details
      if (!formData.squareFeet || formData.squareFeet === '') {
        newErrors.squareFeet = 'Square feet is required'
      }
      if (!formData.yearBuilt || formData.yearBuilt === '') {
        newErrors.yearBuilt = 'Year built is required'
      }
    }
    
    if (step === 4) {
      // Contact information
      if (!formData.fullName || formData.fullName.trim().length < 2) {
        newErrors.fullName = 'Full name is required'
      }
      if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Valid email is required'
      }
      const cleanPhone = formData.phone?.replace(/\D/g, '')
      if (!formData.phone || cleanPhone.length < 10) {
        newErrors.phone = 'Valid phone number is required'
      }
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 5))
    }
  }

  const handleBack = () => {
    if (currentStep === 2) {
      // If going back from map, return to address search (handled by parent)
      if (onComplete) {
        onComplete({ action: 'reset' })
      }
    } else {
      setCurrentStep(prev => Math.max(prev - 1, 2)) // Don't go below step 2 (map)
    }
  }

  const handleSubmit = async () => {
    if (!validateStep(4)) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)
    setErrors({})

    // Prepare submission data
    const [firstName, ...lastNameParts] = formData.fullName.trim().split(' ')
    const lastName = lastNameParts.join(' ') || firstName

    const submitData = {
      firstName: firstName,
      lastName: lastName,
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      zipCode: formData.zipCode.trim(),
      address: formData.address.trim(),
      squareFeet: formData.squareFeet.trim(),
      yearBuilt: formData.yearBuilt.trim(),
      honeypot: formData.honeypot || '',
      website: formData.honeypot || ''
    }

    console.log('📤 Submitting quote data:', JSON.stringify(submitData, null, 2))

    // Retry logic
    const maxRetries = 3
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 10000)

        const response = await fetch(`${API_URL}/api/quote`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(submitData),
          signal: controller.signal,
          mode: 'cors',
          credentials: 'omit',
        })

        clearTimeout(timeoutId)

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: 'Server error' }))
          throw new Error(errorData.error || `Server returned ${response.status}`)
        }

        const data = await response.json()
        console.log('✅ Response data:', data)

        if (data.success) {
          setSubmitStatus('success')
          setCurrentStep(5)
          setIsSubmitting(false)
          
          if (onComplete) {
            onComplete(submitData)
          }
          return
        } else {
          throw new Error(data.error || 'Submission failed')
        }
      } catch (error) {
        console.error(`❌ Attempt ${attempt}/${maxRetries} failed:`, error)
        
        if (attempt === maxRetries) {
          setSubmitStatus('error')
          setErrors({
            submit: `Unable to submit quote: ${error.message}. Please call us at 772.244.4350 to complete your quote.`
          })
          setIsSubmitting(false)
        } else {
          await new Promise(resolve => setTimeout(resolve, 1000 * attempt))
        }
      }
    }
  }

  // Mobile detection
  const isMobile = useMemo(() => {
    if (typeof window === 'undefined') return false
    return window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  }, [])

  // Step Indicator Component - Simplified on mobile
  const StepIndicator = () => {
    const steps = [
      { num: 1, label: 'Address', completed: currentStep > 1 },
      { num: 2, label: 'Map', completed: currentStep > 2, current: currentStep === 2 },
      { num: 3, label: 'Details', completed: currentStep > 3, current: currentStep === 3 },
      { num: 4, label: 'Contact', completed: currentStep > 4, current: currentStep === 4 }
    ]
    
    // Simplified indicator on mobile for better performance
    if (isMobile) {
      return (
        <div className="mb-4">
          <div className="flex items-center justify-center gap-2">
            {steps.map((step, index) => (
              <div key={step.num} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                  step.completed 
                    ? 'bg-green-500 text-white' 
                    : step.current 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-white/10 text-gray-400'
                }`}>
                  {step.completed ? '✓' : step.num}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-4 h-0.5 mx-1 ${
                    step.completed ? 'bg-green-500' : 'bg-white/10'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      )
    }
    
    return (
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.num} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-sm sm:text-base ${
                  step.completed 
                    ? 'bg-green-500 text-white' 
                    : step.current 
                    ? 'bg-orange-500 text-white scale-110' 
                    : 'bg-white/10 text-gray-400'
                }`}>
                  {step.completed ? (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    step.num
                  )}
                </div>
                <span className={`text-xs sm:text-sm mt-2 font-semibold hidden sm:block ${
                  step.current ? 'text-orange-400' : step.completed ? 'text-green-400' : 'text-gray-400'
                }`}>
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`h-1 flex-1 mx-2 sm:mx-4 ${
                  step.completed ? 'bg-green-500' : 'bg-white/10'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Step 2: Property Map (Satellite View) - First step after address selection
  if (currentStep === 2) {
    return (
      <div className="w-full max-w-5xl mx-auto">
        <StepIndicator />
        <PropertyMap 
          address={formData.address}
          onNext={handleNext}
          onBack={handleBack}
        />
      </div>
    )
  }

  // Step 3: Property Details
  if (currentStep === 3) {
    return (
      <div className="w-full max-w-3xl mx-auto">
        <StepIndicator />
        <QuoteDetailsForm
          formData={formData}
          errors={errors}
          onChange={handleFieldChange}
          onNext={handleNext}
          onBack={handleBack}
        />
      </div>
    )
  }

  // Step 4: Contact Information
  if (currentStep === 4) {
    return (
      <div className="w-full max-w-3xl mx-auto">
        <StepIndicator />
        <ContactForm
          formData={formData}
          errors={errors}
          onChange={handleFieldChange}
          onSubmit={handleSubmit}
          onBack={handleBack}
          isSubmitting={isSubmitting}
          submitStatus={submitStatus}
        />
      </div>
    )
  }

  // Step 5: Success
  if (currentStep === 5) {
    return (
      <div className="w-full max-w-2xl mx-auto bg-white/10 backdrop-blur-xl rounded-3xl p-8 sm:p-10 border border-white/20 shadow-2xl text-center">
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-green-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Quote Request Received!</h2>
        <p className="text-lg text-gray-300 mb-6">
          Thank you{formData.fullName ? `, ${formData.fullName.split(' ')[0]}` : ''}! Your quote request has been submitted successfully.
        </p>
        <p className="text-base text-gray-400 mb-8">
          A licensed agent will contact you at <span className="font-semibold text-white">{formData.phone}</span> within 30 minutes.
        </p>
        <div className="bg-orange-500/20 border border-orange-500/50 rounded-xl p-4 mb-6">
          <p className="text-sm text-orange-200">
            <span className="font-semibold">Property:</span> {formData.address}
          </p>
        </div>
        <button
          onClick={() => {
            if (onComplete) {
              onComplete({ action: 'reset' })
            }
          }}
          className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-xl hover:scale-105"
        >
          Get Another Quote
        </button>
      </div>
    )
  }

  return null
}

// Contact Form Component
function ContactForm({ formData, errors, onChange, onSubmit, onBack, isSubmitting, submitStatus }) {
  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl">
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">Contact Information</h2>
        <p className="text-gray-300 text-sm sm:text-base">We'll use this to send your quote and contact you</p>
      </div>

      {/* Address Summary */}
      <div className="bg-white/5 rounded-xl p-4 mb-6 border border-white/10">
        <p className="text-xs text-gray-400 mb-1">Property Address</p>
        <p className="text-white font-semibold">{formData.address}</p>
        <p className="text-gray-300 text-sm">{formData.city}, FL {formData.zipCode}</p>
      </div>

      {/* Full Name */}
      <div className="mb-5">
        <label className="block text-white font-semibold mb-2 text-sm sm:text-base">
          Full Name <span className="text-orange-400">*</span>
        </label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={(e) => onChange('fullName', e.target.value)}
          placeholder="John Smith"
          className={`w-full px-4 py-4 text-base bg-white/10 border-2 text-white placeholder-gray-400 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all touch-manipulation ${errors.fullName ? 'border-red-500' : 'border-white/20'}`}
          disabled={isSubmitting}
          autoComplete="name"
          inputMode="text"
        />
        {errors.fullName && (
          <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>
        )}
      </div>

      {/* Email */}
      <div className="mb-5">
        <label className="block text-white font-semibold mb-2 text-sm sm:text-base">
          Email Address <span className="text-orange-400">*</span>
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={(e) => onChange('email', e.target.value)}
          placeholder="john@example.com"
          className={`w-full px-4 py-4 text-base bg-white/10 border-2 text-white placeholder-gray-400 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all touch-manipulation ${errors.email ? 'border-red-500' : 'border-white/20'}`}
          disabled={isSubmitting}
          autoComplete="email"
          inputMode="email"
        />
        {errors.email && (
          <p className="text-red-400 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      {/* Phone */}
      <div className="mb-6">
        <label className="block text-white font-semibold mb-2 text-sm sm:text-base">
          Phone Number <span className="text-orange-400">*</span>
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={(e) => onChange('phone', e.target.value)}
          placeholder="(772) 244-4350"
          className={`w-full px-4 py-4 text-base bg-white/10 border-2 text-white placeholder-gray-400 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all touch-manipulation ${errors.phone ? 'border-red-500' : 'border-white/20'}`}
          disabled={isSubmitting}
          autoComplete="tel"
          inputMode="tel"
        />
        {errors.phone && (
          <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
        )}
      </div>

      {/* Honeypot */}
      <input
        type="text"
        name="honeypot"
        value={formData.honeypot}
        onChange={(e) => onChange('honeypot', e.target.value)}
        style={{ display: 'none' }}
        tabIndex="-1"
        autoComplete="off"
      />

      {/* Error Message */}
      {submitStatus === 'error' && errors.submit && (
        <div className="mb-6 p-4 bg-red-900/30 border-2 border-red-500/50 rounded-xl">
          <p className="text-red-300 text-sm">{errors.submit}</p>
        </div>
      )}

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="flex-1 bg-white/10 hover:bg-white/20 text-white py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-4 rounded-xl font-bold transition-all shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-h-[56px]"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </>
          ) : (
            <>
              Submit Quote
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  )
}

