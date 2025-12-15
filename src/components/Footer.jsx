export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-navy-900/95 backdrop-blur-sm text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="bg-white px-4 py-3 rounded-lg inline-block mb-4 shadow-md">
              <img 
                src="/popo.png" 
                alt="HODGINS Insurance Group" 
                className="h-20 w-auto md:h-24"
              />
            </div>
            <p className="text-lg leading-relaxed mb-6">
              Florida's trusted partner for home insurance. Licensed, reliable, and dedicated to saving you money.
            </p>
            <div className="flex items-center gap-2 text-orange-500 font-semibold text-lg">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Licensed in Florida
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold text-xl mb-6">Quick Links</h4>
            <ul className="space-y-3 text-lg">
              <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#benefits" className="hover:text-white transition-colors">Benefits</a></li>
              <li><a href="#testimonials" className="hover:text-white transition-colors">Reviews</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold text-xl mb-6">Contact Us</h4>
            <ul className="space-y-3 text-base">
              <li>
                <a href="tel:7722444184" className="hover:text-white transition-colors flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Phone/Text: 772.244.4184
                </a>
              </li>
              <li>
                <a href="tel:7722444350" className="hover:text-white transition-colors flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Office: 772.244.4350
                </a>
              </li>
              <li>
                <a href="mailto:chris@hodgins.insure" className="hover:text-white transition-colors flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  chris@hodgins.insure
                </a>
              </li>
              <li className="text-gray-400 text-sm mt-4">
                <strong className="text-gray-300">Customer Service:</strong><br />
                customerservice@hodgins.insure<br />
                772.244.4350 x 102
              </li>
              <li className="text-gray-400 text-sm">
                www.Hodgins.insure
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-base mb-8">
            <p>&copy; {currentYear} Hodgins.insure. All rights reserved.</p>
            <p>License #: FL-L123456</p>
          </div>
          
          <div className="p-6 bg-gray-800/50 rounded-xl text-sm leading-relaxed">
            <p className="mb-3">
              <strong className="text-white">Important:</strong> By submitting a quote request, you consent to receive communications from Hodgins.insure and partner carriers via phone, email, and text regarding insurance services. Message and data rates may apply. Reply STOP to opt out. No obligation to purchase.
            </p>
            <p>
              Quotes are estimates and subject to underwriting approval. Your information is secure and never sold. See our <a href="/privacy" className="text-orange-400 hover:text-orange-300 underline">Privacy Policy</a> for details.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

