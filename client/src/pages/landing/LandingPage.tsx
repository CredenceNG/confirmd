import { motion } from 'framer-motion'
import React from 'react'

import { page } from '../../FramerAnimations'
import { Footer } from '../../components/Footer'
import { Header } from '../../components/Header'
import { useTitle } from '../../hooks/useTitle'

import { MainSection } from './components/MainSection'

export const LandingPage: React.FC = () => {
  useTitle('Wallet Showcase')
  return (
    <motion.div
      className="flex flex-col min-h-screen bg-white dark:bg-blue-900"
      variants={page}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <Header activePage="personal" />
      <div className="container mx-auto px-4 flex-grow">
        <MainSection />
      </div>
      <Footer />
    </motion.div>
  )
}
