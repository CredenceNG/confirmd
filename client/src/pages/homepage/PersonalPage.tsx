import { motion } from 'framer-motion'
import React from 'react'
import { Link } from 'react-router-dom'

import { page } from '../../FramerAnimations'
import { Breadcrumb } from '../../components/Breadcrumb'
import { Footer } from '../../components/Footer'
import { Header } from '../../components/Header'
import { useTitle } from '../../hooks/useTitle'
import { basePath } from '../../utils/BasePath'

export const PersonalPage: React.FC = () => {
  useTitle('Confirmed Person - Personal Solutions')

  return (
    <motion.div
      className="min-h-screen flex flex-col bg-white dark:bg-blue-900"
      variants={page}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <Header activePage="personal" />
      <Breadcrumb items={[{ label: 'Personal', path: '/', active: true }]} />

      {/* Hero Section */}
      <section className="pt-12 pb-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-6">
                Your <span className="text-orange-600">digital identity</span>, under your control
              </h1>
              <p className="text-lg text-blue-800 mb-8 leading-relaxed">
                Securely manage your digital credentials, share only what you want, and take control of your personal
                information. With Confirmed Person, your digital identity is always in your hands.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/demo"
                  className="px-8 py-3 bg-orange-600 text-white text-center rounded-full hover:bg-orange-700 transition font-semibold shadow-md"
                >
                  Get Started
                </Link>
                <Link
                  to="/how-it-works"
                  className="px-8 py-3 border-2 border-blue-800 text-blue-800 text-center rounded-full hover:bg-blue-50 transition font-semibold"
                >
                  How It Works
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 md:pl-10">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <div className="bg-blue-50 rounded-lg p-8 flex justify-center items-center">
                  <img src="/confirmd-300.png" alt="Confirmed Person Logo" className="max-w-full h-auto" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-800">
            Features for <span className="text-orange-600">individuals</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
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
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-blue-800">Secure Digital Wallet</h3>
              <p className="text-blue-800">
                Store all your digital credentials in one secure place with end-to-end encryption and biometric
                protection.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
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
                    d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-blue-800">Selective Disclosure</h3>
              <p className="text-blue-800">
                Share only the specific information needed, not your entire profile. Control exactly what others can see
                about you.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
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
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-blue-800">Credential Management</h3>
              <p className="text-blue-800">
                Easily manage all your credentials - from ID cards and certificates to licenses and memberships - in one
                place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 px-4 bg-blue-50 border-t border-gray-200">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-4 text-blue-800">How people use Confirmed Person</h2>
          <p className="text-center text-blue-800 mb-12 max-w-2xl mx-auto">
            From everyday convenience to important life events, your digital identity makes everything easier
          </p>

          <div className="space-y-12">
            {/* Use Case 1 */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3 bg-blue-100 md:h-auto p-8 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-24 w-24 text-blue-800"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                </div>
                <div className="p-8 md:w-2/3">
                  <h3 className="text-2xl font-bold text-blue-800 mb-3">Faster Financial Services</h3>
                  <p className="text-blue-800 mb-4">
                    Open new bank accounts, apply for loans, or set up investment accounts in minutes instead of days.
                    Your verified identity and credentials accelerate financial processes that used to take weeks.
                  </p>
                  <div className="flex items-center">
                    <div className="text-blue-600 font-medium mr-4">Compatible with:</div>
                    <div className="flex space-x-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Major Banks</span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Credit Unions</span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Investment Firms</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Use Case 2 */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3 bg-orange-100 md:h-auto p-8 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-24 w-24 text-orange-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <div className="p-8 md:w-2/3">
                  <h3 className="text-2xl font-bold text-blue-800 mb-3">Simplified Healthcare</h3>
                  <p className="text-blue-800 mb-4">
                    Access medical services with ease by securely sharing your health records, insurance information,
                    and ID verification. No more clipboard forms or carrying multiple cards.
                  </p>
                  <div className="flex items-center">
                    <div className="text-blue-600 font-medium mr-4">Compatible with:</div>
                    <div className="flex space-x-2">
                      <span className="px-3 py-1 bg-orange-100 text-blue-800 rounded-full text-sm">
                        Major Hospitals
                      </span>
                      <span className="px-3 py-1 bg-orange-100 text-blue-800 rounded-full text-sm">
                        Insurance Providers
                      </span>
                      <span className="px-3 py-1 bg-orange-100 text-blue-800 rounded-full text-sm">Clinics</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Use Case 3 */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3 bg-teal-100 md:h-auto p-8 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-24 w-24 text-teal-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="p-8 md:w-2/3">
                  <h3 className="text-2xl font-bold text-blue-800 mb-3">Seamless Employment Verification</h3>
                  <p className="text-blue-800 mb-4">
                    Job applications and background checks happen in minutes, not weeks. Share education credentials,
                    employment history, and professional certifications instantly with potential employers.
                  </p>
                  <div className="flex items-center">
                    <div className="text-blue-600 font-medium mr-4">Compatible with:</div>
                    <div className="flex space-x-2">
                      <span className="px-3 py-1 bg-teal-100 text-blue-800 rounded-full text-sm">Major Employers</span>
                      <span className="px-3 py-1 bg-teal-100 text-blue-800 rounded-full text-sm">
                        Staffing Agencies
                      </span>
                      <span className="px-3 py-1 bg-teal-100 text-blue-800 rounded-full text-sm">Job Platforms</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-800">How it works</h2>

          <div className="grid md:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mb-4 h-full">
                <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-3 text-blue-800">Create Your Account</h3>
                <p className="text-blue-800">
                  Download the Confirmed Person app and set up your secure digital identity with basic information.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/4 right-[-25px] transform translate-y-1/4 z-10">
                <svg width="50" height="24" xmlns="http://www.w3.org/2000/svg" fill="none">
                  <path d="M0 12H40M40 12L30 6M40 12L30 18" stroke="#2563EB" strokeWidth="2" />
                </svg>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mb-4 h-full">
                <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-3 text-blue-800">Add Your Credentials</h3>
                <p className="text-blue-800">
                  Scan or connect your existing IDs, licenses, and qualifications to build your digital wallet.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/4 right-[-25px] transform translate-y-1/4 z-10">
                <svg width="50" height="24" xmlns="http://www.w3.org/2000/svg" fill="none">
                  <path d="M0 12H40M40 12L30 6M40 12L30 18" stroke="#2563EB" strokeWidth="2" />
                </svg>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mb-4 h-full">
                <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-3 text-blue-800">Verify Your Information</h3>
                <p className="text-blue-800">
                  Get your credentials verified through our trusted network of verifiers and issuers.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/4 right-[-25px] transform translate-y-1/4 z-10">
                <svg width="50" height="24" xmlns="http://www.w3.org/2000/svg" fill="none">
                  <path d="M0 12H40M40 12L30 6M40 12L30 18" stroke="#2563EB" strokeWidth="2" />
                </svg>
              </div>
            </div>

            {/* Step 4 */}
            <div>
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mb-4 h-full">
                <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                  4
                </div>
                <h3 className="text-xl font-semibold mb-3 text-blue-800">Use Your Digital ID</h3>
                <p className="text-blue-800">
                  Share your verified information securely with businesses and services that request it.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              to="/demo"
              className="inline-block px-8 py-3 bg-orange-600 text-white font-semibold rounded-full hover:bg-orange-500 transition shadow-md"
            >
              Try It Now
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-blue-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-800">What our users say</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 font-bold text-xl mr-4">
                  S
                </div>
                <div>
                  <h4 className="font-semibold text-blue-800">Sarah T.</h4>
                  <p className="text-blue-600 text-sm">Freelance Designer</p>
                </div>
              </div>
              <p className="text-blue-800 italic">
                "I used to spend hours filling out paperwork for new clients. Now I just share my verified credentials
                with a tap. It's saved me countless hours!"
              </p>
              <div className="mt-4 flex text-orange-500">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold text-xl mr-4">
                  M
                </div>
                <div>
                  <h4 className="font-semibold text-blue-800">Michael R.</h4>
                  <p className="text-blue-600 text-sm">Recent Graduate</p>
                </div>
              </div>
              <p className="text-blue-800 italic">
                "Job hunting was so much smoother with Confirmed Person. I could instantly verify my degree and
                certificates, which impressed recruiters."
              </p>
              <div className="mt-4 flex text-orange-500">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-bold text-xl mr-4">
                  J
                </div>
                <div>
                  <h4 className="font-semibold text-blue-800">Jennifer L.</h4>
                  <p className="text-blue-600 text-sm">Healthcare Professional</p>
                </div>
              </div>
              <p className="text-blue-800 italic">
                "As someone who works at multiple hospitals, managing all my medical credentials was a nightmare until I
                started using Confirmed Person."
              </p>
              <div className="mt-4 flex text-orange-500">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-blue-800">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Take control of your digital identity today</h2>
          <p className="text-xl mb-8 text-white">
            Join millions of individuals who've simplified their digital lives with Confirmed Person.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/demo"
              className="inline-block px-8 py-3 bg-orange-600 text-white font-semibold rounded-full hover:bg-orange-500 transition shadow-lg"
            >
              Get Started
            </Link>
            <Link
              to="/contact"
              className="inline-block px-8 py-3 bg-white text-blue-800 font-semibold rounded-full hover:bg-gray-100 transition shadow-lg"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </motion.div>
  )
}
