export default function FloridaRates() {
  const rateData = [
    {
      city: 'Miami',
      average: '$6,847',
      ourRate: '$3,142',
      savings: '$3,705',
      percent: '54%'
    },
    {
      city: 'Tampa',
      average: '$5,467',
      ourRate: '$2,508',
      savings: '$2,959',
      percent: '54%'
    },
    {
      city: 'Orlando',
      average: '$5,421',
      ourRate: '$2,487',
      savings: '$2,934',
      percent: '54%'
    },
    {
      city: 'Jacksonville',
      average: '$4,978',
      ourRate: '$2,285',
      savings: '$2,693',
      percent: '54%'
    },
    {
      city: 'Fort Lauderdale',
      average: '$6,234',
      ourRate: '$2,860',
      savings: '$3,374',
      percent: '54%'
    },
    {
      city: 'Naples',
      average: '$6,548',
      ourRate: '$3,005',
      savings: '$3,543',
      percent: '54%'
    }
  ]

  return (
    <section className="py-8 sm:py-12 lg:py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 md:p-10 border border-white/20 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3 sm:mb-4">
              Florida Home Insurance Rates by City
            </h2>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-3xl mx-auto">
              Compare average market rates vs. our competitive quotes. All rates are annual estimates based on a $300,000 home.
            </p>
          </div>

          {/* Rate Comparison Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-white/20">
                  <th className="text-left py-4 px-4 sm:px-6 text-white font-bold text-sm sm:text-base">City</th>
                  <th className="text-right py-4 px-4 sm:px-6 text-gray-400 font-semibold text-sm sm:text-base">Market Average</th>
                  <th className="text-right py-4 px-4 sm:px-6 text-orange-400 font-bold text-sm sm:text-base">Our Rate</th>
                  <th className="text-right py-4 px-4 sm:px-6 text-green-400 font-bold text-sm sm:text-base">You Save</th>
                  <th className="text-right py-4 px-4 sm:px-6 text-green-400 font-bold text-sm sm:text-base">Savings</th>
                </tr>
              </thead>
              <tbody>
                {rateData.map((city, index) => (
                  <tr 
                    key={index}
                    className="border-b border-white/10 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-4 px-4 sm:px-6">
                      <div className="font-bold text-white text-sm sm:text-base">{city.city}</div>
                      <div className="text-gray-400 text-xs">Florida</div>
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-right">
                      <div className="text-gray-300 line-through text-sm sm:text-base">{city.average}</div>
                      <div className="text-gray-500 text-xs">/year</div>
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-right">
                      <div className="text-orange-400 font-black text-lg sm:text-xl">{city.ourRate}</div>
                      <div className="text-gray-400 text-xs">/year</div>
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-right">
                      <div className="text-green-400 font-bold text-sm sm:text-base">{city.savings}</div>
                      <div className="text-gray-400 text-xs">/year</div>
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-right">
                      <div className="bg-green-500/20 text-green-400 font-bold px-3 py-1 rounded-full text-xs sm:text-sm inline-block border border-green-500/30">
                        {city.percent} OFF
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Disclaimer */}
          <div className="mt-6 sm:mt-8 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
            <p className="text-yellow-200 text-xs sm:text-sm text-center">
              <span className="font-semibold">Note:</span> Rates are estimates and may vary based on home value, location, coverage needs, and other factors. 
              Actual quotes may differ. Get your personalized quote above for accurate pricing.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

