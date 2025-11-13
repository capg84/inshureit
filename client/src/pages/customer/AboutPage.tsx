import { Link } from 'react-router-dom';
import { Shield, Users, Award, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/" className="text-2xl font-bold text-primary">
            InshureIt
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About InshureIt</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're dedicated to making life insurance simple, accessible, and affordable for everyone.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            At InshureIt, we believe that protecting your loved ones shouldn't be complicated or expensive.
            Our mission is to connect you with the right life insurance coverage through our network of
            trusted partners, making the entire process straightforward and stress-free.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            We work with leading insurance providers and advisors who are authorised and regulated by the
            Financial Conduct Authority (FCA), ensuring you receive professional guidance and competitive quotes.
          </p>
        </div>

        {/* Values Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Trust & Security</h3>
              <p className="text-gray-600">
                Your information is protected with industry-leading security measures and never shared without consent.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Customer First</h3>
              <p className="text-gray-600">
                We put your needs at the heart of everything we do, providing personalized service and support.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Excellence</h3>
              <p className="text-gray-600">
                We partner only with reputable, FCA-regulated providers to ensure the highest quality service.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Care & Support</h3>
              <p className="text-gray-600">
                We're here to help you protect what matters most - your family's financial future.
              </p>
            </div>
          </div>
        </div>

        {/* How We Work Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">How We Work</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">You Complete Our Simple Form</h3>
                <p className="text-gray-700">
                  Tell us about your life insurance needs by answering a few straightforward questions.
                  It takes just minutes and there's no obligation.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">We Connect You With Experts</h3>
                <p className="text-gray-700">
                  Your details are securely shared with our trusted partner advisors who specialise in
                  life insurance. They'll review your needs and search the market for the best options.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">You Get Personalized Quotes</h3>
                <p className="text-gray-700">
                  A friendly specialist will contact you to discuss your options and provide competitive
                  quotes tailored to your circumstances. You're free to ask questions and take your time deciding.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">You Choose What's Right</h3>
                <p className="text-gray-700">
                  Compare the quotes, get expert advice, and select the policy that best fits your needs
                  and budget. Our service is completely free with no hidden charges.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Company Info Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">About Our Company</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            InshureIt is a trading name of Limit Unlimited Technologies Ltd, a company dedicated to
            leveraging technology to simplify financial services. We are an introducer appointed
            representative, working with a carefully selected panel of FCA-regulated insurance providers
            and advisors.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Our platform has been designed with simplicity and security in mind. We use advanced encryption
            and data protection measures to ensure your personal information remains confidential throughout
            the quote process.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            While we don't provide financial advice directly, we connect you with experienced, qualified
            advisors who can guide you through your insurance options and help you make informed decisions
            about protecting your family's future.
          </p>
        </div>

        {/* CTA Section */}
        <div className="bg-primary rounded-xl shadow-lg p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-6 opacity-90">
            Get your free life insurance quote in minutes
          </p>
          <Link to="/" className="inline-block bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Get Quote Now
          </Link>
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
