import { trackSelfDescribingEvent } from '@snowplow/browser-tracker'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { FiLogOut } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

import { fadeDelay, fadeExit } from '../../FramerAnimations'
import { DarkModeContainer } from '../../components/DarkModeContainer'
import { Modal } from '../../components/Modal'
import { useAppDispatch } from '../../hooks/hooks'
import { useConfirmedPerson } from '../../slices/confirmedPerson/confirmedPersonSelectors'
import { resetConfirmedPersonFlow, setStep } from '../../slices/confirmedPerson/confirmedPersonSlice'
import { clearConnection } from '../../slices/connection/connectionSlice'
import { useCredentials } from '../../slices/credentials/credentialsSelectors'
import { clearCredentials } from '../../slices/credentials/credentialsSlice'
import { basePath } from '../../utils/BasePath'
import { isConnected } from '../../utils/Helpers'
import { prependApiUrl } from '../../utils/Url'

import { ConfirmedPersonBottomNav } from './components/ConfirmedPersonBottomNav'
import { AcceptCredential } from './steps/AcceptCredential'
import { BasicSlide } from './steps/BasicSlide'
import { PersonInformation } from './steps/PersonInformation'
import { SetupCompleted } from './steps/SetupCompleted'
import { SetupConnection } from './steps/SetupConnection'
import { SetupStart } from './steps/SetupStart'

export interface Props {
  step: string
  connectionId?: string
  connectionState?: string
  invitationUrl?: string
}

