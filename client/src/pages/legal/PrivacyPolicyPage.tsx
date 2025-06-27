import { motion } from 'framer-motion'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useBehaviorTracking } from '../../hooks/useBehaviorTracking'
import * as GA from '../../utils/GoogleAnalytics'

export const PrivacyPolicyPage: React.FC = () => {
  const { trackPageView, addUserTag } = useBehaviorTracking()

  useEffect(() => {
    trackPageView()
    addUserTag('page_visited', 'privacy_policy', 'page_view')
    // Track page view in Google Analytics
    GA.trackPageView('/privacy', 'Privacy Policy - Confirmed Person', {
      page_section: 'legal',
      content_type: 'privacy_policy',
    })
  }, [trackPageView, addUserTag])

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-bcgov-blue/5 to-bcgov-gold/5 dark:from-gray-900 dark:to-gray-800">
      <motion.div
        className="container mx-auto px-4 py-12 max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Back to Home Link */}
        <motion.div variants={itemVariants} className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-bcgov-blue dark:text-bcgov-gold hover:text-bcgov-blue/80 dark:hover:text-bcgov-gold/80 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Home
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-bcgov-blue dark:text-white mb-4">Privacy Policy</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">Effective Date: May 1, 2024</p>
        </motion.div>

        {/* Content */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 space-y-8"
        >
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-bcgov-blue dark:text-bcgov-gold mb-4">Introduction</h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                Cowrie Exchange Technology Solutions ("we", "our", or "us") is committed to protecting your privacy and
                ensuring the security of your personal information. This Privacy Policy explains how we collect, use,
                disclose, and safeguard your information when you use our Confirmd Digital Trust Wallet (the "Confirmd
                Wallet" or "App") and related services.
              </p>
              <p>
                By using our services, you agree to the collection and use of information in accordance with this
                Privacy Policy. If you do not agree with our policies and practices, do not download, register with, or
                use our services.
              </p>
            </div>
          </section>

          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold text-bcgov-blue dark:text-bcgov-gold mb-4">1. Information We Collect</h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                <strong>1.1 Personal Information</strong> We may collect personally identifiable information that you
                voluntarily provide to us when registering for the App, expressing an interest in obtaining information
                about us or our services, or otherwise contacting us. This may include:
              </p>
              <ul className="ml-6 space-y-2 list-disc">
                <li>Name and contact information</li>
                <li>Device information and identifiers</li>
                <li>Credentials and verification data you choose to store</li>
                <li>Communication preferences</li>
              </ul>
              <p>
                <strong>1.2 Automatically Collected Information</strong> When you use our App, we may automatically
                collect certain information about your device and usage patterns, including:
              </p>
              <ul className="ml-6 space-y-2 list-disc">
                <li>IP addresses and unique device identifiers</li>
                <li>Browser type and operating system</li>
                <li>Usage data and analytics</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
              <p>
                <strong>1.3 Verifiable Credentials</strong> The App is designed to store your verifiable credentials
                locally on your device using advanced cryptographic techniques. We do not have access to these
                credentials unless you explicitly choose to share them.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold text-bcgov-blue dark:text-bcgov-gold mb-4">
              2. How We Use Your Information
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                <strong>2.1</strong> We use the information we collect to provide, maintain, and improve our services,
                including:
              </p>
              <ul className="ml-6 space-y-2 list-disc">
                <li>Facilitating the creation and management of your digital identity</li>
                <li>Enabling secure storage and sharing of verifiable credentials</li>
                <li>Providing customer support and technical assistance</li>
                <li>Improving our App's functionality and user experience</li>
                <li>Communicating with you about updates, security alerts, and promotional content</li>
              </ul>
              <p>
                <strong>2.2</strong> We may use aggregated, anonymized data for research and analytics purposes to
                enhance our services and develop new features.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold text-bcgov-blue dark:text-bcgov-gold mb-4">
              3. Information Sharing and Disclosure
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                <strong>3.1 Self-Sovereign Identity Principle</strong> Your identification data is initially stored only
                on your device and our secure platform. We will not share your personal information with third parties
                without your explicit consent, except as described in this policy.
              </p>
              <p>
                <strong>3.2 With Your Consent</strong> We may share your information when you explicitly authorize us to
                do so, such as when you choose to share verifiable credentials with other participants in the network.
              </p>
              <p>
                <strong>3.3 Legal Requirements</strong> We may disclose your information if required by law, regulation,
                legal process, or governmental request, or to protect our rights, property, or safety, or that of
                others.
              </p>
              <p>
                <strong>3.4 Service Providers</strong> We may share information with trusted third-party service
                providers who assist us in operating our App and providing services, subject to confidentiality
                agreements.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold text-bcgov-blue dark:text-bcgov-gold mb-4">4. Data Security</h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                <strong>4.1 Cryptographic Protection</strong> We use industry-standard cryptographic techniques to
                secure and protect your credentials and personal data. This includes end-to-end encryption and secure
                key management.
              </p>
              <p>
                <strong>4.2 Security Measures</strong> We implement appropriate technical and organizational security
                measures to protect your information against unauthorized access, alteration, disclosure, or
                destruction.
              </p>
              <p>
                <strong>4.3 Limitations</strong> While we strive to protect your information, no security system is
                impenetrable. You are responsible for maintaining the security of your device and access credentials.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold text-bcgov-blue dark:text-bcgov-gold mb-4">5. Data Retention</h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                <strong>5.1</strong> We retain your personal information only for as long as necessary to fulfill the
                purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by
                law.
              </p>
              <p>
                <strong>5.2</strong> When you delete your account or uninstall the App, we will delete or anonymize your
                personal information, subject to legal and regulatory requirements.
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-bold text-bcgov-blue dark:text-bcgov-gold mb-4">6. Your Privacy Rights</h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                <strong>6.1 Access and Control</strong> You have the right to access, update, or delete your personal
                information. You can manage your data directly through the App or by contacting us.
              </p>
              <p>
                <strong>6.2 Consent Withdrawal</strong> You can withdraw your consent to the collection, processing, and
                storage of your personal information at any time by uninstalling the App and ceasing to use our
                services.
              </p>
              <p>
                <strong>6.3 Data Portability</strong> You have the right to export your data in a structured,
                commonly-used format, subject to technical limitations and security considerations.
              </p>
              <p>
                <strong>6.4 GDPR Rights</strong> If you are located in the European Union, you have additional rights
                under the General Data Protection Regulation, including the right to object to processing and the right
                to lodge a complaint with a supervisory authority.
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-bold text-bcgov-blue dark:text-bcgov-gold mb-4">
              7. Cookies and Tracking Technologies
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                <strong>7.1</strong> We use cookies and similar tracking technologies to collect information about your
                browsing activities and to provide a personalized user experience.
              </p>
              <p>
                <strong>7.2</strong> You can control cookie settings through your browser preferences, though disabling
                cookies may affect the functionality of our services.
              </p>
            </div>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-bold text-bcgov-blue dark:text-bcgov-gold mb-4">8. Third-Party Services</h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                <strong>8.1</strong> Our App may integrate with third-party services, including digital mailbox services
                like SendGrid, to enhance functionality and user experience.
              </p>
              <p>
                <strong>8.2</strong> We are not responsible for the privacy practices of third-party services. We
                encourage you to review their privacy policies before using their services.
              </p>
            </div>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-2xl font-bold text-bcgov-blue dark:text-bcgov-gold mb-4">
              9. International Data Transfers
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                <strong>9.1</strong> Your information may be transferred to and processed in countries other than your
                country of residence. We ensure appropriate safeguards are in place to protect your information in
                accordance with applicable data protection laws.
              </p>
            </div>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-2xl font-bold text-bcgov-blue dark:text-bcgov-gold mb-4">10. Children's Privacy</h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                <strong>10.1</strong> Our services are not intended for children under the age of 13. We do not
                knowingly collect personal information from children under 13. If we become aware that we have collected
                personal information from a child under 13, we will take steps to delete such information.
              </p>
            </div>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className="text-2xl font-bold text-bcgov-blue dark:text-bcgov-gold mb-4">
              11. Changes to This Privacy Policy
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                <strong>11.1</strong> We may update this Privacy Policy from time to time. We will notify you of any
                changes by posting the new Privacy Policy on this page and updating the effective date.
              </p>
              <p>
                <strong>11.2</strong> We encourage you to review this Privacy Policy periodically to stay informed about
                how we protect your information.
              </p>
            </div>
          </section>

          {/* Section 12 */}
          <section>
            <h2 className="text-2xl font-bold text-bcgov-blue dark:text-bcgov-gold mb-4">12. Contact Us</h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                <strong>12.1</strong> If you have any questions, concerns, or requests regarding this Privacy Policy or
                our data practices, please contact us at:
              </p>
              <div className="ml-6 space-y-2">
                <p>
                  <strong>Email:</strong>{' '}
                  <a href="mailto:privacy@CowrieExchange.com" className="text-bcgov-blue hover:underline">
                    privacy@CowrieExchange.com
                  </a>
                </p>
                <p>
                  <strong>General Inquiries:</strong>{' '}
                  <a href="mailto:info@CowrieExchange.com" className="text-bcgov-blue hover:underline">
                    info@CowrieExchange.com
                  </a>
                </p>
              </div>
            </div>
          </section>

          {/* Footer */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mt-12 text-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              <strong>This Privacy Policy is effective as of:</strong> May 1, 2024
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-xs mt-2">
              <em>Last updated: May 1, 2024</em>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
