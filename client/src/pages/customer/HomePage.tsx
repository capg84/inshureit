import { Link } from 'react-router-dom';
import { Users, User } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary">InshureIt</h1>
            <a
              href="/backoffice/login"
              className="text-sm text-gray-600 hover:text-primary transition-colors"
            >
              Backoffice Login
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Compare Life Insurance Quotes
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get the best coverage for you and your family. Simple, fast, and free.
          </p>
        </div>

        {/* Trust Badges */}
        <div className="flex justify-center gap-8 mb-12 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>FCA Regulated</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>No Obligation</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>100% Free Service</span>
          </div>
        </div>

        {/* Insurance Type Selection */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold text-center mb-8">
            Choose Your Life Insurance Type
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Solo Insurance */}
            <Link
              to="/quote/solo"
              className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border-2 border-transparent hover:border-primary"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  <User className="w-10 h-10" />
                </div>
                <h4 className="text-2xl font-bold mb-2 text-gray-900">Just Me</h4>
                <p className="text-gray-600 mb-4">
                  Life insurance coverage for one person
                </p>
                <div className="text-sm text-gray-500 mb-4">
                  Perfect for single individuals or those wanting personal coverage
                </div>
                <span className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-medium group-hover:bg-primary-600 transition-colors">
                  Get Quote →
                </span>
              </div>
            </Link>

            {/* Joint Insurance */}
            <Link
              to="/quote/joint"
              className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border-2 border-transparent hover:border-primary"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Users className="w-10 h-10" />
                </div>
                <h4 className="text-2xl font-bold mb-2 text-gray-900">Me & My Partner</h4>
                <p className="text-gray-600 mb-4">
                  Life insurance coverage for two people
                </p>
                <div className="text-sm text-gray-500 mb-4">
                  Ideal for couples or partners who want joint coverage
                </div>
                <span className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-medium group-hover:bg-primary-600 transition-colors">
                  Get Quote →
                </span>
              </div>
            </Link>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-16 max-w-5xl mx-auto">
          <h3 className="text-2xl font-semibold text-center mb-8">Why Choose InshureIt?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold mb-2">Fast Response</h4>
              <p className="text-gray-600">
                Most customers are contacted within the hour
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold mb-2">Simple Process</h4>
              <p className="text-gray-600">
                Easy-to-complete form with no hidden questions
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold mb-2">Secure & Private</h4>
              <p className="text-gray-600">
                Your information is encrypted and never shared
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600 text-sm">
            <p>&copy; {new Date().getFullYear()} InshureIt - Limit Unlimited Technologies Ltd. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
