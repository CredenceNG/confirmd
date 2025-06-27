import { motion } from 'framer-motion'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useBehaviorTracking } from '../../hooks/useBehaviorTracking'
import * as GA from '../../utils/GoogleAnalytics'

export const TermsAndConditionsPage: React.FC = () => {
  const { trackPageView, addUserTag } = useBehaviorTracking()

  useEffect(() => {
    trackPageView()
    addUserTag('page_visited', 'terms_and_conditions', 'page_view')
    // Track page view in Google Analytics
    GA.trackPageView('/terms', 'Terms and Conditions - Confirmed Person', {
      page_section: 'legal',
      content_type: 'terms_and_conditions',
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
          <h1 className="text-4xl md:text-5xl font-bold text-bcgov-blue dark:text-white mb-4">Terms and Conditions</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">Effective Date: May 1, 2024</p>
        </motion.div>

        {/* Content */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 space-y-8"
        >
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold text-bcgov-blue dark:text-bcgov-gold mb-4">
              1. Validity of the General Terms and Conditions
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                <strong>1.1</strong> The usage of the Confirmd Digital Trust Wallet (the 'Confirmd Wallet / App') is
                subject to these general terms and conditions (the 'GTC'). The Confirmd App offers constant access to
                and viewing of the GTC.
              </p>
              <p>
                <strong>1.2</strong> The terms of these GTC apply to the use of the Confirmd Wallet and associated
                services as well as the provision of all services and advantages linked to the Confirmd App.
              </p>
              <p>
                <strong>1.3</strong> Cowrie Exchange Ltd Company provides users with access to self-sovereign
                identification networks through the Confirmd App in accordance with the terms of these GTC.
              </p>
              <p>
                <strong>1.4</strong> Other general terms and conditions, such as the user's, do not apply, despite the
                user's wants. Only if Cowrie Exchange Technology Solutions Pvt Ltd Company expressly agrees to the
                user's general terms and conditions does the user presume their validity.
              </p>
              <p>
                <strong>1.5</strong> The legality of the remaining sections of these GTC shall not be impacted if any
                provision is or becomes illegal by influx of law or due to passage of time. The user and Cowrie Exchange
                Technology Solutions Pvt Ltd Company agree to discuss the grounds for the invalidity of the provision to
                come up with a replacement provision that closely resembles its goals.
              </p>
              <p>
                <strong>1.6</strong> In the case of contractual discrepancy or variations, the same rule (Section 1.5)
                applies.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold text-bcgov-blue dark:text-bcgov-gold mb-4">
              2. The Confirmd Platform's & Confirmd App's Purpose and Object of Performance
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                <strong>2.1</strong> The Confirmd Platform (Verifiable Credential & Decentralised Identity management
                platform) and Confirmd App (Self-sovereign Identity Edge Wallet Application) are designed to securely
                store user credentials using cryptography. It allows users to safeguard their verifiable credentials and
                embrace the convenience of an identity wallet on their smartphones without compromising privacy. Cowrie
                Exchange Technology Solutions develops the Confirmd Platform and Confirmd App.
              </p>
              <p>
                <strong>2.2</strong> The Confirmd Platform and Confirmd App are intended for the digital identification
                and authentication of natural persons. Users can obtain and store identity information about themselves
                from other participants and share it if required. The identity information may include legitimation
                data, creditworthiness data, payment transaction data, registration data, and other text-based
                information.
              </p>
              <p>
                <strong>2.3</strong> The Confirmd Platform and Confirmd App connect to self-sovereign identity networks,
                enabling peer-to-peer connections with other participants. Users can exchange encrypted messages and
                receive other participants' identity information ("verifiable credentials"). They can also respond to
                identity requests from participants by sharing the relevant stored identity information. The Confirmd
                Platform is also connected to a digital mailbox service (SendGrid), ensuring secure message delivery.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold text-bcgov-blue dark:text-bcgov-gold mb-4">
              3. Application/Registration
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                <strong>3.1</strong> No login or registration with Cowrie Exchange Technology Solutions is required to
                use the Confirmd Platform and Confirmd Wallet / App.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold text-bcgov-blue dark:text-bcgov-gold mb-4">
              4. The "Confirmd" Platform's & "Confirmd" App's availability and changes, as well as services related to
              it
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                <strong>4.1</strong> After the "Confirmd" Platform and "Confirmd" App have been opened or installed
                respectively, the user may use it and any connected Cowrie Exchange Technology Solutions services in
                accordance with the terms and conditions set out in this agreement.
              </p>
              <p>
                <strong>4.2</strong> The "Confirmd" Platform and "Confirmd" App and the services and advantages
                connected to it are continuously made available by Cowrie Exchange Technology Solutions. However, the
                "Confirmd" Platform and "Confirmd" App and the services and advantages connected to it are not
                guaranteed, obligated to be available at all the time, or subject to responsibility by Cowrie Exchange
                Technology Solutions.
              </p>
              <p>
                <strong>4.3</strong> Additionally, Cowrie Exchange Technology Solutions is free to suspend or stop using
                the "Confirmd" Platform and "Confirmd" App, as well as the features and services connected to it, at any
                time, regardless of outside factors beyond its control. Cowrie Exchange Technology Solutions has all
                discretion over the timing, scope, and length of any suspensions it imposes and whether to execute any
                necessary maintenance or repairs. These decisions are not subject to judicial scrutiny.
              </p>
              <p>
                <strong>4.4</strong> The Cowrie Exchange Technology Solutions reserves the right to prohibit and/or ban
                the use of the "Confirmd" Platform and "Confirmd" App at any time and to stop offering services
                associated with the "Confirmd" Platform and "Confirmd" App. Such activities are not subject to
                justification and may be carried out at the sole discretion of Cowrie Exchange Technology Solutions,
                including in a way that is not susceptible to judicial scrutiny.
              </p>
              <p>
                <strong>4.5</strong> The "Confirmd" Platform and "Confirmd" App may undergo modifications at any moment,
                at the sole discretion of Cowrie Exchange Technology Solutions, including but not limited to the type
                and extent of changes. The company is under no obligation to notify users of such changes.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold text-bcgov-blue dark:text-bcgov-gold mb-4">
              5. Consent to the use of data and information of the user
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                <strong>5.1</strong> By selecting the appropriate field during the opening or installation of the
                "Confirmd" Platform and "Confirmd" App, respectively, the user confirms his consent to the entirety of
                these GTC, and specifically to the following points:
              </p>
              <div className="ml-6 space-y-3">
                <p>
                  <strong>A</strong> A user's identification data will initially only be saved on the "Confirmd"
                  Platform and "Confirmd" App and won't be shared with other parties until the user expressly agrees to
                  it.
                </p>
                <p>
                  <strong>B</strong> The user agrees that some personal data may be collected and processed by the
                  "Confirmd" Platform and "Confirmd" App in order for it to operate properly and provide the services it
                  offers. This data may include the user's name, contact information, device information, and any other
                  facts the user freely submits inside the platform and app.
                </p>
                <p>
                  <strong>C</strong> The user grants Cowrie Exchange Technology Solutions permission to gather and
                  analyse anonymous user data and statistics about the "Confirmd" Platform and "Confirmd" App in order
                  to enhance its functionality, performance, and user experience. This information will be handled in
                  compliance with the relevant data protection laws and rules applicable to India which may be further
                  amended from time to time.
                </p>
                <p>
                  <strong>D</strong> The user is aware of and accepts that the "Confirmd" Platform and "Confirmd" App
                  secures and protects user credentials and data using cryptography and encryption techniques. The user
                  understands that no security solution is perfect and that Cowrie Exchange Technology Solutions cannot
                  completely guarantee the protection of user data. The user is in charge of adopting the necessary
                  safety measures to protect their device and access to the platform & app.
                </p>
                <p>
                  <strong>E</strong> The user acknowledges and accepts that when they access or use the "Confirmd"
                  Platform and "Confirmd" App, Cowrie Exchange Technology Solutions may use cookies or other similar
                  technologies to gather certain information. IP addresses, unique device identifiers, surfing habits,
                  and other relevant data may be included in this information.
                </p>
                <p>
                  <strong>F</strong> The user is aware of and consents to the processing of their personal data by
                  Cowrie Exchange Technology Solutions in compliance with all applicable data protection laws and
                  regulations, including the General Data Protection Regulation (GDPR) and other pertinent privacy
                  legislation.
                </p>
                <p>
                  <strong>G</strong> By closing and uninstalling the "Confirmd" Platform and "Confirmd" App respectively
                  and ceasing to use them, the user has the right to withdraw their consent to the collection,
                  processing, and storage of their personal information at any time. The user is aware, however, that
                  such a withdrawal of permission may prevent them from using certain of the platform's and app's
                  features or services.
                </p>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-bold text-bcgov-blue dark:text-bcgov-gold mb-4">
              6. Intellectual Property Rights
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                <strong>6.1</strong> The "Confirmd" Platform and "Confirmd" App (including but not limited to its
                design, layout, graphics, text, and other content, as well as any software, algorithms, and underlying
                technologies), are protected by intellectual property rights and is owned or licenced by Cowrie Exchange
                Technology Solutions. The "Confirmd" Platform and "Confirmd" App can be used by the user for personal
                and non-commercial reasons, but only with a limited, non-exclusive, and non-transferable right.
              </p>
              <p>
                <strong>6.2</strong> The user acknowledges that they will not, without Cowrie Exchange Technology
                Solutions written approval, reproduce, edit, distribute, display, perform, publish, licence, create
                derivative works from, or sell any portion of the "Confirmd" Platform and "Confirmd" App.
              </p>
              <p>
                <strong>6.3</strong> Any copyright, trademark, or other property rights notices included in or
                accompanying the "Confirmd" Platform and "Confirmd" App may not be removed, altered, or obscured by the
                user.
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-bold text-bcgov-blue dark:text-bcgov-gold mb-4">7. Limitation of Liability</h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                <strong>7.1</strong> Users acknowledge that they are using the "Confirmd" Platform and "Confirmd" App at
                their own risk. Cowrie Exchange Technology Solutions disclaims all responsibility for any harm that may
                result from using the "Confirmd" Platform and "Confirmd" App, including but not limited to any direct,
                indirect, incidental, consequential, or punitive damages.
              </p>
              <p>
                <strong>7.2</strong> Cowrie Exchange Technology Solutions disclaims all responsibility for any delays,
                interruptions, errors, or omissions in the "Confirmd" Platform and "Confirmd" App's operation or any
                component thereof, as well as for any failure to perform, whether brought on by divine intervention,
                technical issues, unauthorised access, theft, or other causes outside of Cowrie Exchange Technology
                Solutions control.
              </p>
              <p>
                <strong>7.3</strong> With regard to the accuracy, dependability, or fitness of the "Confirmd" Platform
                and "Confirmd" App for any given purpose, the company makes no representations or guarantees of any
                kind, either stated or implied. On an "as-is" and "as-available" basis, the app is made available.
              </p>
              <p>
                <strong>7.4</strong> The user understands that the company Cowrie Exchange Technology Solutions cannot
                ensure the continuous or error-free operation of the "Confirmd" Platform and "Confirmd" App and that any
                dependence on its functionality is done at the user's own risk.
              </p>
              <p>
                <strong>7.5</strong> Cowrie Exchange Technology Solutions responsibility is restricted to the fullest
                extent permissible by law in places where the exclusion or limitation of liability for consequential or
                incidental damages is not permitted.
              </p>
            </div>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-bold text-bcgov-blue dark:text-bcgov-gold mb-4">8. Termination</h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                <strong>8.1</strong> Cowrie Exchange Technology Solutions retains the right to deny or restrict a user's
                access to the "Confirmd" Platform and "Confirmd" App at any time and for any reason, including but not
                limited to a violation of these general terms and conditions, without prior warning or responsibility.
              </p>
              <p>
                <strong>8.2</strong> The user has the option to stop using the "Confirmd" Platform and "Confirmd" App
                whenever they choose by uninstalling it and doing so.
              </p>
              <p>
                <strong>8.3</strong> If the agreement is terminated, the user's right to use the "Confirmd" Platform and
                "Confirmd" App will end immediately, and they must uninstall it as soon as possible and remove any
                copies of it from their devices.
              </p>
            </div>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-2xl font-bold text-bcgov-blue dark:text-bcgov-gold mb-4">
              9. Governing Law and Dispute Resolution
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                <strong>9.1</strong> These terms and conditions are governed by Nigerian laws.
              </p>
            </div>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-2xl font-bold text-bcgov-blue dark:text-bcgov-gold mb-4">10. Severability</h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                <strong>10.1</strong> The remaining terms of these general terms and conditions shall remain in full
                force and effect in the event that any provision is judged to be invalid, unlawful, or unenforceable.
              </p>
            </div>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className="text-2xl font-bold text-bcgov-blue dark:text-bcgov-gold mb-4">11. Entire Agreement</h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                <strong>11.1</strong> These general terms and conditions replace all prior or contemporaneous oral or
                written agreements, communications, or understandings with respect to the subject matter hereof and
                represent the complete agreement between the user and Cowrie Exchange Technology Solutions with regard
                to the use of the "Confirmd" Platform and "Confirmd" App.
              </p>
            </div>
          </section>

          {/* Section 12 */}
          <section>
            <h2 className="text-2xl font-bold text-bcgov-blue dark:text-bcgov-gold mb-4">12. Contact Information</h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                <strong>12.1</strong> Users can get in touch with Cowrie Exchange Technology Solutions at{' '}
                <a href="mailto:info@CowrieExchange.com" className="text-bcgov-blue hover:underline">
                  info@CowrieExchange.com
                </a>{' '}
                if they have any questions, issues, or suggestions about these GTC or the "Confirmd" Platform and the
                "Confirmd" App.
              </p>
            </div>
          </section>

          {/* Footer */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mt-12 text-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              <strong>Date these general terms and conditions take effect:</strong> May 1, 2024
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-xs mt-2">
              <em>This document was extracted from the ConfirmdWallet React Native application source code.</em>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
