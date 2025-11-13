import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { useState } from 'react';
import { contactService } from '../../services/contact.service';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await contactService.submitContactForm(formData);

      if (response.success) {
        setSubmitted(true);

        // Reset form after 5 seconds
        setTimeout(() => {
          setSubmitted(false);
          setFormData({ name: '', email: '', subject: '', message: '' });
        }, 5000);
      } else {
        setError(response.error?.message || 'Failed to send message. Please try again.');
      }
    } catch (err: any) {
      console.error('Contact form error:', err);
      setError(
        err.response?.data?.error?.message ||
        'An error occurred. Please try emailing us directly at info@inshureit.com'
      );
    } finally {
      setLoading(false);
    }
  };

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

            <div className="mb-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email Us</h3>
                  <a href="mailto:info@inshureit.com" className="text-primary hover:underline text-lg">
                    info@inshureit.com
                  </a>
                  <p className="text-sm text-gray-600 mt-2">
                    We'll respond within 24 hours during business days
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-primary-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Need a Quote?</h3>
              <p className="text-gray-700 mb-4">
                Looking for life insurance? Fill out our quick form and we'll connect you with a specialist who will provide personalized quotes.
              </p>
              <Link to="/" className="btn-primary inline-block">
                Get Your Free Quote
              </Link>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-800">{error}</p>
                  </div>
                  <button
                    onClick={() => setError('')}
                    className="ml-auto flex-shrink-0 text-red-500 hover:text-red-700"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {submitted ? (
              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">Message Sent!</h3>
                    <p className="mt-2 text-sm text-green-700">
                      Thank you for contacting us. We'll get back to you within 24 hours.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="label">Name *</label>
                  <input
                    type="text"
                    id="name"
                    className="input"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="label">Email *</label>
                  <input
                    type="email"
                    id="email"
                    className="input"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="label">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    className="input"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="What is this regarding?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="label">Message *</label>
                  <textarea
                    id="message"
                    rows={5}
                    className="input resize-none"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us how we can help..."
                  />
                </div>

                <button type="submit" className="btn-primary w-full" disabled={loading}>
                  {loading ? 'Sending...' : 'Send Message'}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  We typically respond within 24 hours during business days
                </p>
              </form>
            )}
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
