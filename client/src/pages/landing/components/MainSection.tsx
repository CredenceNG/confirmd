import { trackSelfDescribingEvent } from '@snowplow/browser-tracker'
import { motion } from 'framer-motion'
import React from 'react'
import { isMobile } from 'react-device-detect'
import { FiExternalLink, FiArrowRight } from 'react-icons/fi'
import { useNavigate, useParams } from 'react-router-dom'

import { buttonHover, fade, fadeDelay, landingTitle } from '../../../FramerAnimations'
import landingScreen from '../../../assets/light/landing-screen.svg'
import { useAppDispatch } from '../../../hooks/hooks'
import { useDarkMode } from '../../../hooks/useDarkMode'
import { setOnboardingStep } from '../../../slices/onboarding/onboardingSlice'
import { basePath } from '../../../utils/BasePath'
import { addOnboardingProgress } from '../../../utils/OnboardingUtils'

export const MainSection: React.FC = () => {
  const darkMode = useDarkMode()
  const dispatch = useAppDispatch()
  const { slug } = useParams()

  const navigate = useNavigate()

  const handleStart = () => {
    trackSelfDescribingEvent({
      event: {
        schema: 'iglu:ca.bc.gov.digital/action/jsonschema/1-0-0',
        data: {
          action: 'next',
          path: 'shared',
          step: "Let's get started",
        },
      },
    })
    if (slug) {
      navigate(`/demo/${slug}`)
    } else {
      navigate(`/demo`)
    }
  }

  const handleConfirmedPerson = () => {
    trackSelfDescribingEvent({
      event: {
        schema: 'iglu:ca.bc.gov.digital/action/jsonschema/1-0-0',
        data: {
          action: 'start_confirmed_person',
          path: 'shared',
          step: 'Confirmed Person',
        },
      },
    })
    navigate(`/confirmd`)
  }

  const renderMobileTitle = (
    <motion.div className="flex-1 dark:text-white text-left text-4xl font-semibold my-8 leading-snug ">
      <div className="overflow-hidden py-1">
        <motion.h1 variants={landingTitle}>ConfirmD Wallet - Digital Trust Wallet</motion.h1>
      </div>
      <div className="overflow-hidden">
        <motion.h2 variants={fade} className="text-lg font-normal mt-6 dark:text-bcgov-lightgrey text-bcgov-darkgrey">
          Explore how you can use ConfirmD Wallet to prove things about yourself, in a way that's safe and secure.
        </motion.h2>
      </div>
      <div className="flex flex-col justify-center text-base sxl:text-lg font-normal mt-6 m-auto">
        <motion.button
          variants={fade}
          whileHover={buttonHover}
          className="bg-bcgov-blue dark:bg-bcgov-white text-bcgov-white dark:text-bcgov-black py-3 px-5 mx-8 rounded-lg font-semibold shadow-sm dark:shadow-none select-none "
          onClick={handleStart}
        >
          Showcase &nbsp;
          <FiArrowRight className="inline h-6 pb-1" />
        </motion.button>
        <motion.button
          variants={fade}
          whileHover={buttonHover}
          className="bg-bcgov-gold dark:bg-bcgov-gold text-bcgov-black dark:text-bcgov-black py-3 px-5 mx-8 mt-4 rounded-lg font-semibold shadow-sm dark:shadow-none select-none"
          onClick={handleConfirmedPerson}
        >
          Get Confirmed Person &nbsp;
          <FiArrowRight className="inline h-6 pb-1" />
        </motion.button>
        <motion.button
          variants={fade}
          whileHover={buttonHover}
          className="bg-white dark:bg-bcgov-blue text-black dark:text-white py-3 px-5 mx-8 mt-4 rounded-lg font-semibold shadow-sm dark:shadow-none select-none "
          onClick={() => null}
        >
          Get to know us &nbsp;
          <FiExternalLink className="inline h-6 pb-1" />
        </motion.button>
      </div>
    </motion.div>
  )

  const renderDesktopTitle = (
    <motion.div className="flex-1 text-left text-bcgov-black dark:text-bcgov-white font-semibold text-4xl lg:text-5xl xl:text-6xl m-auto">
      <div className="overflow-hidden py-1 leading-tight">
        <motion.h1 variants={landingTitle}>ConfirmD</motion.h1>
      </div>
      <div className="overflow-hidden py-1">
        <motion.h1 variants={fade} className="text-bcgov-blue dark:text-bcgov-white text-lg font-light italic">
          Your Digital Trust Wallet
        </motion.h1>
      </div>

      <div className="overflow-hidden">
        <motion.h2
          variants={fadeDelay}
          className="text-base lg:text-lg font-normal mt-6 dark:text-bcgov-lightgrey text-bcgov-darkgrey"
        >
          Explore how you can use ConfirmD Wallet to prove things about yourself, in a way that's safe and secure.
        </motion.h2>
      </div>
      <div className="flex flex-col md:flex-row justify-start text-base sxl:text-lg font-normal mt-6 gap-3">
        <motion.button
          variants={fadeDelay}
          whileHover={buttonHover}
          className="bg-bcgov-blue dark:bg-bcgov-white text-bcgov-white dark:text-bcgov-black py-3 px-5 rounded-lg font-semibold shadow-sm dark:shadow-none select-none"
          onClick={handleStart}
        >
          Showcase &nbsp;
          <FiArrowRight className="inline h-6 pb-1" />
        </motion.button>
        <motion.button
          variants={fadeDelay}
          whileHover={buttonHover}
          className="bg-bcgov-gold dark:bg-bcgov-gold text-bcgov-black dark:text-bcgov-black py-3 px-5 rounded-lg font-semibold shadow-sm dark:shadow-none select-none"
          onClick={handleConfirmedPerson}
        >
          Get Confirmd &nbsp;
          <FiArrowRight className="inline h-6 pb-1" />
        </motion.button>
        <a href="https://credence.com.ng" target="_blank">
          <motion.button
            variants={fadeDelay}
            whileHover={buttonHover}
            className="bg-white dark:bg-bcgov-blue text-black dark:text-white py-3 px-5 rounded-lg font-semibold shadow-sm dark:shadow-none select-none"
          >
            <p className="inline">Get to know us &nbsp;</p>
            <FiExternalLink className="inline h-6 pb-1" />
          </motion.button>
        </a>
      </div>
    </motion.div>
  )

  return (
    <motion.div
      className="flex flex-col md:flex-row dark:text-white flex-grow"
      initial="hidden"
      animate="show"
      exit="exit"
    >
      {isMobile ? renderMobileTitle : renderDesktopTitle}
      <div className="flex justify-center flex-grow">
        <img className="m-5 max-w-lg" src={landingScreen} alt="bcgov-phone-light" />
      </div>
    </motion.div>
  )
}