export const ConfirmedPersonContainer: React.FC<Props> = ({ step, connectionId, connectionState, invitationUrl }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { personInformation } = useConfirmedPerson()
  const { issuedCredentials } = useCredentials()

  const connectionCompleted = isConnected(connectionState as string)
  const credentialName = 'ConfirmedPerson'
  const credentialsAccepted = issuedCredentials.includes(credentialName)

  const isBackDisabled = ['SETUP_START'].includes(step)
  const isForwardDisabled =
    (step.startsWith('CONNECT') && !connectionCompleted) ||
    (step === 'ACCEPT_CREDENTIAL' && !credentialsAccepted) ||
    (step === 'PERSON_INFORMATION' && !isPersonInformationComplete(personInformation))

  const nextStep = () => {
    trackSelfDescribingEvent({
      event: {
        schema: 'iglu:ca.bc.gov.digital/action/jsonschema/1-0-0',
        data: {
          action: 'next',
          path: 'confirmedperson',
          step: step,
        },
      },
    })

    const stepOrder = ['SETUP_START', 'PERSON_INFORMATION', 'CONNECT_WALLET', 'ACCEPT_CREDENTIAL', 'SETUP_COMPLETED']
    const currentIndex = stepOrder.indexOf(step)

    if (currentIndex !== -1 && currentIndex < stepOrder.length - 1) {
      dispatch(setStep(stepOrder[currentIndex + 1]))
    }
  }

  const prevStep = () => {
    trackSelfDescribingEvent({
      event: {
        schema: 'iglu:ca.bc.gov.digital/action/jsonschema/1-0-0',
        data: {
          action: 'back',
          path: 'confirmedperson',
          step: step,
        },
      },
    })

    const stepOrder = ['SETUP_START', 'PERSON_INFORMATION', 'CONNECT_WALLET', 'ACCEPT_CREDENTIAL', 'SETUP_COMPLETED']
    const currentIndex = stepOrder.indexOf(step)

    if (currentIndex > 0) {
      dispatch(setStep(stepOrder[currentIndex - 1]))
    }
  }

  useEffect(() => {
    if (step.startsWith('CONNECT') && connectionCompleted) {
      nextStep()
    }
  }, [connectionState])

  const getComponentToRender = (currentStep: string) => {
    if (currentStep === 'SETUP_START') {
      return <SetupStart key={currentStep} />
    } else if (currentStep === 'PERSON_INFORMATION') {
      return <PersonInformation key={currentStep} />
    } else if (currentStep.startsWith('CONNECT')) {
      return (
        <SetupConnection
          key={currentStep}
          connectionId={connectionId}
          skipIssuance={nextStep}
          nextSlide={nextStep}
          invitationUrl={invitationUrl}
          issuerName={'ConfirmDID'}
          newConnection
          disableSkipConnection={false}
          connectionState={connectionState}
        />
      )
    } else if (currentStep === 'ACCEPT_CREDENTIAL') {
      return (
        <AcceptCredential
          key={currentStep}
          connectionId={connectionId}
          credentialName={credentialName}
          personInformation={personInformation}
        />
      )
    } else if (currentStep === 'SETUP_COMPLETED') {
      return <SetupCompleted key={currentStep} />
    } else {
      return <BasicSlide />
    }
  }

  const getImageToRender = (currentStep: string) => {
    let image = ''

    if (currentStep === 'SETUP_START') {
      image = '/public/confirmed/goingDigital.svg'
    } else if (currentStep === 'PERSON_INFORMATION') {
      image = '/public/confirmed/student-fill-out.svg'
    } else if (currentStep === 'CONNECT_WALLET') {
      image = '/public/confirmed/scan.svg'
    } else if (currentStep === 'ACCEPT_CREDENTIAL') {
      image = '/public/confirmed/student-secure.svg'
    } else if (currentStep === 'SETUP_COMPLETED') {
      image = '/public/confirmed/onboarding-connect-light.svg'
    }

    return (
      <motion.img
        variants={fadeExit}
        initial="hidden"
        animate="show"
        exit="exit"
        className="p-4"
        key={currentStep}
        src={prependApiUrl(image)}
        alt={currentStep}
      />
    )
  }

  const onboardingCompleted = () => {
    if (connectionId) {
      navigate(`${basePath}/dashboard`)
      dispatch(clearCredentials())
      dispatch(clearConnection())
    } else {
      // something went wrong so reset
      navigate(`${basePath}/`)
      dispatch({ type: 'demo/RESET' })
    }
  }

  const style = isMobile ? { minHeight: '85vh' } : { minHeight: '680px', height: '75vh', maxHeight: '940px' }

  const [leaveModal, setLeaveModal] = useState(false)
  const LEAVE_MODAL_TITLE = 'Are you sure you want to leave?'
  const LEAVE_MODAL_DESCRIPTION = `Your progress will be lost and you'll be redirected to the homepage.`
  const showLeaveModal = () => setLeaveModal(true)
  const closeLeave = () => setLeaveModal(false)

  const leave = () => {
    trackSelfDescribingEvent({
      event: {
        schema: 'iglu:ca.bc.gov.digital/action/jsonschema/1-0-0',
        data: {
          action: 'leave',
          path: 'confirmedperson',
          step: step,
        },
      },
    })
    navigate(`${basePath}/`)
    dispatch(resetConfirmedPersonFlow())
    dispatch({ type: 'demo/RESET' })
  }

  return (
    <motion.div
      className="flex flex-row h-full justify-between bg-white dark:bg-bcgov-darkgrey rounded-lg p-2 w-full sxl:w-5/6 shadow"
      style={style}
    >
      <div className={`flex flex-col grid justify-items-end ${isMobile ? 'w-full' : 'w-2/3'} px-8`}>
        <div className="w-full">
          <motion.button onClick={showLeaveModal} variants={fadeDelay}>
            <FiLogOut className="inline h-12 cursor-pointer dark:text-white" />
          </motion.button>
        </div>

        <AnimatePresence mode="wait">{getComponentToRender(step)}</AnimatePresence>
        <ConfirmedPersonBottomNav
          step={step}
          nextStep={nextStep}
          prevStep={prevStep}
          forwardDisabled={isForwardDisabled}
          backDisabled={isBackDisabled}
          completed={onboardingCompleted}
        />
      </div>
      {!isMobile && (
        <div className="bg-bcgov-white dark:bg-bcgov-black hidden lg:flex lg:w-1/3 rounded-r-lg flex-col justify-center h-full select-none">
          <AnimatePresence mode="wait">{getImageToRender(step)}</AnimatePresence>
        </div>
      )}
      {leaveModal && (
        <Modal title={LEAVE_MODAL_TITLE} description={LEAVE_MODAL_DESCRIPTION} onOk={leave} onCancel={closeLeave} />
      )}
    </motion.div>
  )
}

// Helper function to check if person information is complete enough to proceed
function isPersonInformationComplete(personInfo: any) {
  return (
    personInfo.familyName &&
    personInfo.givenNames &&
    personInfo.dateOfBirth &&
    personInfo.gender &&
    personInfo.documentType &&
    personInfo.documentNumber &&
    personInfo.documentExpiryDate &&
    personInfo.nationality &&
    personInfo.documentIssuingBody
  )
}
