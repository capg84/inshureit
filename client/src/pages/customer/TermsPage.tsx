import { Link } from 'react-router-dom';

export default function TermsPage() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms & Conditions</h1>
          <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-700 mb-4">
                Welcome to InshureIt, a trading name of Limit Unlimited Technologies Ltd ("we", "us", or "our"). These Terms and Conditions ("Terms") govern your use of our website and services. By accessing or using our website, you agree to be bound by these Terms.
              </p>
              <p className="text-gray-700 mb-4">
                Please read these Terms carefully before using our services. If you do not agree with any part of these Terms, you must not use our website or services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. About Our Service</h2>
              <p className="text-gray-700 mb-4">
                InshureIt is an introducer service that connects customers seeking life insurance with our panel of insurance advisors and providers. We do not provide financial advice directly, nor do we underwrite insurance policies ourselves.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">2.1 Our Role</h3>
              <p className="text-gray-700 mb-4">We act as an intermediary to:</p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Collect your quote requirements</li>
                <li>Share your information with our panel of FCA-regulated insurance advisors</li>
                <li>Facilitate contact between you and insurance specialists</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">2.2 Partner Advisors</h3>
              <p className="text-gray-700 mb-4">
                Our partner advisors are authorised and regulated by the Financial Conduct Authority (FCA). Not all partners provide an advised service. The insurance policy contract will be between you and the insurance provider, not with InshureIt.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Use of Our Website</h2>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">3.1 Eligibility</h3>
              <p className="text-gray-700 mb-4">
                You must be at least 18 years old and a resident of the United Kingdom to use our services. By using our website, you represent and warrant that you meet these requirements.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">3.2 Acceptable Use</h3>
              <p className="text-gray-700 mb-4">You agree to use our website only for lawful purposes and in accordance with these Terms. You must not:</p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Provide false, inaccurate, or misleading information</li>
                <li>Use the website in any way that violates applicable laws or regulations</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt the website or servers</li>
                <li>Use automated systems or software to extract data from the website</li>
                <li>Transmit any viruses, malware, or harmful code</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Quote Requests</h2>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">4.1 Information Accuracy</h3>
              <p className="text-gray-700 mb-4">
                You are responsible for ensuring that all information you provide in your quote request is accurate, complete, and truthful. Inaccurate information may affect the quotes you receive and could invalidate insurance policies.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">4.2 No Guarantee of Quotes</h3>
              <p className="text-gray-700 mb-4">
                Submitting a quote request does not guarantee that you will receive quotes or be offered insurance coverage. Insurance providers may decline to offer coverage based on their underwriting criteria.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">4.3 No Obligation</h3>
              <p className="text-gray-700 mb-4">
                Requesting a quote through our service creates no obligation on your part to purchase insurance. You are free to decline any quotes or offers you receive.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Fees and Commission</h2>
              <p className="text-gray-700 mb-4">
                Our service is free for customers. We do not charge you any fees for using our website or receiving quotes. We may receive commission from our insurance partners when you purchase a policy through one of our introduced advisors. This commission does not affect the price you pay for your insurance.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Data Protection and Privacy</h2>
              <p className="text-gray-700 mb-4">
                We are committed to protecting your privacy and personal data. By using our services, you consent to the collection, use, and sharing of your information as described in our <Link to="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link>. This includes sharing your information with our panel of insurance advisors.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Intellectual Property</h2>
              <p className="text-gray-700 mb-4">
                All content on this website, including text, graphics, logos, images, and software, is the property of Limit Unlimited Technologies Ltd or its content suppliers and is protected by UK and international copyright laws.
              </p>
              <p className="text-gray-700 mb-4">
                You may view and print content from the website for personal, non-commercial use only. You may not reproduce, distribute, modify, or create derivative works without our prior written consent.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Third-Party Links and Services</h2>
              <p className="text-gray-700 mb-4">
                Our website may contain links to third-party websites, including those of our insurance partners. We are not responsible for the content, privacy practices, or terms of use of third-party websites. Your use of third-party websites is at your own risk.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Disclaimers and Limitations of Liability</h2>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">9.1 No Financial Advice</h3>
              <p className="text-gray-700 mb-4">
                We do not provide financial, legal, or tax advice. The information on our website is for general information purposes only and should not be relied upon as professional advice. You should seek independent professional advice before making any financial decisions.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">9.2 Website Availability</h3>
              <p className="text-gray-700 mb-4">
                We strive to ensure our website is available at all times, but we do not guarantee uninterrupted access. The website may be unavailable due to maintenance, technical issues, or circumstances beyond our control.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">9.3 Information Accuracy</h3>
              <p className="text-gray-700 mb-4">
                While we make every effort to ensure the accuracy of information on our website, we do not warrant that the content is complete, accurate, or up-to-date. You should verify any information before relying on it.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">9.4 Limitation of Liability</h3>
              <p className="text-gray-700 mb-4">
                To the fullest extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our website or services. Our total liability shall not exceed £100.
              </p>
              <p className="text-gray-700 mb-4">
                Nothing in these Terms excludes or limits our liability for death or personal injury caused by negligence, fraud, or any other liability that cannot be excluded under UK law.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Indemnification</h2>
              <p className="text-gray-700 mb-4">
                You agree to indemnify and hold harmless Limit Unlimited Technologies Ltd, its directors, employees, and partners from any claims, damages, losses, liabilities, and expenses arising from your use of our website or services, or your breach of these Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to Terms</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to modify these Terms at any time. We will notify you of any material changes by posting the updated Terms on this page and updating the "Last updated" date. Your continued use of the website after changes constitutes acceptance of the new Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Termination</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to suspend or terminate your access to our website at any time, without notice, for any reason, including if we believe you have breached these Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Governing Law and Jurisdiction</h2>
              <p className="text-gray-700 mb-4">
                These Terms are governed by and construed in accordance with the laws of England and Wales. Any disputes arising from these Terms or your use of our website shall be subject to the exclusive jurisdiction of the courts of England and Wales.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Severability</h2>
              <p className="text-gray-700 mb-4">
                If any provision of these Terms is found to be invalid or unenforceable by a court, the remaining provisions shall continue in full force and effect.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Entire Agreement</h2>
              <p className="text-gray-700 mb-4">
                These Terms, together with our Privacy Policy and Cookie Policy, constitute the entire agreement between you and Limit Unlimited Technologies Ltd regarding your use of our website and services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">16. Contact Information</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about these Terms, please contact us:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-2"><strong>Limit Unlimited Technologies Ltd</strong></p>
                <p className="text-gray-700 mb-2">Email: <a href="mailto:info@inshureit.com" className="text-primary hover:underline">info@inshureit.com</a></p>
                <p className="text-gray-700 mb-2">Phone: 020 1234 5678</p>
                <p className="text-gray-700">Address: 1 Bolton Rise, Tipton, DY4 0WE, United Kingdom</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">17. Complaints</h2>
              <p className="text-gray-700 mb-4">
                If you have a complaint about our service, please contact us using the details above. We will investigate and respond to your complaint promptly. If you remain dissatisfied, you may refer your complaint to the relevant regulatory authority or ombudsman service.
              </p>
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
