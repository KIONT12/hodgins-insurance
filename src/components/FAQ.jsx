import { useState } from 'react'

export default function FAQ() {
  const [openFaq, setOpenFaq] = useState(0)

    const faqs = [
      {
        question: "How much does homeowners insurance cost in Florida?",
        answer: "Florida homeowners pay between $1,400-$2,500 annually on average. We compare quotes from all major carriers to help you find the best rate for your situation."
      },
      {
        question: "How quickly can I get a quote?",
        answer: "Our platform provides quotes in minutes. Simply fill out the form above and we'll compare rates from all major Florida carriers instantly."
      },
      {
        question: "Is there any obligation to buy?",
        answer: "Absolutely not! Getting quotes is 100% free with no obligation to purchase. Compare rates and make your decision on your own timeline."
      },
      {
        question: "What does homeowners insurance cover?",
        answer: "Typically covers your dwelling, personal property, liability protection, and additional living expenses. We'll help you understand exactly what's covered."
      },
      {
        question: "Can I manage my policy online?",
        answer: "Yes! Our 24/7 portal allows you to view policy details, make payments, file claims, and access documents anytime."
      }
    ]

  return (
    <section id="faq" className="py-12 lg:py-16 bg-white/85 backdrop-blur-sm">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Common Questions</h2>
          <p className="text-lg text-gray-600">Everything you need to know</p>
        </div>
        
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-5">
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full text-left flex justify-between items-start gap-4 focus:outline-none"
              >
                <h3 className="text-base font-bold text-gray-900">{faq.question}</h3>
                <span className="text-orange-500 text-2xl flex-shrink-0 font-bold">
                  {openFaq === index ? '−' : '+'}
                </span>
              </button>
              {openFaq === index && (
                <p className="mt-3 text-sm text-gray-700">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 text-center bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Still have questions?</h3>
          <p className="text-gray-600 mb-4">Call us now and speak with a licensed agent</p>
          <a href="tel:7722444184" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-bold transition-all inline-block">
            Call 772.244.4184
          </a>
        </div>
      </div>
    </section>
  )
}

