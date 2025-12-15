export default function Testimonials() {
    const reviews = [
      {
        name: "Sarah M.",
        location: "Miami, FL",
        rating: 5,
        text: "Saved over $500! Super easy process and the agent was amazing."
      },
      {
        name: "James W.",
        location: "Tampa, FL",
        rating: 5,
        text: "Got quotes from 5 carriers in under 10 minutes. Best insurance experience ever."
      },
      {
        name: "Emily C.",
        location: "Orlando, FL",
        rating: 5,
        text: "The customer portal makes everything so simple. Highly recommend!"
      },
      {
        name: "Michael R.",
        location: "Jacksonville, FL",
        rating: 5,
        text: "Finally found an agency that actually cares. Licensed agents really know their stuff."
      },
      {
        name: "Lisa T.",
        location: "Fort Lauderdale, FL",
        rating: 5,
        text: "Switched providers and got better coverage for less money. Couldn't be happier!"
      },
      {
        name: "David L.",
        location: "St. Petersburg, FL",
        rating: 5,
        text: "Great technology combined with personal service. This is how insurance should be done."
      }
    ]

  return (
    <section id="testimonials" className="py-12 lg:py-16 bg-gray-50/90 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Customer Reviews</h2>
          <div className="flex justify-center items-center gap-2">
            <div className="flex text-yellow-500 text-xl">
              {'★★★★★'.split('').map((star, i) => <span key={i}>{star}</span>)}
            </div>
            <span className="text-lg font-bold text-gray-900">4.9</span>
            <span className="text-gray-500">(2,000+ reviews)</span>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.slice(0, 3).map((review, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex text-yellow-500 mb-3">
                {Array(review.rating).fill('★').join('')}
              </div>
              <p className="text-sm text-gray-700 mb-4 italic">"{review.text}"</p>
              <div>
                <div className="font-bold text-gray-900">{review.name}</div>
                <div className="text-xs text-gray-600">{review.location}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

