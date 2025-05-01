import type { Connection } from '../../../slices/types'

import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { FiCheck, FiExternalLink } from 'react-icons/fi' // Add icons import
import { useNavigate } from 'react-router-dom'

// Fix missing imports and incorrect imports
import { Button } from '../../../components/Button'
import { Loader } from '../../../components/Loader'
import { QRCode } from '../../../components/QRCode' // Changed from QrDisplay to QRCode
import { SmallButtonText } from '../../../components/SmallButtonText'
import { StateIndicator } from '../../../components/StateIndicator'
import { useAppDispatch } from '../../../hooks/hooks' // Removed useSocket as it's not exported
import { setConnectionId } from '../../../slices/confirmedPerson/confirmedPersonSlice'
import {
  // createInvitation, // Removed duplicate import
  setConnection,
  setDeepLink,
} from '../../../slices/connection/connectionSlice'
import { createInvitation } from '../../../slices/connection/connectionThunks' // Correct import
//  Import missing functions
import { setConnectionDate } from '../../../slices/preferences/preferencesSlice'
import { useSocket } from '../../../slices/socket/socketSelector'
import { basePath } from '../../../utils/BasePath'
import { isConnected } from '../../../utils/Helpers'

interface SmallButtonProps {
  onClick: () => void
  children: React.ReactNode
}

const fadeDelay = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { delay: 0.3 } },
}

// Custom SmallButton component
const CustomSmallButton: React.FC<SmallButtonProps> = ({ onClick, children }) => (
  <button onClick={onClick} className="text-bcgov-blue dark:text-bcgov-gold underline text-sm">
    {children}
  </button>
)

interface Props {
  connectionId?: string
  connectionState?: string
  invitationUrl?: string
  issuerName?: string
  nextSlide: () => void
  skipIssuance?: () => void
  disableSkipConnection: boolean
  newConnection: boolean
  title?: string
  text?: string
  backgroundImage?: string
}

