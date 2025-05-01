import React from 'react'
import { FaHome } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import { fadeDelay } from '../../../FramerAnimations'
import { basePath } from '../../../utils/BasePath'

interface Props {
  step: string
}

// Create a custom motion div component that doesn't use Framer Motion props
const CustomMotionDiv: React.FC<React.HTMLAttributes<HTMLDivElement> & { animateProps?: Record<string, unknown> }> = ({
  className,
  children,
  animateProps: _animateProps, // Prefix with underscore to indicate it's not used
  ...rest
}) => {
  return (
    <div className={className} {...rest}>
      {children}
    </div>
  )
}

export const ConfirmedPersonStepper: React.FC<Props> = ({ step }) => {
  const steps = ['SETUP_START', 'PERSON_INFORMATION', 'CONNECT_WALLET', 'ACCEPT_CREDENTIAL', 'SETUP_COMPLETED']
  const currentIndex = steps.indexOf(step)

  return (
    <div className="stepper-container flex w-full py-4 md:w-2/3 lg:w-1/2 max-w-xl">
      {steps.map((_, index) => {
        let status = 'pending'
        if (index <= currentIndex) {
          status = 'active'
        }
        return (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center">
              <CustomMotionDiv
                className={`rounded-full w-3 h-3 ${
                  status === 'active' ? 'bg-bcgov-blue dark:bg-bcgov-gold' : 'bg-gray-300 dark:bg-gray-700'
                }`}
                animateProps={{
                  initial: 'hidden',
                  animate: 'show',
                  variants: fadeDelay,
                }}
              ></CustomMotionDiv>
            </div>
            {index < steps.length - 1 && (
              <CustomMotionDiv
                className={`flex-auto h-px my-1.5 mx-2 ${
                  index < currentIndex ? 'bg-bcgov-blue dark:bg-bcgov-gold' : 'bg-gray-300 dark:bg-gray-700'
                }`}
                animateProps={{
                  initial: 'hidden',
                  animate: 'show',
                  variants: fadeDelay,
                }}
              ></CustomMotionDiv>
            )}
          </React.Fragment>
        )
      })}
      <Link
        to={`${basePath}/`}
        className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-bcgov-white hover:text-gray-900 transition-colors"
      >
        <FaHome className="h-5 w-5" />
        <span>Home</span>
      </Link>
    </div>
  )
}
