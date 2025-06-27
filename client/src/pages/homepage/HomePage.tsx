import { motion } from 'framer-motion'
import React from 'react'
import { Link } from 'react-router-dom'

import { page } from '../../FramerAnimations'
import { Breadcrumb } from '../../components/Breadcrumb'
import { Footer } from '../../components/Footer'
import { Header } from '../../components/Header'
import { useTitle } from '../../hooks/useTitle'

export const HomePage: React.FC = () => {
  useTitle('Confirmd - Last Mile Digital Solutions')

  return (
    <motion.div
      className="min-h-screen flex flex-col bg-white dark:bg-blue-900"
      variants={page}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <Header activePage="personal" />
      <Breadcrumb items={[{ label: 'Home', path: '/', active: true }]} />

      {/* Hero Section - White background with blue text */}
      <section className="pt-12 pb-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-6">
                Simplified way to <span className="text-orange-600">confirm</span> data about yourself, digitally.
              </h1>
              <p className="text-lg text-blue-800 mb-8 leading-relaxed">
                Securely manage your digital credentials, control your personal data, and prove who you are digitally
                with confidence.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/demo"
                  className="px-8 py-3 bg-orange-600 text-white text-center rounded-full hover:bg-orange-700 transition font-semibold shadow-md"
                >
                  Try Our Demo
                </Link>
                <Link
                  to="/confirmd"
                  className="px-8 py-3 border-2 border-blue-800 text-blue-800 text-center rounded-full hover:bg-blue-50 transition font-semibold"
                >
                  Get Confirmed
                </Link>
              </div>
            </div>
            <div className="md:w-2/5 md:pl-10">
              {/* <div className="bg-blue-50 rounded-xl shadow-lg border border-gray-200 p-6"> */}
              {/* <div className="bg-blue-50 rounded-lg p-8 flex justify-center items-center"> */}
              <img src="/confirmd-colord.png" alt="Digital ID" className="max-w-full h-auto" />
              {/* </div> */}
              {/* </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - White background with blue text */}
      <section className="py-16 bg-white border-t border-b border-gray-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-800">
            Why choose <span className="text-orange-600">Confirmed Person</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
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
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-blue-800">Secure & Private</h3>
              <p className="text-blue-800">
                Your data stays on your device. You control what information you share and with whom.
              </p>
            </div>

            {/* Feature 2 */}
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
              <h3 className="text-xl font-semibold mb-3 text-blue-800">Verified Credentials</h3>
              <p className="text-blue-800">
                Easily prove your identity online with cryptographically secure digital credentials.
              </p>
            </div>

            {/* Feature 3 */}
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
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-blue-800">Quick & Easy</h3>
              <p className="text-blue-800">
                Verify your identity in seconds, not hours. No more lengthy forms or physical documents.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section - White background with blue text */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-4 text-blue-800">How it works</h2>
          <p className="text-center text-blue-800 mb-12 max-w-2xl mx-auto">
            Confirmed Person makes managing your Digital Credentials simple and intuitive
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center text-white text-xl font-bold mb-4 shadow-md">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3 text-blue-800">Download the app</h3>
              <p className="text-blue-800">
                Get started with our secure Digital Trust Wallet app now available on iOS and Android.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center text-white text-xl font-bold mb-4 shadow-md">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3 text-blue-800">Verify your identity</h3>
              <p className="text-blue-800">
                Complete a simple verification process to receive your Digital Credentials.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center text-white text-xl font-bold mb-4 shadow-md">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3 text-blue-800">Use anywhere</h3>
              <p className="text-blue-800">
                Securely share your Confirmed Credentials with private and govt services without hassles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Members & Partners */}
      <section className="py-16 px-4 bg-white border-t border-gray-200">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-800">Our Community members and Partners</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {/* Linux Foundation */}
            <a
              href="https://www.linuxfoundation.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border border-gray-200 rounded-lg h-24 flex items-center justify-center hover:shadow-lg transition-shadow p-4"
            >
              <img
                src="https://www.linuxfoundation.org/hubfs/lf-stacked-color.svg"
                alt="Linux Foundation"
                className="max-h-16 max-w-full object-contain"
              />
            </a>

            {/* W3C */}
            <a
              href="https://www.w3.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border border-gray-200 rounded-lg h-24 flex items-center justify-center hover:shadow-lg transition-shadow p-4"
            >
              <img
                src="https://www.w3.org/assets/logos/w3c/w3c-no-bars.svg"
                alt="W3C"
                className="max-h-12 max-w-full object-contain"
              />
            </a>

            {/* Hyperledger Aries */}
            <a
              href="https://www.hyperledger.org/use/aries"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border border-gray-200 rounded-lg h-24 flex items-center justify-center hover:shadow-lg transition-shadow p-4"
            >
              <div className="text-center">
                <div className="text-blue-700 font-bold text-lg">Hyperledger</div>
                <div className="text-blue-700 font-semibold text-sm">Aries</div>
              </div>
            </a>

            {/* Hyperledger Indy */}
            <a
              href="https://www.hyperledger.org/use/hyperledger-indy"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border border-gray-200 rounded-lg h-24 flex items-center justify-center hover:shadow-lg transition-shadow p-4"
            >
              <div className="text-center">
                <div className="text-blue-700 font-bold text-lg">Hyperledger</div>
                <div className="text-blue-700 font-semibold text-sm">Indy</div>
              </div>
            </a>

            {/* OpenWallet Foundation */}
            <a
              href="https://openwallet.foundation/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border border-gray-200 rounded-lg h-24 flex items-center justify-center hover:shadow-lg transition-shadow p-4"
            >
              <div className="text-center">
                <div className="text-green-600 font-bold text-sm">OpenWallet</div>
                <div className="text-green-600 font-semibold text-sm">Foundation</div>
              </div>
            </a>

            {/* DIDComm */}
            <a
              href="https://identity.foundation/didcomm-messaging/spec/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border border-gray-200 rounded-lg h-24 flex items-center justify-center hover:shadow-lg transition-shadow p-4"
            >
              <div className="text-center">
                <div className="text-purple-700 font-bold text-lg">DIDComm</div>
                <div className="text-purple-700 font-semibold text-xs">Messaging</div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Call to Action - Blue background with white text */}
      <section className="py-20 px-4 bg-blue-800">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Ready to take control of your Digital Credentials?</h2>
          <p className="text-xl mb-8 text-white">
            Join thousands of users who trust Confirmed Person for their Digital Credential needs.
          </p>
          <Link
            to="/demo"
            className="inline-block px-8 py-3 bg-orange-600 text-white font-semibold rounded-full hover:bg-orange-500 transition shadow-lg"
          >
            Get Started Now
          </Link>
        </div>
      </section>

      <Footer />
    </motion.div>
  )
}
