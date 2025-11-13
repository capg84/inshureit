import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface FAQItemProps {
  question: string;
  answer: string;
}

function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 px-6 flex justify-between items-center hover:bg-gray-50 transition-colors text-left"
      >
        <h3 className="text-lg font-semibold text-gray-900 pr-4">{question}</h3>
        <ChevronDown
          className={`w-5 h-5 text-primary flex-shrink-0 transition-transform ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className="px-6 pb-5">
          <p className="text-gray-700 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function HelpPage() {
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
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Centre</h1>
          <p className="text-xl text-gray-600">
            Find answers to commonly asked questions about our service and life insurance
          </p>
        </div>

        {/* General Questions */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="bg-primary-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">General Questions</h2>
          </div>
          <div>
            <FAQItem
              question="What is InshureIt?"
              answer="InshureIt is a free life insurance comparison service. We connect you with FCA-regulated insurance advisors who can provide personalized quotes from leading insurance providers. We simplify the process of finding the right life insurance coverage for you and your family."
            />
            <FAQItem
              question="Is InshureIt's service really free?"
              answer="Yes, absolutely! Our service is completely free for you. We receive a commission from our insurance partners when you purchase a policy, but this doesn't affect the price you pay. There are no hidden fees or charges."
            />
            <FAQItem
              question="How long does it take to get a quote?"
              answer="Most customers are contacted within 1 hour during business hours (Monday-Friday, 9am-6pm). One of our trusted partner advisors will reach out to discuss your needs and provide personalized quotes. Outside business hours, you'll typically hear from us the next working day."
            />
            <FAQItem
              question="Am I obligated to buy after getting a quote?"
              answer="Not at all. There's no obligation whatsoever. You're free to review the quotes, ask questions, take your time, and only proceed if you find a policy that's right for you. Our service is designed to help you make an informed decision at your own pace."
            />
          </div>
        </div>

        {/* About Life Insurance */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="bg-primary-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">About Life Insurance</h2>
          </div>
          <div>
            <FAQItem
              question="What is life insurance?"
              answer="Life insurance is a financial product that pays out a lump sum to your beneficiaries if you pass away during the policy term. It's designed to provide financial security for your loved ones, helping them cover expenses like mortgage payments, living costs, debts, and funeral expenses."
            />
            <FAQItem
              question="What's the difference between Solo and Joint life insurance?"
              answer="Solo life insurance covers one person and pays out when that person dies. Joint life insurance covers two people (typically couples) and usually pays out on the first death. Joint policies are often more affordable than two separate policies, making them popular with couples who have shared financial commitments like a mortgage."
            />
            <FAQItem
              question="How much life insurance do I need?"
              answer="The amount of life insurance you need depends on your individual circumstances. Consider factors like outstanding mortgage balance, other debts, your family's living expenses, children's education costs, and funeral expenses. A general rule is to cover 10-12 times your annual income, but your advisor can help you determine the right amount for your situation."
            />
            <FAQItem
              question="What is term life insurance?"
              answer="Term life insurance provides coverage for a specific period (the 'term'), typically ranging from 5 to 40 years. If you die during this term, your beneficiaries receive a payout. If you survive the term, the policy ends with no payout. Term life insurance is generally more affordable than whole-of-life insurance."
            />
          </div>
        </div>

        {/* Quote Process */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="bg-primary-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Quote Process</h2>
          </div>
          <div>
            <FAQItem
              question="What information do I need to provide?"
              answer="To get accurate quotes, we'll need basic information including your name, date of birth, contact details (email and phone), postcode, smoking status, and your desired coverage amount and period. For joint policies, we'll also need your partner's details. All information is kept confidential and secure."
            />
            <FAQItem
              question="Why do you need my smoking status?"
              answer="Smoking status is a significant factor in life insurance pricing because it affects life expectancy and health risks. Smokers typically pay higher premiums than non-smokers. Being honest about your smoking status is crucial - providing inaccurate information could invalidate your policy."
            />
            <FAQItem
              question="What happens after I submit my details?"
              answer="After submitting your quote request, you'll receive an immediate confirmation email. Your details are then securely shared with our panel of FCA-regulated insurance advisors. An advisor will contact you (usually within an hour) to discuss your needs, answer questions, and provide personalized quotes from multiple insurance providers."
            />
            <FAQItem
              question="Can I change my details after submitting?"
              answer="Yes, when an advisor contacts you, you can update or correct any information. It's important that all details are accurate before finalizing any policy, as incorrect information could affect your coverage or invalidate claims."
            />
          </div>
        </div>

        {/* Security & Privacy */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="bg-primary-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Security & Privacy</h2>
          </div>
          <div>
            <FAQItem
              question="How secure is my information?"
              answer="We take data security very seriously. Your information is protected using industry-leading encryption and security measures. All data is transmitted securely and stored in protected servers. We only share your information with FCA-regulated insurance advisors who are bound by strict data protection regulations."
            />
            <FAQItem
              question="Who will have access to my information?"
              answer="Your information is shared only with our panel of trusted, FCA-regulated insurance advisors who need it to provide you with quotes. We never sell your data to third parties for marketing purposes. For full details, please see our Privacy Policy."
            />
            <FAQItem
              question="Will I receive spam emails or calls?"
              answer="No. We only share your information with insurance advisors for the purpose of providing you with quotes. You may be contacted by advisors to discuss your quote request and provide quotes, but we don't sell your information for general marketing purposes."
            />
          </div>
        </div>

        {/* Working with Advisors */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="bg-primary-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Working with Advisors</h2>
          </div>
          <div>
            <FAQItem
              question="Are your partner advisors qualified?"
              answer="Yes, all our partner advisors are authorised and regulated by the Financial Conduct Authority (FCA). They are qualified professionals with expertise in life insurance. They undergo regular training and must meet strict regulatory standards to maintain their authorization."
            />
            <FAQItem
              question="What can I expect when an advisor contacts me?"
              answer="Your advisor will introduce themselves, confirm your details, discuss your life insurance needs, explain different policy options, and provide personalized quotes from multiple providers. They'll answer any questions you have and help you understand the differences between policies. There's no pressure to make an immediate decision."
            />
            <FAQItem
              question="Do all advisors provide financial advice?"
              answer="Not all our partners provide an advised service. Some offer 'execution-only' services where they facilitate the purchase but don't provide personal recommendations. Your advisor will clarify the type of service they provide when they contact you."
            />
          </div>
        </div>

        {/* Technical Support */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="bg-primary-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Technical Support</h2>
          </div>
          <div>
            <FAQItem
              question="I'm having trouble submitting the quote form"
              answer="Please ensure all required fields are completed and that your information is in the correct format (e.g., valid email address, UK postcode). If you continue to experience issues, try refreshing the page or using a different browser. You can also contact our support team for assistance."
            />
            <FAQItem
              question="I didn't receive a confirmation email"
              answer="Please check your spam/junk folder as automated emails sometimes end up there. If you still can't find it, contact us and we'll verify your submission. Make sure to add our email address to your contacts to ensure future emails reach your inbox."
            />
            <FAQItem
              question="Which browsers do you support?"
              answer="Our website works best on modern browsers including Google Chrome, Mozilla Firefox, Safari, and Microsoft Edge. We recommend keeping your browser updated to the latest version for the best experience and security."
            />
          </div>
        </div>

        {/* Still Need Help? */}
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Still Need Help?</h2>
          <p className="text-gray-700 mb-6">
            Can't find the answer you're looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-primary inline-block">
              Contact Us
            </Link>
            <Link to="/" className="btn-secondary inline-block">
              Get a Quote
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
