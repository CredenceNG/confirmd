import { motion } from 'framer-motion'
import React from 'react'
import { Link } from 'react-router-dom'

import { page } from '../../FramerAnimations'
import { Breadcrumb } from '../../components/Breadcrumb'
import { Footer } from '../../components/Footer'
import { Header } from '../../components/Header'
import { useTitle } from '../../hooks/useTitle'
import { basePath } from '../../utils/BasePath'

export const BusinessPage: React.FC = () => {
  useTitle('Confirmed Person - Business Digital Identity Solutions')

  return (
    <motion.div
      className="min-h-screen flex flex-col bg-white dark:bg-blue-900"
      variants={page}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <Header activePage="business" />
      <Breadcrumb items={[{ label: 'Business', path: '/business', active: true }]} />

      {/* Hero Section - White background with blue text */}
      <section className="pt-12 pb-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-6">
                Trusted Digital Credentials <span className="text-orange-600">for your business</span>
              </h1>
              <p className="text-lg text-blue-800 mb-8 leading-relaxed">
                Transform your business operations with secure Digital Credential solutions. Reduce fraud, streamline
                onboarding, and build customer trust with verifiable credentials.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/demo"
                  className="px-8 py-3 bg-orange-600 text-white text-center rounded-full hover:bg-orange-700 transition font-semibold shadow-md"
                >
                  Contact Sales
                </Link>
                <Link
                  to="/learn-more"
                  className="px-8 py-3 border-2 border-blue-800 text-blue-800 text-center rounded-full hover:bg-blue-50 transition font-semibold"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="md:w-1/3 md:pl-10">
              {/* <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"> */}
              {/* <div className="bg-blue-50 rounded-lg p-8 flex justify-center items-center"> */}
              <img src="/confirmd-real-mock.png" alt="Digital ID" className="max-w-full h-auto" />
              {/* </div> */}
              {/* </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Business Solutions Section */}
      <section className="py-16 bg-white border-t border-b border-gray-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-800">
            Business <span className="text-orange-600">solutions</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Solution 1 */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-teal-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-blue-800">Customer Onboarding</h3>
              <p className="text-blue-800">
                Streamline the KYC process and reduce onboarding times by up to 60% with verified digital credentials.
              </p>
            </div>

            {/* Solution 2 */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-orange-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-blue-800">Fraud Prevention</h3>
              <p className="text-blue-800">
                Reduce fraud by up to 90% with cryptographically secured identity verification that can't be faked.
              </p>
            </div>

            {/* Solution 3 */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-800"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-blue-800">Regulatory Compliance</h3>
              <p className="text-blue-800">
                Stay compliant with evolving regulations like GDPR, KYC, and AML with our comprehensive verification
                system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Solutions Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-4 text-blue-800">Industry solutions</h2>
          <p className="text-center text-blue-800 mb-12 max-w-2xl mx-auto">
            Tailored digital identity solutions for various industries
          </p>

          <div className="grid md:grid-cols-2 gap-x-8 gap-y-12">
            {/* Industry 1 */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold mb-4 text-blue-800 border-b border-gray-200 pb-2">
                Financial Services
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-teal-100 rounded-full flex-shrink-0 flex items-center justify-center mr-3 mt-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-teal-700"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="text-blue-800">Faster customer onboarding with KYC-compliant verification</p>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-teal-100 rounded-full flex-shrink-0 flex items-center justify-center mr-3 mt-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-teal-700"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="text-blue-800">Secure transaction authentication with biometric verification</p>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-teal-100 rounded-full flex-shrink-0 flex items-center justify-center mr-3 mt-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-teal-700"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="text-blue-800">Reduced fraud and better regulatory compliance</p>
                </li>
              </ul>
            </div>

            {/* Industry 2 */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold mb-4 text-blue-800 border-b border-gray-200 pb-2">Healthcare</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex-shrink-0 flex items-center justify-center mr-3 mt-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-blue-800"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="text-blue-800">Secure patient identity verification and record access</p>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex-shrink-0 flex items-center justify-center mr-3 mt-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-blue-800"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="text-blue-800">HIPAA-compliant credential sharing between providers</p>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex-shrink-0 flex items-center justify-center mr-3 mt-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-blue-800"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="text-blue-800">Streamlined insurance verification and claims processing</p>
                </li>
              </ul>
            </div>

            {/* Industry 3 */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold mb-4 text-blue-800 border-b border-gray-200 pb-2">E-commerce</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-orange-100 rounded-full flex-shrink-0 flex items-center justify-center mr-3 mt-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-orange-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="text-blue-800">One-click secure customer authentication</p>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-orange-100 rounded-full flex-shrink-0 flex items-center justify-center mr-3 mt-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-orange-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="text-blue-800">Reduced cart abandonment with streamlined checkout</p>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-orange-100 rounded-full flex-shrink-0 flex items-center justify-center mr-3 mt-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-orange-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="text-blue-800">Fraud prevention for card-not-present transactions</p>
                </li>
              </ul>
            </div>

            {/* Industry 4 */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold mb-4 text-blue-800 border-b border-gray-200 pb-2">Real Estate</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-teal-100 rounded-full flex-shrink-0 flex items-center justify-center mr-3 mt-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-teal-700"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="text-blue-800">Digital verification for tenants and buyers</p>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-teal-100 rounded-full flex-shrink-0 flex items-center justify-center mr-3 mt-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-teal-700"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="text-blue-800">Secure digital contracts and transactions</p>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-teal-100 rounded-full flex-shrink-0 flex items-center justify-center mr-3 mt-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-teal-700"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="text-blue-800">Streamlined property inspection and documentation</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-800">Case Studies</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Case Study 1 */}
            <div className="bg-blue-50 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-blue-800"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-800 text-xl">First National Bank</h4>
                  <p className="text-blue-600">Financial Services</p>
                </div>
              </div>
              <p className="text-blue-800 mb-4">
                Reduced customer onboarding time by 75% and cut fraud losses by 60% in the first year of implementation.
              </p>
              <Link
                to="/case-studies/fnb"
                className="text-orange-600 font-medium hover:text-orange-700 flex items-center"
              >
                Read Case Study
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>

            {/* Case Study 2 */}
            <div className="bg-orange-50 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-orange-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-800 text-xl">ShopEasy</h4>
                  <p className="text-blue-600">E-commerce</p>
                </div>
              </div>
              <p className="text-blue-800 mb-4">
                Increased checkout completion rates by 35% and reduced customer support tickets by 42% with simplified
                identity verification.
              </p>
              <Link
                to="/case-studies/shopeasy"
                className="text-orange-600 font-medium hover:text-orange-700 flex items-center"
              >
                Read Case Study
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-blue-800">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Ready to transform your business?</h2>
          <p className="text-xl mb-8 text-white">
            Join industry leaders who trust Confirmed Person for their Customer Credential verification needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/demo"
              className="inline-block px-8 py-3 bg-orange-600 text-white font-semibold rounded-full hover:bg-orange-500 transition shadow-lg"
            >
              Request Demo
            </Link>
            <Link
              to="/contact"
              className="inline-block px-8 py-3 bg-white text-blue-800 font-semibold rounded-full hover:bg-gray-100 transition shadow-lg"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </motion.div>
  )
}
