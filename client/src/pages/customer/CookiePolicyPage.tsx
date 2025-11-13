import { Link } from 'react-router-dom';

export default function CookiePolicyPage() {
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
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Cookie Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. What Are Cookies?</h2>
              <p className="text-gray-700 mb-4">
                Cookies are small text files that are placed on your device (computer, smartphone, or tablet) when you visit a website. Cookies are widely used to make websites work more efficiently and provide information to website owners.
              </p>
              <p className="text-gray-700 mb-4">
                This Cookie Policy explains how InshureIt (Limit Unlimited Technologies Ltd) uses cookies and similar technologies on our website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Cookies</h2>
              <p className="text-gray-700 mb-4">
                We use cookies to:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Keep you signed in to secure areas of our website</li>
                <li>Remember your preferences and settings</li>
                <li>Understand how you use our website</li>
                <li>Improve your browsing experience</li>
                <li>Analyze website traffic and performance</li>
                <li>Ensure the security of our website</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Types of Cookies We Use</h2>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">3.1 Essential Cookies</h3>
              <p className="text-gray-700 mb-4">
                These cookies are necessary for the website to function properly. They enable basic functions like page navigation, access to secure areas, and quote form submission. The website cannot function properly without these cookies.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="text-sm text-gray-700"><strong>Examples:</strong></p>
                <ul className="list-disc pl-6 text-sm text-gray-700 space-y-1 mt-2">
                  <li>Session cookies for maintaining your connection</li>
                  <li>Authentication cookies for backoffice login</li>
                  <li>Security cookies to protect against fraud</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">3.2 Performance Cookies</h3>
              <p className="text-gray-700 mb-4">
                These cookies collect information about how visitors use our website, such as which pages are visited most often. This helps us improve how our website works and provides a better user experience.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="text-sm text-gray-700"><strong>Examples:</strong></p>
                <ul className="list-disc pl-6 text-sm text-gray-700 space-y-1 mt-2">
                  <li>Google Analytics cookies to understand website usage</li>
                  <li>Page load time tracking cookies</li>
                  <li>Error tracking cookies</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">3.3 Functional Cookies</h3>
              <p className="text-gray-700 mb-4">
                These cookies allow the website to remember choices you make (such as your preferences) and provide enhanced, more personalized features.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="text-sm text-gray-700"><strong>Examples:</strong></p>
                <ul className="list-disc pl-6 text-sm text-gray-700 space-y-1 mt-2">
                  <li>Language preference cookies</li>
                  <li>Form auto-fill cookies</li>
                  <li>User interface customization cookies</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Specific Cookies Used</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-900">Cookie Name</th>
                      <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-900">Purpose</th>
                      <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-900">Type</th>
                      <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-900">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">auth_token</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">Authentication for backoffice users</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">Essential</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">7 days</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">session_id</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">Maintains your browsing session</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">Essential</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">Session</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">_ga</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">Google Analytics - distinguishes users</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">Performance</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">2 years</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">_gid</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">Google Analytics - distinguishes users</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">Performance</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">24 hours</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Third-Party Cookies</h2>
              <p className="text-gray-700 mb-4">
                Some cookies are placed by third-party services that appear on our pages. We do not control these cookies, and you should check the relevant third-party website for more information.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Google Analytics</h3>
              <p className="text-gray-700 mb-4">
                We use Google Analytics to understand how visitors use our website. Google Analytics uses cookies to collect information about website usage. This information is used to compile reports and help us improve our website. The cookies collect information in an anonymous form.
              </p>
              <p className="text-gray-700 mb-4">
                For more information about Google Analytics cookies, visit: <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google's Cookie Policy</a>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Managing Cookies</h2>
              <p className="text-gray-700 mb-4">
                You can control and manage cookies in various ways. Please note that removing or blocking cookies may impact your user experience and some functionality may no longer be available.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">6.1 Browser Settings</h3>
              <p className="text-gray-700 mb-4">
                Most browsers allow you to refuse or accept cookies. The method for doing this varies from browser to browser. You can find instructions for common browsers here:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Chrome</a></li>
                <li><a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Mozilla Firefox</a></li>
                <li><a href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Apple Safari</a></li>
                <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Microsoft Edge</a></li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">6.2 Opting Out of Analytics</h3>
              <p className="text-gray-700 mb-4">
                You can opt out of Google Analytics tracking by installing the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Analytics Opt-out Browser Add-on</a>.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">6.3 Essential Cookies</h3>
              <p className="text-gray-700 mb-4">
                Please note that if you block essential cookies, you may not be able to use certain features of our website, including submitting quote requests or accessing the backoffice portal.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cookie Duration</h2>
              <p className="text-gray-700 mb-4">
                Cookies can be temporary or persistent:
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Session Cookies</h3>
              <p className="text-gray-700 mb-4">
                Temporary cookies that are deleted when you close your browser. These are used to maintain your browsing session.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Persistent Cookies</h3>
              <p className="text-gray-700 mb-4">
                Cookies that remain on your device for a set period or until you delete them. These are used to remember your preferences and provide analytics.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Changes to This Cookie Policy</h2>
              <p className="text-gray-700 mb-4">
                We may update this Cookie Policy from time to time to reflect changes in our practices or for legal, regulatory, or operational reasons. We will notify you of any material changes by updating the "Last updated" date at the top of this policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. More Information</h2>
              <p className="text-gray-700 mb-4">
                For more information about cookies and how they work, visit:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li><a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">All About Cookies</a></li>
                <li><a href="https://ico.org.uk/for-organisations/guide-to-pecr/cookies-and-similar-technologies" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">ICO Guidance on Cookies</a></li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about our use of cookies, please contact us:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-2"><strong>Limit Unlimited Technologies Ltd</strong></p>
                <p className="text-gray-700 mb-2">Email: <a href="mailto:privacy@inshureit.com" className="text-primary hover:underline">privacy@inshureit.com</a></p>
                <p className="text-gray-700 mb-2">Phone: 020 1234 5678</p>
                <p className="text-gray-700">Address: 123 Business Street, London, EC1A 1BB, United Kingdom</p>
              </div>
            </section>

            <div className="bg-primary-50 border-l-4 border-primary p-6 rounded-r-lg">
              <p className="text-gray-900 font-semibold mb-2">Related Policies</p>
              <p className="text-gray-700">
                For information about how we handle your personal data, please see our <Link to="/privacy-policy" className="text-primary hover:underline font-medium">Privacy Policy</Link>.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <Link to="/" className="btn-primary inline-block">
              Return to Homepage
            </Link>
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
