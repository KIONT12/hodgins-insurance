import { useMemo } from 'react'

export default function QuoteDetailsForm({ formData, errors, onChange, onNext, onBack }) {
  // Mobile detection for optimized rendering
  const isMobile = useMemo(() => {
    if (typeof window === 'undefined') return false
    return window.innerWidth < 768
  }, [])
  const squareFeetOptions = [
    { value: '', label: 'Select Square Feet' },
    { value: '500-999', label: '500 - 999 sq ft' },
    { value: '1000-1499', label: '1,000 - 1,499 sq ft' },
    { value: '1500-1999', label: '1,500 - 1,999 sq ft' },
    { value: '2000-2499', label: '2,000 - 2,499 sq ft' },
    { value: '2500-2999', label: '2,500 - 2,999 sq ft' },
    { value: '3000-3499', label: '3,000 - 3,499 sq ft' },
    { value: '3500-3999', label: '3,500 - 3,999 sq ft' },
    { value: '4000-4499', label: '4,000 - 4,499 sq ft' },
    { value: '4500-4999', label: '4,500 - 4,999 sq ft' },
    { value: '5000+', label: '5,000+ sq ft' }
  ]

  const yearBuiltOptions = [
    { value: '', label: 'Select Year Built' },
    { value: '2020-2024', label: '2020 - 2024' },
    { value: '2015-2019', label: '2015 - 2019' },
    { value: '2010-2014', label: '2010 - 2014' },
    { value: '2005-2009', label: '2005 - 2009' },
    { value: '2000-2004', label: '2000 - 2004' },
    { value: '1995-1999', label: '1995 - 1999' },
    { value: '1990-1994', label: '1990 - 1994' },
    { value: '1985-1989', label: '1985 - 1989' },
    { value: '1980-1984', label: '1980 - 1984' },
    { value: '1975-1979', label: '1975 - 1979' },
    { value: '1970-1974', label: '1970 - 1974' },
    { value: '1965-1969', label: '1965 - 1969' },
    { value: '1960-1964', label: '1960 - 1964' },
    { value: '1950-1959', label: '1950 - 1959' },
    { value: '1940-1949', label: '1940 - 1949' },
    { value: '1930-1939', label: '1930 - 1939' },
    { value: 'Before 1930', label: 'Before 1930' }
  ]

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl">
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">Property Details</h2>
        <p className="text-gray-300 text-sm sm:text-base">Help us provide an accurate quote</p>
      </div>

      {/* Address Summary */}
      <div className="bg-white/5 rounded-xl p-4 mb-6 border border-white/10">
        <p className="text-xs text-gray-400 mb-1">Property Address</p>
        <p className="text-white font-semibold text-sm sm:text-base">{formData.address}</p>
        <p className="text-gray-300 text-xs sm:text-sm">{formData.city}, FL {formData.zipCode}</p>
      </div>

      {/* Square Feet */}
      <div className="mb-5">
        <label className="block text-white font-semibold mb-2 text-sm sm:text-base">
          Square Feet <span className="text-orange-400">*</span>
        </label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </div>
          <select
            name="squareFeet"
            value={formData.squareFeet}
            onChange={(e) => onChange('squareFeet', e.target.value)}
            className={`w-full pl-12 pr-4 py-4 text-base bg-white/10 border-2 text-white rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all appearance-none touch-manipulation ${errors.squareFeet ? 'border-red-500' : 'border-white/20'}`}
            style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
          >
            {squareFeetOptions.map((option) => (
              <option key={option.value} value={option.value} className="bg-gray-800">
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {errors.squareFeet && (
          <p className="text-red-400 text-sm mt-1">{errors.squareFeet}</p>
        )}
      </div>

      {/* Year Built */}
      <div className="mb-6">
        <label className="block text-white font-semibold mb-2 text-sm sm:text-base">
          Year Built <span className="text-orange-400">*</span>
        </label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <select
            name="yearBuilt"
            value={formData.yearBuilt}
            onChange={(e) => onChange('yearBuilt', e.target.value)}
            className={`w-full pl-12 pr-4 py-4 text-base bg-white/10 border-2 text-white rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all appearance-none touch-manipulation ${errors.yearBuilt ? 'border-red-500' : 'border-white/20'}`}
            style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
          >
            {yearBuiltOptions.map((option) => (
              <option key={option.value} value={option.value} className="bg-gray-800">
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {errors.yearBuilt && (
          <p className="text-red-400 text-sm mt-1">{errors.yearBuilt}</p>
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
          Previous
        </button>
        <button
          type="button"
          onClick={onNext}
          className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-4 rounded-xl font-bold transition-all shadow-xl hover:scale-105 flex items-center justify-center gap-2 min-h-[56px]"
        >
          Continue to Contact
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}

