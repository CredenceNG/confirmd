import { motion } from 'framer-motion'
import React from 'react'
import { Link } from 'react-router-dom'

import { page } from '../../FramerAnimations'
import { Breadcrumb } from '../../components/Breadcrumb'
import { Footer } from '../../components/Footer'
import { Header } from '../../components/Header'
import { useTitle } from '../../hooks/useTitle'
import { basePath } from '../../utils/BasePath'

export const AboutUsPage: React.FC = () => {
  useTitle('Confirmed Person - About Us')

  return (
    <motion.div
      className="min-h-screen flex flex-col bg-white dark:bg-blue-900"
      variants={page}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <Header activePage="about" />
      <Breadcrumb items={[{ label: 'About Us', path: '/about', active: true }]} />

      {/* Hero Section */}
      <section className="pt-12 pb-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-6">
                Our <span className="text-orange-600">mission</span>
              </h1>
              <p className="text-lg text-blue-800 mb-8 leading-relaxed">
                At Confirmed Person, we're on a mission to revolutionize Credentialling in Africa. We believe that
                individuals should have control over their personal credentials (infact, their data) while businesses
                can verify credentials with unprecedented ease and security.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/team"
                  className="px-8 py-3 bg-orange-600 text-white text-center rounded-full hover:bg-orange-700 transition font-semibold shadow-md"
                >
                  Meet Our Team
                </Link>
                <Link
                  to="/careers"
                  className="px-8 py-3 border-2 border-blue-800 text-blue-800 text-center rounded-full hover:bg-blue-50 transition font-semibold"
                >
                  Join Us
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 md:pl-10">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <div className="bg-blue-50 rounded-lg p-8 flex justify-center items-center">
                  <img src="/credence-image.png" alt="Confirmed Person Logo" className="max-w-full h-auto" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 px-4 bg-white border-t border-gray-200">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-4 text-blue-800">Our values</h2>
          <p className="text-center text-blue-800 mb-12 max-w-2xl mx-auto">
            These principles guide everything we do at Confirmed Person
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Value 1 */}
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
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-blue-800">Security First</h3>
              <p className="text-blue-800">
                We build our solutions with security as the foundation, not an afterthought. Every feature and update
                undergoes rigorous security testing.
              </p>
            </div>

            {/* Value 2 */}
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
                    d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-blue-800">User Control</h3>
              <p className="text-blue-800">
                We believe individuals should have complete control over their personal data. Our solutions empower
                users to decide what information to share and with whom.
              </p>
            </div>

            {/* Value 3 */}
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
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-blue-800">Trust & Transparency</h3>
              <p className="text-blue-800">
                We operate with complete transparency about how our technology works and how data is handled. Trust is
                earned through actions, not just words.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-800">Leadership team</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
              <div className="bg-blue-50 h-48 flex items-center justify-center">
                <div className="w-28 h-28 bg-blue-700 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                  JD
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-blue-800 mb-1">Jane Doe</h3>
                <p className="text-blue-600 mb-4">Chief Executive Officer</p>
                <p className="text-blue-800 text-sm">
                  With over 20 years of experience in identity security, Jane leads our company's vision and strategy.
                </p>
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
              <div className="bg-orange-50 h-48 flex items-center justify-center">
                <div className="w-28 h-28 bg-orange-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                  JS
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-blue-800 mb-1">John Smith</h3>
                <p className="text-blue-600 mb-4">Chief Technology Officer</p>
                <p className="text-blue-800 text-sm">
                  John leads our technology team, bringing expertise in blockchain, cryptography, and secure systems
                  design.
                </p>
              </div>
            </div>

            {/* Team Member 3 */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
              <div className="bg-teal-50 h-48 flex items-center justify-center">
                <div className="w-28 h-28 bg-teal-700 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                  AT
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-blue-800 mb-1">Alice Thompson</h3>
                <p className="text-blue-600 mb-4">Chief Operating Officer</p>
                <p className="text-blue-800 text-sm">
                  Alice oversees our day-to-day operations, ensuring we deliver exceptional service to our clients.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              to="/contact"
              className="inline-block px-8 py-3 border-2 border-blue-800 text-blue-800 font-semibold rounded-full hover:bg-blue-50 transition"
            >
              View Full Team
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-blue-800">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Join us in revolutionizing digital identity</h2>
          <p className="text-xl mb-8 text-white">
            Whether you're looking for a solution or want to join our team, we'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/contact"
              className="inline-block px-8 py-3 bg-orange-600 text-white font-semibold rounded-full hover:bg-orange-500 transition shadow-lg"
            >
              Contact Us
            </Link>
            <Link
              to="/contact"
              className="inline-block px-8 py-3 bg-white text-blue-800 font-semibold rounded-full hover:bg-gray-100 transition shadow-lg"
            >
              View Open Positions
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </motion.div>
  )
}
