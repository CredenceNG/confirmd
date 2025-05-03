import { trackPageView } from '@snowplow/browser-tracker'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { page } from '../../FramerAnimations'
import { useAppDispatch } from '../../hooks/hooks'
import { useTitle } from '../../hooks/useTitle'
import { useConfirmedPerson } from '../../slices/confirmedPerson/confirmedPersonSelectors'
import { useConnection } from '../../slices/connection/connectionSelectors'
import { clearConnection } from '../../slices/connection/connectionSlice'
import { clearCredentials } from '../../slices/credentials/credentialsSlice'
import { basePath } from '../../utils/BasePath'

import { ConfirmedPersonContainer } from './ConfirmedPersonContainer'
import { ConfirmedPersonStepper } from './components/ConfirmedPersonStepper'

export const ConfirmedPersonPage: React.FC = () => {
  useTitle('Confirmed Person | Confamd Wallet Self-Sovereign Identity Demo')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { step, isCompleted } = useConfirmedPerson()
  const { state, invitationUrl, id } = useConnection()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (isCompleted) {
      dispatch(clearCredentials())
      dispatch(clearConnection())
      navigate(`/dashboard`)
    } else {
      setMounted(true)
    }
  }, [dispatch, navigate, isCompleted])

  useEffect(() => {
    trackPageView()
  }, [])

  return (
    <motion.div
      variants={page}
      initial="hidden"
      animate="show"
      exit="exit"
      className="container flex flex-col items-center p-4"
    >
      <ConfirmedPersonStepper step={step} />

      <AnimatePresence mode="wait">
        {mounted && (
          <ConfirmedPersonContainer
            step={step}
            connectionId={id}
            connectionState={state}
            invitationUrl={invitationUrl}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}
