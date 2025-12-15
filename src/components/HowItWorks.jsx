export default function HowItWorks() {
    const steps = [
      {
        number: 1,
        title: "Enter Your Info",
        description: "Tell us about your home and coverage needs in just 2 minutes.",
        icon: "📝"
      },
      {
        number: 2,
        title: "Compare Quotes",
        description: "We instantly compare rates from all major Florida carriers for you.",
        icon: "🔍"
      },
      {
        number: 3,
        title: "Save Money",
        description: "Choose the best coverage at the best price. Average savings: $450/year.",
        icon: "💰"
      }
    ]

  return (
    <section id="how-it-works" className="py-12 lg:py-16 bg-white/90 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">How It Works</h2>
          <p className="text-lg text-gray-600">Three simple steps to better coverage</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="text-5xl mb-4">{step.icon}</div>
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">{step.number}</span>
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900">{step.title}</h3>
              <p className="text-sm text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

