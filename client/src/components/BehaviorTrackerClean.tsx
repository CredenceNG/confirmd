import React, { createContext, useContext, useEffect, useRef } from 'react'

import { useBehaviorTracking, usePageTracking } from '../hooks/useBehaviorTracking'

interface BehaviorTrackerProps {
  children: React.ReactNode
  enableTimeTracking?: boolean
  enableScrollTracking?: boolean
  trackInteractions?: boolean
  autoSendInterval?: number // in milliseconds, 0 to disable auto-send
}

interface TrackingContextType {
  trackClick: (element: string, properties?: Record<string, unknown>) => void
  trackFormSubmit: (formName: string, properties?: Record<string, unknown>) => void
  trackFormFieldFocus: (fieldName: string, properties?: Record<string, unknown>) => void
  trackError: (error: string, context: string, properties?: Record<string, unknown>) => void
  addUserTag: (key: string, value: string | number | boolean, source?: string) => void
  isTracking: boolean
  sessionId: string
  eventCount: number
}

export const TrackingContext = createContext<TrackingContextType | null>(null)

export const BehaviorTracker: React.FC<BehaviorTrackerProps> = ({
  children,
  enableTimeTracking = true,
  enableScrollTracking = true,
  trackInteractions = true,
  autoSendInterval = 30000, // 30 seconds
}) => {
  const {
    trackClick,
    trackFormSubmit,
    trackFormFieldFocus,
    trackError,
    addUserTag,
    sendAnalytics,
    isTracking,
    sessionId,
    eventCount,
  } = useBehaviorTracking()

  const autoSendIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Setup automatic page tracking
  usePageTracking({
    enableTimeTracking,
    enableScrollTracking,
    trackInteractions,
  })

  // Setup auto-send analytics
  useEffect(() => {
    if (autoSendInterval > 0) {
      autoSendIntervalRef.current = setInterval(() => {
        if (eventCount > 0) {
          sendAnalytics()
        }
      }, autoSendInterval)

      return () => {
        if (autoSendIntervalRef.current) {
          clearInterval(autoSendIntervalRef.current)
        }
      }
    }
  }, [autoSendInterval, sendAnalytics, eventCount])

  // Send analytics on page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (eventCount > 0) {
        // Use sendBeacon for more reliable sending on page unload
        if (typeof navigator.sendBeacon === 'function') {
          // sendBeacon would be implemented here
          console.log('Sending analytics via beacon on page unload')
        } else {
          sendAnalytics()
        }
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [sendAnalytics, eventCount])

  const contextValue: TrackingContextType = {
    trackClick,
    trackFormSubmit,
    trackFormFieldFocus,
    trackError,
    addUserTag,
    isTracking,
    sessionId,
    eventCount,
  }

  return <TrackingContext.Provider value={contextValue}>{children}</TrackingContext.Provider>
}

// Hook to use tracking context
export const useTracking = (): TrackingContextType => {
  const context = useContext(TrackingContext)
  if (!context) {
    throw new Error('useTracking must be used within a BehaviorTracker')
  }
  return context
}

// Enhanced button component with built-in tracking
interface TrackedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  trackingName: string
  trackingProperties?: Record<string, unknown>
}

export const TrackedButton: React.FC<TrackedButtonProps> = ({
  children,
  trackingName,
  trackingProperties = {},
  onClick,
  ...props
}) => {
  const { trackClick } = useTracking()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    trackClick(trackingName, trackingProperties)
    onClick?.(event)
  }

  return (
    <button {...props} onClick={handleClick}>
      {children}
    </button>
  )
}

// Enhanced form component with built-in tracking
interface TrackedFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  trackingName: string
  trackingProperties?: Record<string, unknown>
}

export const TrackedForm: React.FC<TrackedFormProps> = ({
  children,
  trackingName,
  trackingProperties = {},
  onSubmit,
  ...props
}) => {
  const { trackFormSubmit } = useTracking()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    trackFormSubmit(trackingName, trackingProperties)
    onSubmit?.(event)
  }

  return (
    <form {...props} onSubmit={handleSubmit}>
      {children}
    </form>
  )
}

// Enhanced input component with built-in tracking
interface TrackedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  trackingName: string
  trackingProperties?: Record<string, unknown>
}

export const TrackedInput: React.FC<TrackedInputProps> = ({
  trackingName,
  trackingProperties = {},
  onFocus,
  ...props
}) => {
  const { trackFormFieldFocus } = useTracking()

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    trackFormFieldFocus(trackingName, trackingProperties)
    onFocus?.(event)
  }

  return <input {...props} onFocus={handleFocus} />
}
