import { motion } from 'framer-motion'
import React from 'react'

import { fadeDelay } from '../../../FramerAnimations'

export const BasicSlide: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center">
      <motion.h1
        variants={fadeDelay}
        initial="hidden"
        animate="show"
        className="title-font dark:text-white text-center text-2xl sm:text-3xl md:text-4xl mb-4"
      >
        Basic Step
      </motion.h1>

      <motion.p
        variants={fadeDelay}
        initial="hidden"
        animate="show"
        className="text-md dark:text-white sm:text-lg text-center mb-6"
      >
        This is a basic step in the Confirmed Person flow.
      </motion.p>
    </div>
  )
}
