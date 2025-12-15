export default function Benefits() {
    const benefits = [
      {
        icon: "⚡",
        title: "2-Minute Quotes",
        description: "Get instant quotes from multiple carriers faster than any other platform."
      },
      {
        icon: "💰",
        title: "Save $450/Year",
        description: "Our customers save an average of $450 annually by comparing all carriers."
      },
      {
        icon: "🛡️",
        title: "All Major Carriers",
        description: "We work with every major insurance company in Florida - all in one place."
      },
      {
        icon: "👨‍💼",
        title: "Licensed Agents",
        description: "Real Florida licensed agents ready to help you understand your options."
      },
      {
        icon: "📱",
        title: "24/7 Online Portal",
        description: "Manage your policy, make payments, and file claims anytime, anywhere."
      },
      {
        icon: "⭐",
        title: "A+ Rated Service",
        description: "Thousands of 5-star reviews from satisfied Florida homeowners."
      }
    ]

  return (
    <section id="benefits" className="py-12 lg:py-16 bg-white/85 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Why Hodgins.insure?</h2>
          <p className="text-lg text-gray-600">Everything you need in one simple platform</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-3">{benefit.icon}</div>
              <h3 className="text-lg font-bold mb-2 text-gray-900">{benefit.title}</h3>
              <p className="text-sm text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