export const SetupConnection: React.FC<Props> = ({
  connectionId,
  connectionState,
  invitationUrl,
  issuerName,
  nextSlide,
  skipIssuance,
  disableSkipConnection,
  newConnection,
  title = 'Connect Your Digital Wallet',
  text = 'Scan this QR code with your mobile wallet to establish a secure connection.',
}) => {
  const dispatch = useAppDispatch()
  const { message } = useSocket()
  const [isSkippingConnection, setIsSkippingConnection] = useState(false)
  const [isConnectionEstablished, setIsConnectionEstablished] = useState(false)
  const [isReadyForCredential, setIsReadyForCredential] = useState(false)
  const [autoProceed, setAutoProceed] = useState(false)
  const deepLink = invitationUrl ? `bcwallet://aries_connection_invitation?${invitationUrl.split('?')[1]}` : ''

  // Track connection status reactively
  const isConnectionActive = isConnected(connectionState as string)

  console.log('[SetupConnection] Current connection state:', { connectionState, isConnectionActive })

  // Initialize connection on component mount
  useEffect(() => {
    if (newConnection) {
      console.log('[SetupConnection] Creating new connection invitation')

      // Clear any existing connection first
      // dispatch(clearConnection()) // Removed as it's not exported

      // Create invitation with more specific parameters
      const invitationParams = {
        issuer: issuerName || 'ConfirmDID',
        goalCode: 'aries.vc.issue',
        // Adding image URL might help with wallet recognition
        imageUrl: 'https://confirmedid.com/logo.png',
      }

      console.log('[SetupConnection] Invitation parameters:', invitationParams)
      dispatch(createInvitation(invitationParams))

      // Log timing information for debugging
      console.log('[SetupConnection] Invitation creation requested at:', new Date().toISOString())
    }
  }, [dispatch, newConnection, issuerName])

  // Track connection ID changes
  useEffect(() => {
    if (connectionId) {
      console.log('[SetupConnection] Setting connection ID:', connectionId)
      dispatch(setConnectionId(connectionId))

      // Track connection date (like in onboarding flow)
      const date = new Date()
      dispatch(setConnectionDate(date))
    }
  }, [connectionId, dispatch])

  // Listen for connection messages from webhook
  useEffect(() => {
    if (!message) return

    // More detailed message logging
    console.log('[SetupConnection] Socket message received:', JSON.stringify(message, null, 2))

    if (!message.endpoint || !message.state) {
      console.log('[SetupConnection] Message missing endpoint or state:', message)
      return
    }

    const { endpoint, state, connection_id } = message
    console.log(`[SetupConnection] Processing ${endpoint} message with state: ${state}`)

    if (endpoint === 'connections') {
      // Log all connection state transitions
      console.log(`[SetupConnection] Connection state change: ${state} for ID: ${connection_id || 'unknown'}`)

      if (state === 'active') {
        console.log('[SetupConnection] Connection is now active, updating UI state')
        dispatch(setConnection(message))
        setIsConnectionEstablished(true)
      } else if (state === 'response' || state === 'request') {
        console.log('[SetupConnection] Connection in progress:', state)
        // We can track intermediate states here if needed
      }
    }
  }, [message, dispatch])

  // Update connection status whenever connectionState prop changes
  useEffect(() => {
    console.log('[SetupConnection] Connection state changed:', connectionState)
    if (isConnected(connectionState as string) && !isConnectionEstablished) {
      setIsConnectionEstablished(true)
    }
  }, [connectionState, isConnectionEstablished])

  // Handle automatic progression after connection is established
  useEffect(() => {
    if (isConnectionEstablished) {
      console.log('[SetupConnection] Connection established, preparing to progress')
      // Wait a moment to show the success state before proceeding
      setTimeout(() => {
        setAutoProceed(true)
        setIsReadyForCredential(true)

        // Auto proceed to credential issuance after connection with a delay to show success state
        setTimeout(() => {
          console.log('[SetupConnection] Automatically advancing to next step')
          nextSlide()
        }, 2000)
      }, 1500)
    }
  }, [isConnectionEstablished, nextSlide])

  const skipConnection = () => {
    setIsSkippingConnection(true)
    if (skipIssuance) {
      skipIssuance()
    }
  }

  const handleDeepLink = () => {
    if (connectionId) {
      dispatch(setDeepLink())
      setTimeout(() => {
        window.location.href = deepLink
      }, 500)
    }
  }

  const handleIssueCredential = () => {
    setIsReadyForCredential(true)
    nextSlide()
  }

  const renderQRCode = () => {
    return invitationUrl ? (
      <QRCode invitationUrl={invitationUrl} connectionState={connectionState} overlay={true} />
    ) : null
  }

  const renderConnectionContent = () => {
    if (isConnectionEstablished) {
      return (
        <motion.div
          variants={fadeDelay}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center justify-center mb-6"
        >
          <div className="max-w-md flex flex-col items-center bg-white rounded-lg p-6 dark:text-black">
            <div className="flex items-center justify-center mb-4">
              <FiCheck size={48} className="text-green-500 mr-2" />
              <h2 className="text-2xl font-bold">Connection Established!</h2>
            </div>

            <p className="text-center mb-6">
              Your wallet is now securely connected.{' '}
              {autoProceed
                ? 'Proceeding to credential issuance...'
                : "You're ready to receive your Confirmed Person credential."}
            </p>

            {!autoProceed && <Button text="Issue My Credential" onClick={handleIssueCredential} />}
          </div>
        </motion.div>
      )
    }

    return (
      <>
        <motion.div
          variants={fadeDelay}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center justify-center mb-6"
        >
          <div className="max-w-xs flex flex-col items-center bg-white rounded-lg p-4 dark:text-black">
            <p className="text-center mb-2">Scan the QR Code with your wallet app</p>
            {renderQRCode()}
          </div>

          {isMobile && (
            <div className="mt-3 text-center">
              <a
                onClick={handleDeepLink}
                className="underline underline-offset-2 text-bcgov-blue dark:text-bcgov-gold cursor-pointer"
              >
                Open in wallet app
                <FiExternalLink className="inline pb-1 ml-1" />
              </a>
            </div>
          )}
        </motion.div>

        {!disableSkipConnection && (
          <motion.div variants={fadeDelay} initial="hidden" animate="show" className="self-center max-w-lg">
            <CustomSmallButton onClick={skipConnection}>Skip Connection</CustomSmallButton>
          </motion.div>
        )}
      </>
    )
  }

  const renderContent = () => {
    return (
      <>
        <motion.h1
          variants={fadeDelay}
          initial="hidden"
          animate="show"
          className="title-font dark:text-white text-center text-2xl sm:text-3xl md:text-4xl mb-4"
        >
          {isConnectionEstablished ? 'Connection Successful' : title}
        </motion.h1>

        <motion.p
          variants={fadeDelay}
          initial="hidden"
          animate="show"
          className="text-md dark:text-white sm:text-lg text-center mb-6 w-full max-w-2xl self-center"
        >
          {isConnectionEstablished ? 'Your wallet is now connected. You can proceed to receive your credential.' : text}
        </motion.p>

        {renderConnectionContent()}
      </>
    )
  }

  if (isSkippingConnection) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center">
        <motion.p
          variants={fadeDelay}
          initial="hidden"
          animate="show"
          className="text-md dark:text-white sm:text-lg text-center mb-6"
        >
          You've chosen to skip connecting to a digital wallet.
        </motion.p>
      </div>
    )
  }

  if (isReadyForCredential) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center">
        <motion.div variants={fadeDelay} initial="hidden" animate="show" className="flex flex-col items-center">
          <h2 className="text-xl dark:text-white mb-4">Preparing your credential...</h2>
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-transparent border-bcgov-blue dark:border-bcgov-gold"></div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <motion.div className="flex-1 w-full flex flex-col justify-center items-start">{renderContent()}</motion.div>
    </div>
  )
}
