import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { FiExternalLink, FiCheckCircle } from 'react-icons/fi'

import { fade, fadeX } from '../../../FramerAnimations'
import { Button } from '../../../components/Button'
import { QRCode } from '../../../components/QRCode'
import { useAppDispatch } from '../../../hooks/hooks'
import { clearConnection, setConnection, setDeepLink } from '../../../slices/connection/connectionSlice'
import { createInvitation } from '../../../slices/connection/connectionThunks'
import { clearCredentials } from '../../../slices/credentials/credentialsSlice'
import { setOnboardingConnectionId } from '../../../slices/onboarding/onboardingSlice'
import { setConnectionDate } from '../../../slices/preferences/preferencesSlice'
import { useSocket } from '../../../slices/socket/socketSelector'
import { isConnected } from '../../../utils/Helpers'
import { prependApiUrl } from '../../../utils/Url'
import { StepInformation } from '../components/StepInformation'

export interface Props {
  connectionId?: string
  skipIssuance(): void
  nextSlide(): void
  invitationUrl?: string
  connectionState?: string
  newConnection?: boolean
  disableSkipConnection?: boolean
  issuerName: string
  title: string
  text: string
  backgroundImage?: string
  onConnectionComplete?: () => void
}

export const SetupConnection: React.FC<Props> = ({
  connectionId,
  skipIssuance,
  nextSlide,
  title,
  text,
  invitationUrl,
  connectionState,
  newConnection,
  issuerName,
  disableSkipConnection,
  backgroundImage,
  onConnectionComplete,
}) => {
  const deepLink = `confirmdwallet://aries_connection_invitation?${invitationUrl?.split('?')[1]}`
  const [connectionConfirmed, setConnectionConfirmed] = useState(false)
  const [isProcessingCredential, setIsProcessingCredential] = useState(false)

  const dispatch = useAppDispatch()

  const isCompleted = isConnected(connectionState as string)

  const { message } = useSocket()

  useEffect(() => {
    if (!isCompleted || newConnection) {
      dispatch(clearConnection())
      dispatch(createInvitation({ issuer: issuerName, goalCode: 'aries.vc.issue' }))
      dispatch(clearCredentials())
    }
  }, [])

  useEffect(() => {
    if (isCompleted && !connectionConfirmed) {
      setConnectionConfirmed(true)

      // Wait a moment to display the success message before proceeding
      setTimeout(() => {
        if (onConnectionComplete) {
          onConnectionComplete()
        }

        // Auto proceed to credential issuance after confirmation
        setIsProcessingCredential(true)
        setTimeout(() => {
          nextSlide()
        }, 2000)
      }, 1500)
    }
  }, [isCompleted])

  useEffect(() => {
    if (connectionId) {
      dispatch(setOnboardingConnectionId(connectionId))
      const date = new Date()
      dispatch(setConnectionDate(date))
    }
  }, [connectionId])

  useEffect(() => {
    if (!message || !message.endpoint || !message.state) {
      return
    }
    const { endpoint, state } = message
    if (endpoint === 'connections' && state === 'active') {
      dispatch(setConnection(message))
    }
  }, [message])

  const renderQRCode = (overlay?: boolean) => {
    return invitationUrl ? (
      <QRCode invitationUrl={invitationUrl} connectionState={connectionState} overlay={overlay} />
    ) : null
  }

  const handleDeepLink = () => {
    if (connectionId) {
      dispatch(setDeepLink())
      nextSlide()
      setTimeout(() => {
        window.location.href = deepLink
      }, 500)
    }
  }

  const renderCTA = !isCompleted ? (
    <motion.div variants={fade} key="openWallet">
      <>
        <p>
          Scan the QR-code with your <a href={deepLink}>wallet {isMobile && 'or'} </a>
        </p>
        {isMobile && (
          <a onClick={handleDeepLink} className="underline underline-offset-2 mt-2">
            open in wallet
            <FiExternalLink className="inline pb-1" />
          </a>
        )}
      </>
      {!disableSkipConnection && (
        <div className="my-5">
          <Button text="I Already Have my Credential" onClick={skipIssuance}></Button>
        </div>
      )}
    </motion.div>
  ) : (
    <motion.div variants={fade} key="ctaCompleted" className="flex flex-col items-center">
      <div className="flex items-center mb-3 text-green-600">
        <FiCheckCircle size={24} className="mr-2" />
        <p className="font-bold">Connection Established Successfully!</p>
      </div>
      {isProcessingCredential ? (
        <p>Preparing to issue credential based on your information...</p>
      ) : (
        <Button text="Continue to Credential Issuance" onClick={nextSlide} />
      )}
    </motion.div>
  )

  return !backgroundImage || isMobile ? (
    <motion.div
      className="flex flex-col h-full  dark:text-white"
      variants={fadeX}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <StepInformation title={title} text={text} />
      <div className="max-w-xs flex flex-col self-center items-center bg-white rounded-lg p-4  dark:text-black">
        {!isCompleted ? (
          renderQRCode(true)
        ) : (
          <div className="py-4">
            <FiCheckCircle size={60} className="text-green-600 mx-auto" />
          </div>
        )}
      </div>
      <div className="flex flex-col mt-4 text-center text-sm md:text-base font-semibold">{renderCTA}</div>
    </motion.div>
  ) : (
    <motion.div
      className="flex flex-col h-full  dark:text-white"
      variants={fadeX}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <StepInformation title={title} text={text} />
      <div
        className="bg-contain position-relative bg-center bg-no-repeat h-full flex justify-center"
        style={{ backgroundImage: `url(${prependApiUrl(backgroundImage as string)})` }}
      >
        <div className="max-w-xs flex flex-col self-center items-center bg-white rounded-lg p-4  dark:text-black">
          {!isCompleted ? (
            <>
              <p className="text-center mb-2">Scan the QR Code below with your ConfirmD digital wallet.</p>
              <div>{renderQRCode(true)}</div>
              {!disableSkipConnection && (
                <div className="mt-5">
                  <Button text="I Already Have my Credential" onClick={skipIssuance}></Button>
                </div>
              )}
            </>
          ) : (
            <div className="py-4 flex flex-col items-center">
              <FiCheckCircle size={60} className="text-green-600 mb-3" />
              <p className="font-bold text-center">Connection Established Successfully!</p>
              {isProcessingCredential ? (
                <p className="text-center mt-3">Preparing to issue credential based on your information...</p>
              ) : (
                <div className="mt-4">
                  <Button text="Continue to Credential Issuance" onClick={nextSlide} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
