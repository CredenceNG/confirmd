import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { page } from '../../FramerAnimations'
import { sendContactForm, type ContactFormData } from '../../api/ContactApi'
import { Breadcrumb } from '../../components/Breadcrumb'
import { Footer } from '../../components/Footer'
import { Header } from '../../components/Header'
import { useTitle } from '../../hooks/useTitle'

export const ContactUsPage: React.FC = () => {
  useTitle('Confirmed Person - Contact Us')

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      const response = await sendContactForm(formData)
      if (response.data.success) {
        setSubmitStatus({
          type: 'success',
          message: response.data.message,
        })
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        })
      } else {
        setSubmitStatus({
          type: 'error',
          message: response.data.message || 'Failed to send message. Please try again.',
        })
      }
    } catch (error) {
      console.error('Contact form submission error:', error)
      setSubmitStatus({
        type: 'error',
        message: 'Failed to send message. Please try again later.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      className="min-h-screen flex flex-col bg-white dark:bg-blue-900"
      variants={page}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <Header activePage="contact" />
      <Breadcrumb items={[{ label: 'Contact Us', path: '/contact', active: true }]} />

      {/* Hero Section */}
      <section className="pt-12 pb-8 px-4 bg-white">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-6">
            Get in <span className="text-orange-600">touch</span>
          </h1>
          <p className="text-xl text-blue-800 mb-8 max-w-3xl mx-auto leading-relaxed">
            Have questions about our digital identity solutions? We'd love to hear from you. Our team is here to help
            you understand how Confirmed Person can revolutionize your credentialing process.
          </p>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-blue-800 mb-6">Contact Information</h2>
                <p className="text-blue-800 mb-8">
                  Reach out to us through any of the following channels. We typically respond within 24 hours.
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-6">
                {/* Office Address */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
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
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-800">Office Address</h3>
                    <p className="text-blue-800">
                      PeachVille Estate Ph. III
                      <br />
                      Jabi Airport Road, Abuja, FCT
                      <br />
                      Nigeria
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
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
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-800">Email</h3>
                    <p className="text-blue-800">
                      <a href="mailto:hello@confirmedperson.com" className="hover:text-orange-600 transition">
                        hello@cowriex.com.ng
                      </a>
                      <br />
                      <a href="mailto:support@confirmedperson.com" className="hover:text-orange-600 transition">
                        support@cowriex.com.ng
                      </a>
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
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
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-800">Phone</h3>
                    <p className="text-blue-800">
                      <a href="tel:+2348123456789" className="hover:text-orange-600 transition">
                        +234 807 706 XXXX
                      </a>
                      <br />
                      <span className="text-sm text-blue-600">Monday - Friday, 9am - 6pm WAT</span>
                    </p>
                  </div>
                </div>

                {/* Social Media */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-purple-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-800">Follow Us</h3>
                    <div className="flex space-x-4 mt-2">
                      <a href="#" className="text-blue-600 hover:text-orange-600 transition">
                        LinkedIn
                      </a>
                      <a href="#" className="text-blue-600 hover:text-orange-600 transition">
                        Twitter
                      </a>
                      <a href="#" className="text-blue-600 hover:text-orange-600 transition">
                        GitHub
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-blue-800 mb-6">Send us a message</h2>

              {submitStatus.type && (
                <div
                  className={`mb-6 p-4 rounded-lg ${
                    submitStatus.type === 'success'
                      ? 'bg-green-50 border border-green-200 text-green-800'
                      : 'bg-red-50 border border-red-200 text-red-800'
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-blue-800 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    placeholder="Your full name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-blue-800 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    placeholder="your.email@example.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-blue-800 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    placeholder="+234 812 345 6789"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-blue-800 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  >
                    <option value="">Select a subject</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Product Demo">Product Demo Request</option>
                    <option value="Partnership">Partnership Opportunity</option>
                    <option value="Technical Support">Technical Support</option>
                    <option value="Pricing">Pricing Information</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-blue-800 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                    placeholder="Tell us about your needs, questions, or how we can help..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                    isSubmitting
                      ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                      : 'bg-orange-600 text-white hover:bg-orange-700 focus:ring-4 focus:ring-orange-200'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />
                      <span>Sending...</span>
                    </div>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-800">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">How quickly can we get started?</h3>
              <p className="text-blue-800">
                We can typically have you up and running within 2-4 weeks, depending on your specific requirements and
                integration complexity.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">What types of credentials can be verified?</h3>
              <p className="text-blue-800">
                Our platform supports a wide range of credentials including educational certificates, professional
                licenses, employment records, and custom organizational credentials.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Is the platform secure?</h3>
              <p className="text-blue-800">
                Yes, security is our top priority. We use blockchain technology, end-to-end encryption, and follow
                industry best practices to ensure the highest level of security for your data.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Do you offer training and support?</h3>
              <p className="text-blue-800">
                Absolutely! We provide comprehensive training for your team and ongoing support to ensure you get the
                most out of our platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-blue-800">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Ready to revolutionize your credentialing process?</h2>
          <p className="text-xl mb-8 text-white">
            Join organizations across Africa who trust our Digital Trustt Ecosystem for secure, efficient Credential
            verification.
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
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </motion.div>
  )
}
