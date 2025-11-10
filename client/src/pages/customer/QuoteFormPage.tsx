import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { quoteService, QuoteFormData } from '../../services/quote.service';

const TITLES = ['Mr', 'Mrs', 'Miss', 'Ms', 'Dr', 'Prof'];
const COVERAGE_AMOUNTS = [30000, 50000, 75000, 100000, 150000, 200000, 250000, 300000, 400000, 500000, 750000, 1000000];
const COVERAGE_PERIODS = Array.from({ length: 68 }, (_, i) => i + 5); // 5 to 72 years

export default function QuoteFormPage() {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const isJoint = type?.toLowerCase() === 'joint';

  const [formData, setFormData] = useState<Partial<QuoteFormData>>({
    insuranceType: isJoint ? 'JOINT' : 'SOLO',
    title: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    mobile: '',
    postcode: '',
    smokingStatus: false,
    coverageAmount: 100000,
    coveragePeriod: 20,
    partnerTitle: '',
    partnerFirstName: '',
    partnerLastName: '',
    partnerDateOfBirth: '',
    partnerSmokingStatus: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await quoteService.submitQuote(formData as QuoteFormData);

      if (response.success) {
        setSuccess(true);
        setTimeout(() => navigate('/'), 3000);
      } else {
        setError(response.error?.message || 'Failed to submit quote');
      }
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Quote Submitted!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your request. An insurance advisor will contact you soon.
          </p>
          <Link to="/" className="btn-primary inline-block">
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/" className="text-2xl font-bold text-primary">
            InshureIt
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Get Your {isJoint ? 'Joint' : 'Solo'} Life Insurance Quote
          </h2>
          <p className="text-gray-600 mb-8">
            Fill in your details below and an advisor will contact you with the best quotes.
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Primary Person Section */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Details</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="label">Title *</label>
                  <select
                    className="input"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  >
                    <option value="">Select title</option>
                    {TITLES.map((title) => (
                      <option key={title} value={title}>
                        {title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="label">First Name *</label>
                  <input
                    type="text"
                    className="input"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  />
                </div>

                <div>
                  <label className="label">Last Name *</label>
                  <input
                    type="text"
                    className="input"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  />
                </div>

                <div>
                  <label className="label">Date of Birth *</label>
                  <input
                    type="date"
                    className="input"
                    required
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  />
                </div>

                <div>
                  <label className="label">Email *</label>
                  <input
                    type="email"
                    className="input"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div>
                  <label className="label">Mobile Number *</label>
                  <input
                    type="tel"
                    className="input"
                    required
                    placeholder="07123456789"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  />
                </div>

                <div>
                  <label className="label">Postcode *</label>
                  <input
                    type="text"
                    className="input"
                    required
                    placeholder="SW1A 1AA"
                    value={formData.postcode}
                    onChange={(e) => setFormData({ ...formData, postcode: e.target.value.toUpperCase() })}
                  />
                </div>

                <div>
                  <label className="label">Do you smoke? *</label>
                  <select
                    className="input"
                    required
                    value={formData.smokingStatus ? 'yes' : 'no'}
                    onChange={(e) => setFormData({ ...formData, smokingStatus: e.target.value === 'yes' })}
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Coverage Details */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Coverage Details</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="label">Coverage Amount *</label>
                  <select
                    className="input"
                    required
                    value={formData.coverageAmount}
                    onChange={(e) => setFormData({ ...formData, coverageAmount: parseInt(e.target.value) })}
                  >
                    {COVERAGE_AMOUNTS.map((amount) => (
                      <option key={amount} value={amount}>
                        £{amount.toLocaleString()}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="label">Coverage Period *</label>
                  <select
                    className="input"
                    required
                    value={formData.coveragePeriod}
                    onChange={(e) => setFormData({ ...formData, coveragePeriod: parseInt(e.target.value) })}
                  >
                    {COVERAGE_PERIODS.map((period) => (
                      <option key={period} value={period}>
                        {period} years
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Partner Details (Joint Only) */}
            {isJoint && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Partner's Details</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="label">Partner's Title *</label>
                    <select
                      className="input"
                      required
                      value={formData.partnerTitle}
                      onChange={(e) => setFormData({ ...formData, partnerTitle: e.target.value })}
                    >
                      <option value="">Select title</option>
                      {TITLES.map((title) => (
                        <option key={title} value={title}>
                          {title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="label">Partner's First Name *</label>
                    <input
                      type="text"
                      className="input"
                      required
                      value={formData.partnerFirstName}
                      onChange={(e) => setFormData({ ...formData, partnerFirstName: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="label">Partner's Last Name *</label>
                    <input
                      type="text"
                      className="input"
                      required
                      value={formData.partnerLastName}
                      onChange={(e) => setFormData({ ...formData, partnerLastName: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="label">Partner's Date of Birth *</label>
                    <input
                      type="date"
                      className="input"
                      required
                      value={formData.partnerDateOfBirth}
                      onChange={(e) => setFormData({ ...formData, partnerDateOfBirth: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="label">Does your partner smoke? *</label>
                    <select
                      className="input"
                      required
                      value={formData.partnerSmokingStatus ? 'yes' : 'no'}
                      onChange={(e) => setFormData({ ...formData, partnerSmokingStatus: e.target.value === 'yes' })}
                    >
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <Link to="/" className="btn-secondary flex-1 text-center">
                Cancel
              </Link>
              <button type="submit" className="btn-primary flex-1" disabled={loading}>
                {loading ? 'Submitting...' : 'Get Quote'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
