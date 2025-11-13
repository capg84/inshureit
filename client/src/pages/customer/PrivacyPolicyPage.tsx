import { Link } from 'react-router-dom';

export default function PrivacyPolicyPage() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-700 mb-4">
                InshureIt is a trading name of Limit Unlimited Technologies Ltd ("we", "us", or "our"). We are committed to protecting and respecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
              </p>
              <p className="text-gray-700 mb-4">
                Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access our website or use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">2.1 Personal Information</h3>
              <p className="text-gray-700 mb-4">
                We collect personal information that you voluntarily provide to us when you request a life insurance quote. This includes:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Name and title</li>
                <li>Date of birth</li>
                <li>Email address</li>
                <li>Mobile phone number</li>
                <li>Postcode</li>
                <li>Smoking status</li>
                <li>Coverage preferences (amount and period)</li>
                <li>Partner details (for joint policies)</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">2.2 Technical Information</h3>
              <p className="text-gray-700 mb-4">
                We automatically collect certain information when you visit our website, including:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Device information</li>
                <li>Pages viewed and time spent on pages</li>
                <li>Referring website addresses</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">
                We use the information we collect for the following purposes:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>To process your life insurance quote request</li>
                <li>To share your details with our panel of FCA-regulated insurance advisors</li>
                <li>To enable advisors to contact you with personalized quotes</li>
                <li>To send you confirmation emails and service updates</li>
                <li>To improve our website and services</li>
                <li>To comply with legal obligations and prevent fraud</li>
                <li>To analyze website usage and optimize user experience</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Legal Basis for Processing</h2>
              <p className="text-gray-700 mb-4">
                Under the UK General Data Protection Regulation (UK GDPR), we process your personal data on the following legal bases:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li><strong>Consent:</strong> You have given clear consent for us to process your personal data for the specific purpose of obtaining life insurance quotes.</li>
                <li><strong>Legitimate Interests:</strong> Processing is necessary for our legitimate interests in providing and improving our services, provided your interests don't override ours.</li>
                <li><strong>Legal Obligation:</strong> Processing is necessary to comply with legal and regulatory requirements.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Sharing Your Information</h2>
              <p className="text-gray-700 mb-4">
                We share your personal information only in the following circumstances:
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">5.1 Insurance Partners</h3>
              <p className="text-gray-700 mb-4">
                We share your quote request with our panel of trusted insurance advisors and providers who are authorised and regulated by the Financial Conduct Authority (FCA). These partners will use your information to provide you with personalized quotes and advice.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">5.2 Service Providers</h3>
              <p className="text-gray-700 mb-4">
                We may share your information with third-party service providers who assist us in operating our website, conducting our business, or servicing you (e.g., email delivery services, hosting providers, analytics providers).
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">5.3 Legal Requirements</h3>
              <p className="text-gray-700 mb-4">
                We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., court orders, regulatory requirements).
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Data Security</h2>
              <p className="text-gray-700 mb-4">
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Encryption of data in transit and at rest</li>
                <li>Secure server infrastructure</li>
                <li>Regular security assessments</li>
                <li>Access controls and authentication</li>
                <li>Staff training on data protection</li>
              </ul>
              <p className="text-gray-700 mb-4">
                However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee absolute security.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Data Retention</h2>
              <p className="text-gray-700 mb-4">
                We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. Quote data is typically retained for up to 7 years in accordance with financial services regulations.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Your Rights</h2>
              <p className="text-gray-700 mb-4">
                Under UK data protection law, you have the following rights:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li><strong>Right to Access:</strong> Request a copy of the personal data we hold about you</li>
                <li><strong>Right to Rectification:</strong> Request correction of inaccurate or incomplete data</li>
                <li><strong>Right to Erasure:</strong> Request deletion of your personal data in certain circumstances</li>
                <li><strong>Right to Restrict Processing:</strong> Request that we limit how we use your data</li>
                <li><strong>Right to Data Portability:</strong> Receive your data in a portable format</li>
                <li><strong>Right to Object:</strong> Object to certain types of processing</li>
                <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time where we rely on consent</li>
              </ul>
              <p className="text-gray-700 mb-4">
                To exercise any of these rights, please contact us at: <a href="mailto:privacy@inshureit.com" className="text-primary hover:underline">privacy@inshureit.com</a>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Cookies</h2>
              <p className="text-gray-700 mb-4">
                Our website uses cookies to enhance your browsing experience. Cookies are small text files stored on your device. For detailed information about the cookies we use and your choices, please see our <Link to="/cookie-policy" className="text-primary hover:underline">Cookie Policy</Link>.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Third-Party Links</h2>
              <p className="text-gray-700 mb-4">
                Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to read the privacy policies of any third-party sites you visit.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Children's Privacy</h2>
              <p className="text-gray-700 mb-4">
                Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you become aware that a child has provided us with personal data, please contact us.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Changes to This Privacy Policy</h2>
              <p className="text-gray-700 mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-2"><strong>Limit Unlimited Technologies Ltd</strong></p>
                <p className="text-gray-700 mb-2">Email: <a href="mailto:privacy@inshureit.com" className="text-primary hover:underline">privacy@inshureit.com</a></p>
                <p className="text-gray-700 mb-2">Phone: 020 1234 5678</p>
                <p className="text-gray-700">Address: 123 Business Street, London, EC1A 1BB, United Kingdom</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Complaints</h2>
              <p className="text-gray-700 mb-4">
                If you believe your data protection rights have been breached, you have the right to lodge a complaint with the Information Commissioner's Office (ICO):
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-2"><strong>Information Commissioner's Office</strong></p>
                <p className="text-gray-700 mb-2">Website: <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.ico.org.uk</a></p>
                <p className="text-gray-700">Helpline: 0303 123 1113</p>
              </div>
            </section>
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
