import { motion } from 'framer-motion'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useBehaviorTracking } from '../../hooks/useBehaviorTracking'
import * as GA from '../../utils/GoogleAnalytics'

export const CookiesPolicyPage: React.FC = () => {
  const { trackPageView, addUserTag } = useBehaviorTracking()

  useEffect(() => {
    trackPageView()
    addUserTag('page_visited', 'cookies_policy', 'page_view')
    // Track page view in Google Analytics
    GA.trackPageView('/cookies', 'Cookies Policy - Confirmed Person', {
      page_section: 'legal',
      content_type: 'cookies_policy',
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
          <h1 className="text-4xl md:text-5xl font-bold text-bcgov-blue dark:text-white mb-4">Cookies Policy</h1>
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
                This Cookies Policy explains how Cowrie Exchange Technology Solutions ("we", "our", or "us") uses
                cookies and similar tracking technologies when you use our Confirmd Digital Trust Wallet (the "Confirmd
                Wallet" or "App") and related services. This policy should be read alongside our Privacy Policy and
                Terms and Conditions.
              </p>
              <p>
                By continuing to use our services, you consent to our use of cookies and similar technologies as
                described in this policy.
              </p>
            </div>
          </section>

          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold text-bcgov-blue dark:text-bcgov-gold mb-4">1. What Are Cookies</h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                <strong>1.1 Definition</strong> Cookies are small text files that are stored on your device (computer,
                tablet, or mobile) when you visit a website or use an application. They are widely used to make websites
                and applications work more efficiently and to provide information to the owners of the site or app.
              </p>
              <p>
                <strong>1.2 Similar Technologies</strong> We also use similar tracking technologies such as web beacons,
                pixels, local storage, and mobile device identifiers. For simplicity, we refer to all these technologies
                as "cookies" in this policy.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold text-bcgov-blue dark:text-bcgov-gold mb-4">2. Types of Cookies We Use</h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                <strong>2.1 Essential Cookies</strong> These cookies are necessary for the basic functionality of our
                App and cannot be disabled. They include:
              </p>
              <ul className="ml-6 space-y-2 list-disc">
                <li>Authentication and security cookies</li>
                <li>Session management cookies</li>
                <li>Load balancing cookies</li>
                <li>Application functionality cookies</li>
              </ul>
              <p>
                <strong>2.2 Performance and Analytics Cookies</strong> These cookies help us understand how users
                interact with our App by collecting and reporting information anonymously:
              </p>
              <ul className="ml-6 space-y-2 list-disc">
                <li>Google Analytics cookies (GA4)</li>
                <li>User behavior tracking cookies</li>
                <li>Performance monitoring cookies</li>
                <li>Error reporting cookies</li>
              </ul>
              <p>
                <strong>2.3 Functional Cookies</strong> These cookies enable enhanced functionality and personalization:
              </p>
              <ul className="ml-6 space-y-2 list-disc">
                <li>Language preference cookies</li>
                <li>Theme and display preference cookies</li>
                <li>User interface customization cookies</li>
                <li>Accessibility feature cookies</li>
              </ul>
              <p>
                <strong>2.4 Targeting and Advertising Cookies</strong> These cookies may be used to deliver relevant
                content and track the effectiveness of our communications:
              </p>
              <ul className="ml-6 space-y-2 list-disc">
                <li>Marketing campaign tracking cookies</li>
                <li>Social media integration cookies</li>
                <li>Conversion tracking cookies</li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold text-bcgov-blue dark:text-bcgov-gold mb-4">3. How We Use Cookies</h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                <strong>3.1 App Functionality</strong> We use cookies to ensure our App works properly and to provide
                you with the best possible user experience, including:
              </p>
              <ul className="ml-6 space-y-2 list-disc">
                <li>Maintaining your login session securely</li>
                <li>Remembering your preferences and settings</li>
                <li>Providing secure access to your digital credentials</li>
                <li>Enabling self-sovereign identity features</li>
              </ul>
              <p>
                <strong>3.2 Analytics and Improvement</strong> We use analytics cookies to understand how our App is
                used and to improve its performance:
              </p>
              <ul className="ml-6 space-y-2 list-disc">
                <li>Analyzing user behavior and interaction patterns</li>
                <li>Identifying popular features and content</li>
                <li>Detecting and fixing technical issues</li>
                <li>Measuring the effectiveness of new features</li>
              </ul>
              <p>
                <strong>3.3 Security</strong> Cookies help us maintain the security of our App and protect against
                fraudulent activity:
              </p>
              <ul className="ml-6 space-y-2 list-disc">
                <li>Detecting suspicious activity and potential security threats</li>
                <li>Preventing unauthorized access to user accounts</li>
                <li>Ensuring the integrity of cryptographic operations</li>
              </ul>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold text-bcgov-blue dark:text-bcgov-gold mb-4">4. Third-Party Cookies</h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                <strong>4.1 Google Analytics</strong> We use Google Analytics to collect information about how users
                interact with our App. Google Analytics uses cookies to collect this information anonymously and
                generate reports about App usage.
              </p>
              <p>
                <strong>4.2 SendGrid Integration</strong> Our digital mailbox service integration may use cookies to
                ensure secure message delivery and communication functionality.
              </p>
              <p>
                <strong>4.3 Third-Party Services</strong> Some features of our App may integrate with third-party
                services that may set their own cookies. We do not control these third-party cookies and recommend
                reviewing their privacy policies.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold text-bcgov-blue dark:text-bcgov-gold mb-4">5. Cookie Duration</h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                <strong>5.1 Session Cookies</strong> These cookies are temporary and are deleted when you close your
                browser or exit the App. They are essential for basic functionality.
              </p>
              <p>
                <strong>5.2 Persistent Cookies</strong> These cookies remain on your device for a specified period or
                until you delete them. They help us recognize you when you return to our App and remember your
                preferences.
              </p>
              <p>
                <strong>5.3 Cookie Lifespan</strong> The duration of our cookies varies depending on their purpose:
              </p>
              <ul className="ml-6 space-y-2 list-disc">
                <li>Essential cookies: Duration of session or up to 1 year</li>
                <li>Analytics cookies: Up to 2 years</li>
                <li>Functional cookies: Up to 1 year</li>
                <li>Marketing cookies: Up to 1 year</li>
              </ul>
            </div>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-bold text-bcgov-blue dark:text-bcgov-gold mb-4">
              6. Managing Your Cookie Preferences
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                <strong>6.1 Browser Settings</strong> Most web browsers allow you to control cookies through their
                settings. You can:
              </p>
              <ul className="ml-6 space-y-2 list-disc">
                <li>Block all cookies</li>
                <li>Block third-party cookies only</li>
                <li>Delete cookies when you close your browser</li>
                <li>Be notified when a cookie is set</li>
              </ul>
              <p>
                <strong>6.2 Mobile App Settings</strong> For our mobile application, you can manage tracking preferences
                through your device settings or within the App's privacy settings.
              </p>
              <p>
                <strong>6.3 Opt-Out Links</strong> You can opt out of certain tracking services:
              </p>
              <ul className="ml-6 space-y-2 list-disc">
                <li>
                  Google Analytics:{' '}
                  <a
                    href="https://tools.google.com/dlpage/gaoptout"
                    className="text-bcgov-blue hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google Analytics Opt-out Browser Add-on
                  </a>
                </li>
              </ul>
              <p>
                <strong>6.4 Impact of Disabling Cookies</strong> Please note that disabling certain cookies may affect
                the functionality of our App and your user experience. Essential cookies cannot be disabled as they are
                necessary for the App to function properly.
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-bold text-bcgov-blue dark:text-bcgov-gold mb-4">
              7. Data Protection and Privacy
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                <strong>7.1 Privacy by Design</strong> We implement privacy by design principles in our use of cookies,
                ensuring that personal data protection is considered at every stage.
              </p>
              <p>
                <strong>7.2 Data Minimization</strong> We only collect the minimum amount of data necessary through
                cookies to provide our services and improve user experience.
              </p>
              <p>
                <strong>7.3 Anonymization</strong> Where possible, we anonymize data collected through cookies to
                protect your privacy while still gaining valuable insights for service improvement.
              </p>
              <p>
                <strong>7.4 Compliance</strong> Our use of cookies complies with applicable data protection laws,
                including GDPR, and other relevant privacy regulations.
              </p>
            </div>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-bold text-bcgov-blue dark:text-bcgov-gold mb-4">8. International Transfers</h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                <strong>8.1</strong> Some of the cookies we use may involve the transfer of data to countries outside
                your country of residence. We ensure that appropriate safeguards are in place for such transfers, in
                accordance with applicable data protection laws.
              </p>
              <p>
                <strong>8.2</strong> For users in the European Union, we ensure that data transfers comply with GDPR
                requirements, including the use of adequacy decisions, standard contractual clauses, or other approved
                transfer mechanisms.
              </p>
            </div>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-2xl font-bold text-bcgov-blue dark:text-bcgov-gold mb-4">
              9. Updates to This Cookies Policy
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                <strong>9.1</strong> We may update this Cookies Policy from time to time to reflect changes in our
                practices, technology, legal requirements, or for other operational, legal, or regulatory reasons.
              </p>
              <p>
                <strong>9.2</strong> When we make changes, we will update the "Effective Date" at the top of this policy
                and may notify you through the App or by other means.
              </p>
              <p>
                <strong>9.3</strong> We encourage you to review this Cookies Policy periodically to stay informed about
                our use of cookies and related technologies.
              </p>
            </div>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-2xl font-bold text-bcgov-blue dark:text-bcgov-gold mb-4">10. Contact Us</h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                <strong>10.1</strong> If you have any questions, concerns, or requests regarding this Cookies Policy or
                our use of cookies, please contact us at:
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
              <p>
                <strong>10.2</strong> For specific questions about how to manage cookies on your device or browser,
                please refer to your browser's help documentation or device settings.
              </p>
            </div>
          </section>

          {/* Footer */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mt-12 text-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              <strong>This Cookies Policy is effective as of:</strong> May 1, 2024
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-xs mt-2">
              <em>Last updated: May 1, 2024</em>
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-xs mt-1">
              <em>
                This policy should be read in conjunction with our{' '}
                <a href="/privacy" className="text-bcgov-blue hover:underline">
                  Privacy Policy
                </a>{' '}
                and{' '}
                <a href="/terms" className="text-bcgov-blue hover:underline">
                  Terms and Conditions
                </a>
                .
              </em>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
