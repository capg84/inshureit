import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have a question? We're here to help. Get in touch with our team.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get In Touch</h2>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                  <a href="mailto:info@inshureit.com" className="text-primary hover:underline">
                    info@inshureit.com
                  </a>
                  <p className="text-sm text-gray-600 mt-1">
                    We'll respond within 24 hours
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                  <a href="tel:+442012345678" className="text-primary hover:underline">
                    020 1234 5678
                  </a>
                  <p className="text-sm text-gray-600 mt-1">
                    Monday - Friday, 9am - 6pm
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                  <p className="text-gray-700">
                    Limit Unlimited Technologies Ltd<br />
                    123 Business Street<br />
                    London, EC1A 1BB<br />
                    United Kingdom
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Business Hours</h3>
                  <p className="text-gray-700">
                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                    Saturday: 10:00 AM - 4:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-primary-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Quick Quote</h3>
              <p className="text-gray-700 mb-4">
                Looking for a quote? Fill out our quick form and we'll connect you with a specialist.
              </p>
              <Link to="/" className="btn-primary inline-block">
                Get Your Free Quote
              </Link>
            </div>
          </div>

          {/* FAQ Quick Links */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>

            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-semibold text-gray-900 mb-2">How long does it take to get a quote?</h3>
                <p className="text-gray-700">
                  Most customers are contacted within 1 hour during business hours. Your specialist will provide personalized quotes based on your needs.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-semibold text-gray-900 mb-2">Is the service really free?</h3>
                <p className="text-gray-700">
                  Yes, absolutely! Our service is completely free for you. We receive a commission from our insurance partners, but this doesn't affect the price you pay.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-semibold text-gray-900 mb-2">Am I obligated to buy after getting a quote?</h3>
                <p className="text-gray-700">
                  Not at all. There's no obligation whatsoever. You're free to review the quotes, ask questions, and only proceed if you find the right policy for you.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-semibold text-gray-900 mb-2">How secure is my information?</h3>
                <p className="text-gray-700">
                  We use industry-leading encryption and security measures. Your data is protected and only shared with our FCA-regulated partner advisors.
                </p>
              </div>

              <div className="pb-4">
                <h3 className="font-semibold text-gray-900 mb-2">What happens after I submit my details?</h3>
                <p className="text-gray-700">
                  You'll receive a confirmation email immediately. Then, one of our trusted partner advisors will contact you to discuss your needs and provide tailored quotes.
                </p>
              </div>
            </div>

            <div className="mt-6">
              <Link to="/help" className="text-primary hover:underline font-medium">
                View All FAQs →
              </Link>
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Help With Something Else?</h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Visit our Help Centre for more information about life insurance, our process, and answers to common questions.
          </p>
          <Link to="/help" className="btn-secondary inline-block">
            Visit Help Centre
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
