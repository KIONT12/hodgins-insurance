export default function Education() {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Understanding Homeowners Insurance</h2>
          <p className="text-xl text-gray-600">Learn the basics to make informed decisions</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="card">
            <h3 className="text-2xl font-bold mb-4">What is Homeowners Insurance?</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Homeowners insurance is a type of property insurance that covers losses and damages to your home and assets in the home. It also provides liability coverage against accidents in the home or on the property.
            </p>
            <p className="text-gray-700 leading-relaxed">
              In Florida, homeowners insurance is especially important due to the state's exposure to hurricanes, floods, and other natural disasters. Having the right coverage can protect your most valuable asset.
            </p>
            <div className="mt-6 p-4 bg-primary-50 rounded-lg">
              <h4 className="font-bold text-primary-900 mb-2">Standard Coverage Includes:</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">✓</span>
                  <span>Dwelling protection (structure of your home)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">✓</span>
                  <span>Personal property coverage</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">✓</span>
                  <span>Liability protection</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">✓</span>
                  <span>Additional living expenses</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="card">
            <h3 className="text-2xl font-bold mb-4">Common Policy Types</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-primary-600 pl-4">
                <h4 className="font-bold text-gray-900 mb-1">HO-3 (Special Form)</h4>
                <p className="text-gray-700 text-sm">
                  Most common type, covers your home for all perils except those specifically excluded. Provides comprehensive protection for your dwelling.
                </p>
              </div>
              
              <div className="border-l-4 border-primary-600 pl-4">
                <h4 className="font-bold text-gray-900 mb-1">HO-5 (Comprehensive)</h4>
                <p className="text-gray-700 text-sm">
                  Premium coverage that protects both your home and belongings on an open-perils basis. Best for high-value homes.
                </p>
              </div>
              
              <div className="border-l-4 border-primary-600 pl-4">
                <h4 className="font-bold text-gray-900 mb-1">HO-6 (Condo)</h4>
                <p className="text-gray-700 text-sm">
                  Designed for condominium owners, covering personal property and interior structures. Works with HOA master policy.
                </p>
              </div>
              
              <div className="border-l-4 border-primary-600 pl-4">
                <h4 className="font-bold text-gray-900 mb-1">Dwelling Fire Policy</h4>
                <p className="text-gray-700 text-sm">
                  Basic coverage for rental properties or secondary homes. More limited than standard homeowners insurance.
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-accent-50 rounded-lg">
              <h4 className="font-bold text-accent-900 mb-2">Florida-Specific Considerations:</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Wind/hurricane deductibles may be separate</li>
                <li>• Flood insurance typically requires separate policy</li>
                <li>• Citizens Property Insurance as last resort option</li>
                <li>• Sinkhole coverage considerations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

