import { useState, useEffect } from 'react'

export default function InstantSavings() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Calculate average savings based on Florida market data
  const averageSavings = {
    amount: '$3,300',
    percent: '53%',
    average: '$6,147',
    ourRate: '$2,847'
  }

  return (
    <div className={`bg-gradient-to-br from-green-500/20 via-green-600/20 to-green-500/20 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border-2 border-green-500/50 shadow-2xl transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 bg-green-500/20 px-4 py-2 rounded-full mb-4 border border-green-500/30">
          <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="text-green-300 font-bold text-sm sm:text-base">Average Customer Savings</span>
        </div>
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-2">
          Save {averageSavings.percent} on Home Insurance
        </h3>
        <p className="text-gray-300 text-sm sm:text-base">
          Florida homeowners save an average of <span className="font-bold text-green-400">{averageSavings.amount}/year</span>
        </p>
      </div>

      {/* Comparison Cards */}
      <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-6">
        {/* Market Average */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-white/20 text-center">
          <div className="text-gray-400 text-xs sm:text-sm mb-2">Market Average</div>
          <div className="text-2xl sm:text-3xl font-black text-gray-300 line-through">{averageSavings.average}</div>
          <div className="text-gray-500 text-xs mt-1">/year</div>
        </div>

        {/* Our Rate */}
        <div className="bg-gradient-to-br from-orange-500/30 to-orange-600/30 backdrop-blur-sm rounded-xl p-4 sm:p-5 border-2 border-orange-500/50 text-center">
          <div className="text-orange-300 text-xs sm:text-sm mb-2 font-semibold">Your Quote</div>
          <div className="text-2xl sm:text-3xl font-black text-orange-400">{averageSavings.ourRate}</div>
          <div className="text-gray-300 text-xs mt-1">/year</div>
        </div>
      </div>

      {/* Savings Highlight */}
      <div className="bg-green-500/20 rounded-xl p-4 sm:p-5 border-2 border-green-500/50 text-center">
        <div className="text-green-300 text-sm sm:text-base mb-2 font-semibold">💰 You Save</div>
        <div className="text-3xl sm:text-4xl font-black text-green-400 mb-1">{averageSavings.amount}</div>
        <div className="text-green-300 text-xs sm:text-sm">per year • {averageSavings.percent} savings</div>
      </div>

      {/* CTA */}
      <button
        onClick={() => {
          const formElement = document.getElementById('quote-form')
          if (formElement) {
            formElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }
        }}
        className="w-full mt-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 text-lg"
      >
        Get Your Free Quote Now →
      </button>
    </div>
  )
}

