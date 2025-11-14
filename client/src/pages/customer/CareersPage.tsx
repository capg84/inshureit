import { Link } from 'react-router-dom';

export default function CareersPage() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Careers at InshureIt</h1>

          <div className="prose prose-lg max-w-none">
            {/* Introduction */}
            <section className="mb-10">
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Thank you for your interest in joining the InshureIt team. We're a forward-thinking insurance technology company dedicated to making life insurance accessible and straightforward for everyone.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                At InshureIt, we believe in innovation, customer service excellence, and creating a positive impact in people's lives by helping them secure their future and protect their loved ones.
              </p>
            </section>

            {/* Current Opportunities */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Current Opportunities</h2>

              <div className="bg-blue-50 border-l-4 border-primary p-6 rounded-r-lg">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Current Openings</h3>
                    <p className="text-gray-700">
                      We currently do not have any open positions. However, we're always growing and looking for talented individuals to join our team.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Why Work With Us */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Work With Us?</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Innovation</h3>
                  </div>
                  <p className="text-gray-700">
                    Work with cutting-edge technology to transform the insurance industry and improve customer experience.
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Team Culture</h3>
                  </div>
                  <p className="text-gray-700">
                    Join a supportive team that values collaboration, professional growth, and work-life balance.
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Impact</h3>
                  </div>
                  <p className="text-gray-700">
                    Make a real difference by helping families secure their financial future and protect what matters most.
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Growth</h3>
                  </div>
                  <p className="text-gray-700">
                    Develop your skills and advance your career with ongoing training and development opportunities.
                  </p>
                </div>
              </div>
            </section>

            {/* Future Opportunities */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Stay Connected</h2>
              <p className="text-gray-700 mb-4">
                Even though we don't have any immediate openings, we encourage you to check back regularly or reach out to us if you're interested in future opportunities.
              </p>
              <p className="text-gray-700 mb-6">
                We're particularly interested in hearing from professionals with experience in:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                <li>Insurance and financial services</li>
                <li>Customer service and client relations</li>
                <li>Software development and technology</li>
                <li>Digital marketing and business development</li>
                <li>Operations and administration</li>
              </ul>
            </section>

            {/* Contact for Future Opportunities */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Get in Touch</h2>
              <p className="text-gray-700 mb-6">
                If you're interested in joining our team in the future, we'd love to hear from you. Please send your CV and a brief cover letter to:
              </p>

              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-2"><strong>Limit Unlimited Technologies Ltd</strong></p>
                <p className="text-gray-700 mb-2">
                  Email: <a href="mailto:info@inshureit.com" className="text-primary hover:underline">info@inshureit.com</a>
                </p>
                <p className="text-gray-700 mb-2">Phone: 020 1234 5678</p>
                <p className="text-gray-700">Address: 1 Bolton Rise, Tipton, DY4 0WE, United Kingdom</p>
              </div>
            </section>

            {/* Equal Opportunities Statement */}
            <section className="bg-primary-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Equal Opportunities Employer</h3>
              <p className="text-gray-700">
                InshureIt is an equal opportunities employer. We celebrate diversity and are committed to creating an inclusive environment for all employees. We welcome applications from all qualified candidates regardless of race, gender, age, religion, identity, or experience.
              </p>
            </section>
          </div>

          {/* Back to Home */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <Link to="/" className="btn-primary inline-block">
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
