import { useState } from 'react'

function App() {
  const [formData, setFormData] = useState({
    zipCode: '',
    email: '',
    phone: ''
  })
  const [openFaq, setOpenFaq] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const faqs = [
    {
      question: "How much does homeowners insurance cost in Florida?",
      answer: "Homeowners insurance costs in Florida vary based on factors like location, home value, age of the home, and coverage needs. On average, Florida homeowners pay between $1,400-$2,500 annually. Our platform compares quotes from all major carriers to help you find the best rate for your specific situation."
    },
    {
      question: "How do I file a claim?",
      answer: "Filing a claim is simple. Once you have a policy through Hodgins.insure, you can file a claim through your 24/7 customer portal, contact your dedicated agent directly, or call our claims hotline. Our licensed agents will guide you through the entire process and ensure your claim is handled promptly."
    },
    {
      question: "What does homeowners insurance cover?",
      answer: "Homeowners insurance typically covers your dwelling, personal property, liability protection, and additional living expenses if your home becomes uninhabitable. Coverage can include protection against fire, wind, theft, and other perils. We'll help you understand exactly what's covered in your policy and recommend the right coverage levels for your needs."
    },
    {
      question: "Can I manage my policy online?",
      answer: "Yes! Our 24/7 customer portal allows you to manage your policy anytime, anywhere. You can view your policy details, make payments, file claims, update your information, and access important documents all in one convenient location."
    },
    {
      question: "How quickly can I get a quote?",
      answer: "Our technology-driven platform provides quotes in minutes. Simply fill out our quick form, and we'll compare rates from all major Florida carriers instantly. You'll receive multiple quotes to choose from, and our licensed agents are available to help you understand your options."
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold text-primary-600">Hodgins.insure</div>
            <nav className="hidden md:flex space-x-6">
              <a href="#how-it-works" className="text-gray-700 hover:text-primary-600">How It Works</a>
              <a href="#benefits" className="text-gray-700 hover:text-primary-600">Benefits</a>
              <a href="#testimonials" className="text-gray-700 hover:text-primary-600">Reviews</a>
              <a href="#faq" className="text-gray-700 hover:text-primary-600">FAQ</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Get Free Home Insurance Quotes
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-primary-100">
                Compare all Florida carriers in minutes. Save time and money with our technology-driven platform.
              </p>
              
              {/* Trust Badges */}
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <div className="flex text-yellow-400">
                    {'★★★★★'.split('').map((star, i) => <span key={i}>{star}</span>)}
                  </div>
                  <span className="text-sm">4.9/5 Rating</span>
                </div>
                <div className="text-sm">✓ Licensed Insurance Agency</div>
                <div className="text-sm">✓ 10,000+ Happy Customers</div>
              </div>

              {/* Savings Comparison */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-primary-100">Market Average</span>
                  <span className="text-2xl font-bold">$2,100/yr</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white font-semibold">Average Customer Savings</span>
                  <span className="text-3xl font-bold text-accent-400">$450/yr</span>
                </div>
                <div className="mt-2 text-sm text-primary-100">
                  *Based on average savings from customers who compared quotes in 2024
                </div>
              </div>
            </div>

            {/* Quote Form */}
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Get Your Free Quote</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    placeholder="Enter your zip code"
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(555) 123-4567"
                    className="input-field"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn-primary w-full text-lg py-4"
                >
                  Get Quote
                </button>
                <p className="text-xs text-gray-500 text-center">
                  By submitting, you agree to receive communications from Hodgins.insure and our partner carriers.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 text-center mb-12">Get the best home insurance quote in three simple steps</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-primary-600">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Fast Carrier Comparison</h3>
              <p className="text-gray-600">
                Our platform instantly compares rates from all major Florida insurance carriers, saving you hours of research.
              </p>
            </div>
            
            <div className="card text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-primary-600">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Technology-Driven Quotes</h3>
              <p className="text-gray-600">
                Advanced algorithms analyze your needs and match you with the best policies in minutes, not days.
              </p>
            </div>
            
            <div className="card text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-primary-600">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Access to Licensed Agents</h3>
              <p className="text-gray-600">
                Get personalized support from our team of licensed insurance agents who understand Florida's unique market.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Why Choose Hodgins.insure?</h2>
          <p className="text-xl text-gray-600 text-center mb-12">Everything you need for the best insurance experience</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
              <p className="text-gray-600">
                Get quotes from multiple carriers in minutes, not hours. Our streamlined process gets you covered quickly.
              </p>
            </div>
            
            <div className="card">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-2">Affordable Rates</h3>
              <p className="text-gray-600">
                Compare rates from all carriers to find the best price. Our customers save an average of $450 per year.
              </p>
            </div>
            
            <div className="card">
              <div className="text-4xl mb-4">🔧</div>
              <h3 className="text-xl font-bold mb-2">Advanced Technology</h3>
              <p className="text-gray-600">
                State-of-the-art platform that makes comparing and managing insurance simple and intuitive.
              </p>
            </div>
            
            <div className="card">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-bold mb-2">Dedicated Agent Support</h3>
              <p className="text-gray-600">
                Work with licensed insurance professionals who understand your needs and Florida's insurance market.
              </p>
            </div>
            
            <div className="card">
              <div className="text-4xl mb-4">🌐</div>
              <h3 className="text-xl font-bold mb-2">24/7 Customer Portal</h3>
              <p className="text-gray-600">
                Manage your policy, make payments, file claims, and get support anytime, anywhere through our secure portal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">What Our Customers Say</h2>
          <p className="text-xl text-gray-600 text-center mb-12">Real reviews from real customers</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Sarah Martinez",
                location: "Miami, FL",
                rating: 5,
                text: "Saved me over $500 a year! The process was so easy and the agent was incredibly helpful. Highly recommend!"
              },
              {
                name: "James Wilson",
                location: "Tampa, FL",
                rating: 5,
                text: "Best insurance experience I've ever had. Got quotes from 5 different carriers in under 10 minutes."
              },
              {
                name: "Emily Chen",
                location: "Orlando, FL",
                rating: 5,
                text: "The customer portal is amazing. I can manage everything online and the support team is always responsive."
              },
              {
                name: "Michael Rodriguez",
                location: "Jacksonville, FL",
                rating: 5,
                text: "Finally found an insurance company that actually cares. The licensed agents really know their stuff."
              },
              {
                name: "Lisa Thompson",
                location: "Fort Lauderdale, FL",
                rating: 5,
                text: "Switched from my old provider and couldn't be happier. Better coverage at a better price!"
              },
              {
                name: "David Lee",
                location: "St. Petersburg, FL",
                rating: 5,
                text: "The technology platform is impressive, but what really stands out is the personal service. Top notch!"
              }
            ].map((review, index) => (
              <div key={index} className="card">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400 text-lg">
                    {Array(review.rating).fill('★').join('')}
                  </div>
                </div>
                <p className="text-gray-700 mb-4 italic">"{review.text}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{review.name}</div>
                  <div className="text-sm text-gray-500">{review.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Educational Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Understanding Homeowners Insurance</h2>
          <p className="text-xl text-gray-600 text-center mb-12">Learn the basics to make informed decisions</p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card">
              <h3 className="text-2xl font-bold mb-4">What is Homeowners Insurance?</h3>
              <p className="text-gray-700 mb-4">
                Homeowners insurance is a type of property insurance that covers losses and damages to your home and assets in the home. It also provides liability coverage against accidents in the home or on the property.
              </p>
              <p className="text-gray-700">
                In Florida, homeowners insurance is especially important due to the state's exposure to hurricanes, floods, and other natural disasters. Having the right coverage can protect your most valuable asset.
              </p>
            </div>
            
            <div className="card">
              <h3 className="text-2xl font-bold mb-4">Common Policy Types</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  <div>
                    <strong>HO-3 (Special Form):</strong> Most common type, covers your home for all perils except those specifically excluded.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  <div>
                    <strong>HO-5 (Comprehensive):</strong> Premium coverage that protects both your home and belongings on an open-perils basis.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  <div>
                    <strong>HO-6 (Condo):</strong> Designed for condominium owners, covering personal property and interior structures.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  <div>
                    <strong>Dwelling Fire:</strong> Basic coverage for rental properties or secondary homes.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 text-center mb-12">Get answers to common questions about home insurance</p>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="card">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full text-left flex justify-between items-center"
                >
                  <h3 className="text-lg font-semibold pr-4">{faq.question}</h3>
                  <span className="text-primary-600 text-2xl flex-shrink-0">
                    {openFaq === index ? '−' : '+'}
                  </span>
                </button>
                {openFaq === index && (
                  <p className="mt-4 text-gray-700 leading-relaxed">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold text-white mb-4">Hodgins.insure</div>
              <p className="text-sm">
                Your trusted partner for finding the best home insurance in Florida.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#how-it-works" className="hover:text-white">How It Works</a></li>
                <li><a href="#benefits" className="hover:text-white">Benefits</a></li>
                <li><a href="#testimonials" className="hover:text-white">Reviews</a></li>
                <li><a href="#faq" className="hover:text-white">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/terms" className="hover:text-white">Terms of Service</a></li>
                <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="/licenses" className="hover:text-white">Licenses</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li>Phone: (555) 123-4567</li>
                <li>Email: info@hodgins.insure</li>
                <li>Licensed in Florida</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm">
              <p>&copy; 2024 Hodgins.insure. All rights reserved.</p>
              <p className="mt-4 md:mt-0">
                License #: FL-123456 | Licensed Insurance Agency
              </p>
            </div>
            <div className="mt-6 p-4 bg-gray-800 rounded-lg text-xs">
              <p className="font-semibold mb-2">Consent Disclaimer:</p>
              <p>
                By submitting a quote request through this website, you consent to receive communications from Hodgins.insure 
                and our partner insurance carriers via phone, email, and text message. You understand that you may be contacted 
                by licensed insurance agents regarding your quote request. You can opt-out of communications at any time. 
                Submitting your information does not guarantee insurance coverage or specific rates. All quotes are subject to 
                underwriting approval and may vary based on individual circumstances.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

