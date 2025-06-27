import { motion } from 'framer-motion'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useBehaviorTracking } from '../../hooks/useBehaviorTracking'
import { BehaviorEventType } from '../../types/behavior'
import * as GA from '../../utils/GoogleAnalytics'

interface JobPosting {
  id: string
  title: string
  department: string
  location: string
  type: string
  experience: string
  description: string
  requirements: string[]
  benefits: string[]
  responsibilities: string[]
}

export const CareersPage: React.FC = () => {
  const { trackPageView, addUserTag, track } = useBehaviorTracking()

  useEffect(() => {
    trackPageView()
    addUserTag('page_visited', 'careers', 'page_view')
    // Track page view in Google Analytics
    GA.trackPageView('/careers', 'Careers - Confirmed Person', {
      page_section: 'careers',
      content_type: 'job_listings',
    })
  }, [trackPageView, addUserTag])

  const handleApplyClick = (jobTitle: string) => {
    track(BehaviorEventType.BUTTON_CLICK, 'careers', 'apply_button_click', jobTitle, undefined, {
      job_title: jobTitle,
      source: 'careers_page',
    })
    addUserTag('career_interest', jobTitle, 'application_intent')

    // Track in Google Analytics
    GA.trackEvent('apply_button_click', 'careers', jobTitle, undefined, {
      job_title: jobTitle,
      page_section: 'careers',
    })
  }

  const jobPostings: JobPosting[] = [
    {
      id: 'dev-001',
      title: 'Senior Full-Stack Developer',
      department: 'Engineering',
      location: 'Remote / Victoria, BC',
      type: 'Full-time',
      experience: '5+ years',
      description:
        "Join our innovative team building the next generation of digital identity solutions. We're looking for a passionate developer to help create secure, user-friendly applications that empower individuals to control their digital identity.",
      requirements: [
        "Bachelor's degree in Computer Science, Engineering, or related field",
        '5+ years of experience in full-stack development',
        'Proficiency in React, TypeScript, Node.js, and modern web technologies',
        'Experience with blockchain, cryptography, or digital identity solutions (preferred)',
        'Strong understanding of security best practices',
        'Experience with cloud platforms (AWS, Azure, or GCP)',
        'Excellent problem-solving and communication skills',
        'Experience with agile development methodologies',
      ],
      responsibilities: [
        'Design and develop scalable web applications using React and TypeScript',
        'Build secure backend services and APIs using Node.js',
        'Implement cryptographic protocols for digital identity verification',
        'Collaborate with product and design teams to deliver exceptional user experiences',
        'Write clean, maintainable, and well-tested code',
        'Participate in code reviews and maintain high code quality standards',
        'Stay current with emerging technologies and industry best practices',
        'Contribute to technical architecture and system design decisions',
      ],
      benefits: [
        'Competitive salary and equity package',
        'Comprehensive health, dental, and vision insurance',
        'Flexible work arrangements and remote-first culture',
        'Professional development budget and conference attendance',
        'Cutting-edge technology stack and tools',
        'Collaborative and inclusive work environment',
        'Opportunity to work on groundbreaking digital identity technology',
        'Flexible PTO and work-life balance',
      ],
    },
    {
      id: 'devops-001',
      title: 'DevOps Professional',
      department: 'Infrastructure',
      location: 'Remote / Victoria, BC',
      type: 'Full-time',
      experience: '3+ years',
      description:
        "We're seeking a skilled DevOps professional to help scale our infrastructure and ensure the reliability and security of our digital identity platform. You'll work with cutting-edge cloud technologies and help build systems that protect sensitive user data.",
      requirements: [
        "Bachelor's degree in Computer Science, IT, or related field",
        '3+ years of experience in DevOps, SRE, or cloud infrastructure',
        'Strong experience with AWS, Azure, or Google Cloud Platform',
        'Proficiency in Infrastructure as Code (Terraform, CloudFormation)',
        'Experience with containerization (Docker, Kubernetes)',
        'Knowledge of CI/CD pipelines and automation tools',
        'Understanding of security best practices and compliance standards',
        'Experience with monitoring and logging solutions',
        'Strong scripting skills (Python, Bash, or similar)',
      ],
      responsibilities: [
        'Design and maintain scalable cloud infrastructure',
        'Implement and manage CI/CD pipelines for automated deployments',
        'Monitor system performance and ensure high availability',
        'Implement security measures and compliance protocols',
        'Manage containerized applications and orchestration',
        'Automate infrastructure provisioning and configuration management',
        'Collaborate with development teams to optimize application performance',
        'Troubleshoot and resolve infrastructure and deployment issues',
        'Maintain disaster recovery and backup systems',
      ],
      benefits: [
        'Competitive salary with performance bonuses',
        'Comprehensive health benefits package',
        'Remote-first work environment with flexible hours',
        'Professional certification support and training budget',
        'State-of-the-art cloud infrastructure to work with',
        'Collaborative team culture with growth opportunities',
        'Stock options and equity participation',
        'Generous vacation policy and mental health support',
      ],
    },
  ]

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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-bcgov-blue/5 to-bcgov-gold/5 dark:from-gray-900 dark:to-gray-800">
      <motion.div
        className="container mx-auto px-4 py-12 max-w-6xl"
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
          <h1 className="text-4xl md:text-5xl font-bold text-bcgov-blue dark:text-white mb-4">Join Our Team</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Help us build the future of digital identity. We're looking for passionate professionals to join our mission
            of empowering individuals with secure, self-sovereign identity solutions.
          </p>
        </motion.div>

        {/* Company Culture Section */}
        <motion.div variants={itemVariants} className="mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-bcgov-blue dark:text-bcgov-gold mb-6 text-center">
              Why Work With Us?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-bcgov-blue/10 dark:bg-bcgov-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-bcgov-blue dark:text-bcgov-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Cutting-Edge Technology</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Work with the latest technologies in blockchain, cryptography, and digital identity
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-bcgov-blue/10 dark:bg-bcgov-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-bcgov-blue dark:text-bcgov-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Collaborative Culture</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Join a diverse, inclusive team that values innovation and continuous learning
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-bcgov-blue/10 dark:bg-bcgov-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-bcgov-blue dark:text-bcgov-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012-2v-1a2 2 0 012-2h1.945M15 12v-1a8 8 0 00-8-8h-1c-1.326 0-2.598.527-3.536 1.464l-.707.707A1 1 0 003 6.414V9a7.014 7.014 0 003.055 5.8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Meaningful Impact</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Build solutions that protect privacy and empower individuals worldwide
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Job Postings */}
        <motion.div variants={itemVariants} className="space-y-8">
          <h2 className="text-3xl font-bold text-bcgov-blue dark:text-white text-center mb-8">Open Positions</h2>

          {jobPostings.map((job) => (
            <motion.div
              key={job.id}
              variants={cardVariants}
              whileHover="hover"
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="p-8 md:p-12">
                {/* Job Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-bcgov-blue dark:text-white mb-2">{job.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {job.department}
                      </span>
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {job.location}
                      </span>
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {job.type}
                      </span>
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {job.experience}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <Link
                      to="/contact"
                      onClick={() => handleApplyClick(job.title)}
                      className="inline-flex items-center px-6 py-3 bg-bcgov-blue hover:bg-bcgov-blue/90 dark:bg-bcgov-gold dark:hover:bg-bcgov-gold/90 text-white dark:text-gray-900 font-semibold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                      Apply Now
                      <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>

                {/* Job Description */}
                <div className="mb-6">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{job.description}</p>
                </div>

                {/* Job Details Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                  {/* Requirements */}
                  <div>
                    <h4 className="text-lg font-semibold text-bcgov-blue dark:text-bcgov-gold mb-3">Requirements</h4>
                    <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      {job.requirements.map((req, reqIndex) => (
                        <li key={reqIndex} className="flex items-start">
                          <svg
                            className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Responsibilities */}
                  <div>
                    <h4 className="text-lg font-semibold text-bcgov-blue dark:text-bcgov-gold mb-3">
                      Responsibilities
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      {job.responsibilities.slice(0, 6).map((resp, respIndex) => (
                        <li key={respIndex} className="flex items-start">
                          <svg
                            className="w-4 h-4 text-bcgov-blue dark:text-bcgov-gold mr-2 mt-0.5 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {resp}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Benefits */}
                  <div>
                    <h4 className="text-lg font-semibold text-bcgov-blue dark:text-bcgov-gold mb-3">Benefits</h4>
                    <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      {job.benefits.slice(0, 6).map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-start">
                          <svg
                            className="w-4 h-4 text-bcgov-gold mr-2 mt-0.5 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div variants={itemVariants} className="mt-16 text-center">
          <div className="bg-gradient-to-r from-bcgov-blue to-bcgov-gold p-8 rounded-2xl text-white">
            <h3 className="text-2xl font-bold mb-4">Don't See the Perfect Role?</h3>
            <p className="text-lg mb-6 opacity-90">
              We're always looking for talented individuals. Send us your resume and tell us how you'd like to
              contribute.
            </p>
            <Link
              to="/contact"
              onClick={() => handleApplyClick('General Application')}
              className="inline-flex items-center px-8 py-3 bg-white text-bcgov-blue font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Get in Touch
              <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
