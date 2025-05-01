import { motion } from 'framer-motion'
import React from 'react'
import { FiCheck } from 'react-icons/fi'

import { fadeDelay } from '../../../FramerAnimations'

export const SetupCompleted: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="max-w-lg">
        <div className="flex justify-center mb-6">
          <motion.div variants={fadeDelay} initial="hidden" animate="show" className="bg-green-100 rounded-full p-3">
            <FiCheck className="text-green-500 h-12 w-12" />
          </motion.div>
        </div>

        <motion.h1
          variants={fadeDelay}
          initial="hidden"
          animate="show"
          className="title-font dark:text-white text-center text-2xl sm:text-3xl md:text-4xl mb-4"
        >
          Setup Completed!
        </motion.h1>

        <motion.p
          variants={fadeDelay}
          initial="hidden"
          animate="show"
          className="text-md dark:text-white sm:text-lg text-center mb-6"
        >
          You have successfully completed the setup process. Your Confirmed Person credential has been issued to your
          digital wallet.
        </motion.p>

        <motion.p
          variants={fadeDelay}
          initial="hidden"
          animate="show"
          className="text-md dark:text-white sm:text-lg text-center mb-6"
        >
          You can now use this credential to verify your identity with any service that accepts Confirmed Person
          credentials.
        </motion.p>
      </div>
    </div>
  )
}
