import type { PersonInformation } from '../../../slices/confirmedPerson/confirmedPersonSlice'
import type { Credential } from '../../../slices/types'

import { AnimatePresence, motion } from 'framer-motion'
import { track } from 'insights-js'
import { startCase } from 'lodash'
import React, { useEffect, useState } from 'react'
import { FiCheckCircle } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

import { fadeDelay, fade, fadeX } from '../../../FramerAnimations'
import { getOrCreateCredDefId } from '../../../api/CredentialApi'
import { ActionCTA } from '../../../components/ActionCTA'
import { Loader } from '../../../components/Loader'
import { Modal } from '../../../components/Modal'
import { StateIndicator } from '../../../components/StateIndicator'
import { useAppDispatch } from '../../../hooks/hooks'
import { useConnection } from '../../../slices/connection/connectionSelectors'
import { useCredentials } from '../../../slices/credentials/credentialsSelectors'
import { setCredential } from '../../../slices/credentials/credentialsSlice'
import { issueCredential, issueDeepCredential } from '../../../slices/credentials/credentialsThunks'
import { useSocket } from '../../../slices/socket/socketSelector'
import { basePath } from '../../../utils/BasePath'

interface Props {
  connectionId?: string
  credentialName: string
  personInformation: PersonInformation
  onCredentialAccepted?: () => void
}

// Custom component to display credential status
const CredentialStatus = ({ name, icon, issued }: { name: string; icon: string; issued: boolean }) => (
  <div className="flex-1 flex flex-row items-center justify-between my-2 bg-white dark:bg-bcgov-black p-4 rounded-lg shadow">
    <div className="bg-bcgov-lightgrey rounded-lg p-2 w-12">
      <img className="h-8 m-auto" src={'/public/student/icon-student.svg'} alt="icon" />
    </div>
    <div className="flex-1 px-4 justify-self-start dark:text-white text-sm sm:text-base">
      <p>{startCase(name)}</p>
    </div>
    <StateIndicator completed={issued} />
  </div>
)

