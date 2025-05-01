import { motion } from 'framer-motion'
import React from 'react'

import { fadeDelay } from '../../../FramerAnimations'

export const SetupStart: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col justify-start items-start">
      <div className="flex-1 w-full flex flex-col justify-center items-start">
        <motion.h1
          variants={fadeDelay}
          initial="hidden"
          animate="show"
          className="title-font dark:text-white self-center text-center text-2xl sm:text-3xl md:text-4xl mb-4"
        >
          Get your <b>Confirmd Person</b> Credential
        </motion.h1>

        <motion.p
          variants={fadeDelay}
          initial="hidden"
          animate="show"
          className="text-md dark:text-white sm:text-lg text-center mb-6 w-full max-w-2xl self-center"
        >
          The <b>Confirmd Person</b> is a Verifiable Digital Credential that allows you to prove information about you{' '}
          <i>digitally</i>. This Credential can be used for various services requiring proof of information.
        </motion.p>

        <motion.p
          variants={fadeDelay}
          initial="hidden"
          animate="show"
          className="text-md dark:text-white sm:text-lg text-center mb-4 w-full max-w-2xl self-center"
        >
          In this flow, you'll provide your personal information and receive the <b>Confirmd Person</b> digital
          credential in your wallet.
        </motion.p>

        <motion.p
          variants={fadeDelay}
          initial="hidden"
          animate="show"
          className="text-md dark:text-white sm:text-lg text-center mb-8 w-full max-w-2xl self-center"
        >
          Click "Next" to begin providing your information.
        </motion.p>
      </div>
    </div>
  )
}
