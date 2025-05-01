import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'

import { fadeDelay, fadeExit } from '../../../FramerAnimations'
import { BackButton } from '../../../components/BackButton'
import { Button } from '../../../components/Button'

export interface Props {
  step: string
  nextStep: () => void
  prevStep: () => void
  forwardDisabled: boolean
  backDisabled: boolean
  completed: () => void
}

export const ConfirmedPersonBottomNav: React.FC<Props> = ({
  step,
  nextStep,
  prevStep,
  forwardDisabled,
  backDisabled,
  completed,
}) => {
  const [label, setLabel] = useState('NEXT')
  const isCompleted = step === 'SETUP_COMPLETED'
  const [loading, setLoading] = useState(false) // Added missing loading state

  useEffect(() => {
    if (isCompleted) {
      setLabel('FINISH')
    } else if (step === 'CONNECT_WALLET') {
      setLabel('SKIP')
    } else {
      setLabel('NEXT')
    }
  }, [isCompleted, step])

  return (
    <motion.div
      variants={fadeDelay}
      initial="hidden"
      animate="show"
      exit="exit"
      className="flex w-full justify-between mb-4 h-8 self-end select-none"
    >
      <div className="flex self-center">
        <BackButton onClick={prevStep} disabled={backDisabled} data-cy="prev-confirmed-person-step" />
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={label}
          variants={fadeExit}
          initial="hidden"
          animate="show"
          exit="exit"
          data-cy="next-confirmed-person-step"
        >
          <Button onClick={isCompleted ? completed : nextStep} text={label} disabled={forwardDisabled} />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}