export const AcceptCredential: React.FC<Props> = ({
  connectionId,
  credentialName,
  personInformation,
  onCredentialAccepted,
}) => {
  console.log('[AcceptCredential] Rendering component with props:', { connectionId, credentialName })

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  // State management
  const [isRejectedModalOpen, setIsRejectedModalOpen] = useState(false)
  const [isFailedRequestModalOpen, setIsFailedRequestModalOpen] = useState(false)
  const [credentialsIssued, setCredentialsIssued] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  // Selectors
  const { isIssueCredentialLoading, error, issuedCredentials } = useCredentials()
  const { isDeepLink } = useConnection()
  const { message } = useSocket()

  // Check if credential is issued
  const issuedCredentialsStartCase = issuedCredentials.map((name) => startCase(name))
  const credentialAccepted =
    issuedCredentials.includes(credentialName) || issuedCredentialsStartCase.includes(startCase(credentialName))

  console.log('[AcceptCredential] Check credential acceptance:', {
    credentialName,
    startCaseName: startCase(credentialName),
    issuedCredentials,
    issuedCredentialsStartCase,
    credentialAccepted,
  })

  // Process credential attributes - updated to match onboarding flow format
  const getCredentialObject = (): Credential => {
    // Convert compound names to individual fields that Aries expects
    const attributes = [
      { name: 'family_name', value: personInformation.familyName },
      { name: 'given_names', value: personInformation.givenNames },
      { name: 'date_of_birth', value: personInformation.dateOfBirth },
      { name: 'gender', value: personInformation.gender },
      { name: 'document_type', value: personInformation.documentType },
      { name: 'document_number', value: personInformation.documentNumber },
      { name: 'document_expiry_date', value: personInformation.documentExpiryDate },
      { name: 'nationality', value: personInformation.nationality },
      { name: 'issuing_authority', value: personInformation.documentIssuingBody },
    ]

    // Match the expected credential format from the onboarding flow
    return {
      name: credentialName, // Use the prop name instead of hardcoding 'confirmed_person'
      icon: '/public/student/icon-student.svg',
      version: '2.0',
      attributes,
    }
  }

  // Issue credential on component mount - simplified to match onboarding flow
  useEffect(() => {
    // Only issue credential if we haven't already done so
    if (connectionId && !credentialsIssued) {
      console.log('[AcceptCredential] Initiating credential issuance')
      const credentialObj = getCredentialObject()

      // Using the simpler pattern that works in onboarding flow
      ;(async () => {
        try {
          console.log('[AcceptCredential] Getting credential definition ID for', credentialObj.name)
          const credDefIdResponse = await getOrCreateCredDefId(credentialObj)
          const credDefId = credDefIdResponse.data

          console.log('[AcceptCredential] Received credDefId:', credDefId)
          console.log('[AcceptCredential] Issuing credential with params:', {
            connectionId,
            credDefId,
            credentialName: credentialObj.name,
          })

          if (isDeepLink) {
            dispatch(issueDeepCredential({ connectionId, cred: credentialObj, credDefId }))
          } else {
            dispatch(issueCredential({ connectionId, cred: credentialObj, credDefId }))
          }

          track({
            id: 'credential_issued',
          })

          setCredentialsIssued(true)
        } catch (error) {
          console.error('[AcceptCredential] Error in credential issuance process:', error)
          // Type assertion to safely access error.message
          const errorMessage = error instanceof Error ? error.message : 'Unknown error'
          setErrorMsg(`Error getting credential definition: ${errorMessage}`)
          setIsRejectedModalOpen(true)
        }
      })()
    }
  }, [connectionId, credentialsIssued])

  // Handle credential acceptance callback
  useEffect(() => {
    if (credentialAccepted && onCredentialAccepted) {
      onCredentialAccepted()
    }
  }, [credentialAccepted, onCredentialAccepted])

  // Handle credential timeout
  const handleCredentialTimeout = () => {
    if (!isIssueCredentialLoading || !error) return
    setErrorMsg(
      `The request timed out. We're sorry, but you're going to have to restart. If this issue persists, please contact us.`
    )
    setIsRejectedModalOpen(true)
  }

  // Set timeout for credential issuance
  useEffect(() => {
    if (credentialsIssued) {
      console.log('[AcceptCredential] Setting timeout for credential issuance')
      const timeoutId = setTimeout(() => {
        handleCredentialTimeout()
      }, 10000)

      return () => clearTimeout(timeoutId)
    }
  }, [credentialsIssued, isIssueCredentialLoading])

  // Handle errors
  useEffect(() => {
    if (error) {
      console.error('[AcceptCredential] Error detected:', error)
      const msg = error.message ?? 'Issue Credential Error'
      setErrorMsg(
        `The request has failed with the following error: ${msg}. We're sorry, but you're going to have to restart. If this issue persists, please contact us.`
      )
      setIsRejectedModalOpen(true)
    }
  }, [error])

  // Process socket messages for credential issuance
  useEffect(() => {
    if (!message || !message.endpoint || !message.state) {
      return
    }

    console.log('[AcceptCredential] Processing socket message:', message)
    const { endpoint, state } = message
    if (endpoint === 'issue_credential' && state === 'credential_issued') {
      console.log('[AcceptCredential] Credential issued successfully:', message)
      dispatch(setCredential(message))
    }
  }, [message, dispatch])

  // Error handling
  const routeError = () => {
    console.log('[AcceptCredential] Routing to home due to error')
    navigate(`/`)
    dispatch({ type: 'demo/RESET' })
  }

  // Retry credential issuance
  const sendNewCredentials = () => {
    console.log('[AcceptCredential] Retrying credential issuance')
    setCredentialsIssued(false)
    setIsFailedRequestModalOpen(false)
  }

  // UI rendering for credential status
  const showFailedRequestModal = () => setIsFailedRequestModalOpen(true)
  const closeFailedRequestModal = () => setIsFailedRequestModalOpen(false)

  return (
    <motion.div className="flex flex-col h-full" variants={fadeX} initial="hidden" animate="show" exit="exit">
      <div className="flex flex-col p-6">
        <motion.h1
          variants={fadeDelay}
          initial="hidden"
          animate="show"
          className="title-font dark:text-white text-center text-2xl sm:text-3xl md:text-4xl mb-4"
        >
          Accept Your Confirmed Person Credential
        </motion.h1>

        <motion.p
          variants={fadeDelay}
          initial="hidden"
          animate="show"
          className="text-md dark:text-white sm:text-lg text-center mb-6 w-full max-w-2xl self-center"
        >
          We've prepared your Confirmed Person credential with the information you provided. Check your wallet to accept
          it.
        </motion.p>
      </div>

      <div className="flex flex-row m-auto content-center">
        {connectionId ? (
          <>
            <AnimatePresence mode="wait">
              <motion.div className="flex flex-1 flex-col m-auto" variants={fade} animate="show" exit="exit">
                <div className="flex flex-col bg-bcgov-white dark:bg-bcgov-black m-4 px-4 py-2 w-auto md:w-96 h-auto rounded-lg shadow">
                  <div className="flex-1-1 title mb-2">
                    <h1 className="font-bold dark:text-white">Confirmed Person Credential</h1>
                    <hr className="text-bcgov-lightgrey" />
                  </div>
                  <CredentialStatus
                    name={credentialName}
                    icon="/public/student/icon-student.svg"
                    issued={credentialAccepted}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </>
        ) : (
          <motion.div className="flex flex-col h-full m-auto">
            <Loader />
          </motion.div>
        )}
        {isFailedRequestModalOpen && (
          <Modal
            title={'Credential Issuance Failed'}
            description={'There was a problem issuing your credential. Would you like to try again?'}
            onOk={sendNewCredentials}
            onCancel={closeFailedRequestModal}
            okText="Try Again"
          />
        )}
        {isRejectedModalOpen && <Modal title={'Error'} description={errorMsg} onOk={routeError} />}
      </div>

      <ActionCTA isCompleted={credentialAccepted && connectionId !== undefined} onFail={showFailedRequestModal} />
    </motion.div>
  )
}
