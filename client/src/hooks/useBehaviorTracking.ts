import type { RootState } from '../store/configureStore'

import { useCallback, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import {
  addTag,
  incrementConversion,
  incrementCredentials,
  incrementProofs,
  markOnboardingComplete,
  sendAnalyticsData,
  setAnalyticsEnabled,
  setTrackingEnabled,
  setUserId,
  trackEvent,
} from '../slices/behavior/behaviorSlice'
import { BehaviorEventType, DeviceType, UserType } from '../types/behavior'
import * as GA from '../utils/GoogleAnalytics'

interface UsePageTrackingOptions {
  enableTimeTracking?: boolean
  enableScrollTracking?: boolean
  trackInteractions?: boolean
}

interface DeviceInfo {
  type: DeviceType
  userAgent: string
  screenResolution: string
  language: string
}

export const useBehaviorTracking = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const behaviorState = useSelector((state: RootState) => state.behavior)

  // Get device info
  const getDeviceInfo = useCallback((): DeviceInfo => {
    const userAgent = navigator.userAgent
    const screenResolution = `${window.screen.width}x${window.screen.height}`
    const language = navigator.language

    let deviceType: DeviceType = DeviceType.DESKTOP
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
      deviceType = /iPad/.test(userAgent) ? DeviceType.TABLET : DeviceType.MOBILE
    }

    return {
      type: deviceType,
      userAgent,
      screenResolution,
      language,
    }
  }, [])

  // Track a behavior event
  const track = useCallback(
    (
      type: BehaviorEventType,
      category: string,
      action: string,
      label?: string,
      value?: number,
      properties: Record<string, unknown> = {}
    ) => {
      if (!behaviorState.isTracking) return

      const deviceInfo = getDeviceInfo()

      dispatch(
        trackEvent({
          type,
          category,
          action,
          label,
          value,
          properties: {
            ...properties,
            route: location.pathname,
          },
          page: {
            url: window.location.href,
            title: document.title,
            referrer: document.referrer,
          },
          user: {
            type: UserType.ANONYMOUS, // TODO: determine from auth state
            isAuthenticated: false, // TODO: get from auth state
            connectionId: undefined, // TODO: get from connection state
          },
          device: deviceInfo,
          context: {
            source: 'web-app',
            campaign: new URLSearchParams(location.search).get('utm_campaign') || undefined,
            medium: new URLSearchParams(location.search).get('utm_medium') || undefined,
          },
        })
      )

      // Also track in Google Analytics
      GA.trackEvent(action, category, label, value, {
        event_type: type,
        page_path: location.pathname,
        page_title: document.title,
        user_type: UserType.ANONYMOUS,
        device_type: deviceInfo.type,
        ...properties,
      })
    },
    [dispatch, location, behaviorState.isTracking, getDeviceInfo]
  )

  // Track page views
  const trackPageView = useCallback(
    (customProperties: Record<string, unknown> = {}) => {
      track(BehaviorEventType.PAGE_VIEW, 'navigation', 'page_view', location.pathname, undefined, {
        ...customProperties,
        timestamp: new Date().toISOString(),
      })
    },
    [track, location.pathname]
  )

  // Track user interactions
  const trackClick = useCallback(
    (element: string, properties: Record<string, unknown> = {}) => {
      track(BehaviorEventType.BUTTON_CLICK, 'interaction', 'click', element, undefined, properties)
    },
    [track]
  )

  const trackFormSubmit = useCallback(
    (formName: string, properties: Record<string, unknown> = {}) => {
      track(BehaviorEventType.FORM_SUBMIT, 'interaction', 'form_submit', formName, undefined, properties)
    },
    [track]
  )

  const trackFormFieldFocus = useCallback(
    (fieldName: string, properties: Record<string, unknown> = {}) => {
      track(BehaviorEventType.FORM_FIELD_FOCUS, 'interaction', 'field_focus', fieldName, undefined, properties)
    },
    [track]
  )

  // Track onboarding events
  const trackOnboardingStart = useCallback(
    (properties: Record<string, unknown> = {}) => {
      track(BehaviorEventType.ONBOARDING_START, 'onboarding', 'start', undefined, undefined, properties)
    },
    [track]
  )

  const trackOnboardingStep = useCallback(
    (step: string, properties: Record<string, unknown> = {}) => {
      track(BehaviorEventType.ONBOARDING_STEP_COMPLETE, 'onboarding', 'step_complete', step, undefined, properties)
    },
    [track]
  )

  const trackOnboardingComplete = useCallback(
    (properties: Record<string, unknown> = {}) => {
      track(BehaviorEventType.ONBOARDING_COMPLETE, 'onboarding', 'complete', undefined, undefined, properties)
      dispatch(markOnboardingComplete())
    },
    [track, dispatch]
  )

  const trackOnboardingAbandoned = useCallback(
    (step: string, properties: Record<string, unknown> = {}) => {
      track(BehaviorEventType.ONBOARDING_ABANDONED, 'onboarding', 'abandoned', step, undefined, properties)
    },
    [track]
  )

  // Track credential operations
  const trackCredentialRequest = useCallback(
    (credentialType: string, properties: Record<string, unknown> = {}) => {
      track(BehaviorEventType.CREDENTIAL_REQUEST, 'credential', 'request', credentialType, undefined, properties)
    },
    [track]
  )

  const trackCredentialAccept = useCallback(
    (credentialType: string, properties: Record<string, unknown> = {}) => {
      track(BehaviorEventType.CREDENTIAL_ACCEPT, 'credential', 'accept', credentialType, undefined, properties)
      dispatch(incrementCredentials())
    },
    [track, dispatch]
  )

  const trackCredentialReject = useCallback(
    (credentialType: string, properties: Record<string, unknown> = {}) => {
      track(BehaviorEventType.CREDENTIAL_REJECT, 'credential', 'reject', credentialType, undefined, properties)
    },
    [track]
  )

  // Track connection operations
  const trackConnectionInitiate = useCallback(
    (properties: Record<string, unknown> = {}) => {
      track(BehaviorEventType.CONNECTION_INITIATE, 'connection', 'initiate', undefined, undefined, properties)
    },
    [track]
  )

  const trackConnectionComplete = useCallback(
    (properties: Record<string, unknown> = {}) => {
      track(BehaviorEventType.CONNECTION_COMPLETE, 'connection', 'complete', undefined, undefined, properties)
      dispatch(incrementConversion())
    },
    [track, dispatch]
  )

  const trackConnectionFailed = useCallback(
    (error: string, properties: Record<string, unknown> = {}) => {
      track(BehaviorEventType.CONNECTION_FAILED, 'connection', 'failed', error, undefined, properties)
    },
    [track]
  )

  const trackQRCodeScan = useCallback(
    (properties: Record<string, unknown> = {}) => {
      track(BehaviorEventType.QR_CODE_SCAN, 'connection', 'qr_scan', undefined, undefined, properties)
    },
    [track]
  )

  // Track proof operations
  const trackProofRequest = useCallback(
    (proofType: string, properties: Record<string, unknown> = {}) => {
      track(BehaviorEventType.PROOF_REQUEST, 'proof', 'request', proofType, undefined, properties)
    },
    [track]
  )

  const trackProofSubmit = useCallback(
    (proofType: string, properties: Record<string, unknown> = {}) => {
      track(BehaviorEventType.PROOF_SUBMIT, 'proof', 'submit', proofType, undefined, properties)
    },
    [track]
  )

  const trackProofVerified = useCallback(
    (proofType: string, properties: Record<string, unknown> = {}) => {
      track(BehaviorEventType.PROOF_VERIFIED, 'proof', 'verified', proofType, undefined, properties)
      dispatch(incrementProofs())
    },
    [track, dispatch]
  )

  const trackProofFailed = useCallback(
    (proofType: string, error: string, properties: Record<string, unknown> = {}) => {
      track(BehaviorEventType.PROOF_FAILED, 'proof', 'failed', proofType, undefined, { error, ...properties })
    },
    [track]
  )

  // Track contact form events
  const trackContactFormStart = useCallback(
    (properties: Record<string, unknown> = {}) => {
      track(BehaviorEventType.CONTACT_FORM_START, 'contact', 'form_start', undefined, undefined, properties)
    },
    [track]
  )

  const trackContactFormSubmit = useCallback(
    (properties: Record<string, unknown> = {}) => {
      track(BehaviorEventType.CONTACT_FORM_SUBMIT, 'contact', 'form_submit', undefined, undefined, properties)
    },
    [track]
  )

  const trackContactFormAbandon = useCallback(
    (properties: Record<string, unknown> = {}) => {
      track(BehaviorEventType.CONTACT_FORM_ABANDON, 'contact', 'form_abandon', undefined, undefined, properties)
    },
    [track]
  )

  // Track errors
  const trackError = useCallback(
    (error: string, context: string, properties: Record<string, unknown> = {}) => {
      track(BehaviorEventType.ERROR_OCCURRED, 'error', 'error', error, undefined, { context, ...properties })
    },
    [track]
  )

  // Add user tags
  const addUserTag = useCallback(
    (key: string, value: string | number | boolean, source = 'user_action') => {
      dispatch(addTag({ key, value, source }))
    },
    [dispatch]
  )

  // Set user ID
  const setUserIdTracking = useCallback(
    (userId: string) => {
      dispatch(setUserId(userId))
    },
    [dispatch]
  )

  // Control tracking
  const enableTracking = useCallback(() => {
    dispatch(setTrackingEnabled(true))
  }, [dispatch])

  const disableTracking = useCallback(() => {
    dispatch(setTrackingEnabled(false))
  }, [dispatch])

  const enableAnalytics = useCallback(() => {
    dispatch(setAnalyticsEnabled(true))
  }, [dispatch])

  const disableAnalytics = useCallback(() => {
    dispatch(setAnalyticsEnabled(false))
  }, [dispatch])

  // Send analytics data to server
  const sendAnalytics = useCallback(() => {
    if (behaviorState.isAnalyticsEnabled && behaviorState.events.length > 0) {
      dispatch(
        sendAnalyticsData({
          events: behaviorState.events,
          tags: behaviorState.tags,
        })
      )
    }
  }, [dispatch, behaviorState.isAnalyticsEnabled, behaviorState.events, behaviorState.tags])

  return {
    // Basic tracking
    track,
    trackPageView,
    trackClick,
    trackFormSubmit,
    trackFormFieldFocus,

    // Onboarding tracking
    trackOnboardingStart,
    trackOnboardingStep,
    trackOnboardingComplete,
    trackOnboardingAbandoned,

    // Credential tracking
    trackCredentialRequest,
    trackCredentialAccept,
    trackCredentialReject,

    // Connection tracking
    trackConnectionInitiate,
    trackConnectionComplete,
    trackConnectionFailed,
    trackQRCodeScan,

    // Proof tracking
    trackProofRequest,
    trackProofSubmit,
    trackProofVerified,
    trackProofFailed,

    // Contact tracking
    trackContactFormStart,
    trackContactFormSubmit,
    trackContactFormAbandon,

    // Error tracking
    trackError,

    // User management
    addUserTag,
    setUserIdTracking,

    // Control
    enableTracking,
    disableTracking,
    enableAnalytics,
    disableAnalytics,
    sendAnalytics,

    // State
    isTracking: behaviorState.isTracking,
    isAnalyticsEnabled: behaviorState.isAnalyticsEnabled,
    sessionId: behaviorState.sessionId,
    userId: behaviorState.userId,
    eventCount: behaviorState.events.length,
    tagCount: behaviorState.tags.length,
  }
}

// Hook for automatic page tracking
export const usePageTracking = (options: UsePageTrackingOptions = {}) => {
  const { trackPageView, trackError } = useBehaviorTracking()
  const location = useLocation()
  const pageStartTime = useRef<Date>()
  const lastScrollDepth = useRef<number>(0)

  const { enableTimeTracking = true, enableScrollTracking = true, trackInteractions = true } = options

  // Track page view on mount and location change
  useEffect(() => {
    pageStartTime.current = new Date()
    lastScrollDepth.current = 0

    try {
      trackPageView({
        enableTimeTracking,
        enableScrollTracking,
        trackInteractions,
      })
    } catch (error) {
      trackError(error instanceof Error ? error.message : 'Unknown error', 'page_tracking', {
        location: location.pathname,
      })
    }
  }, [location.pathname, trackPageView, trackError, enableTimeTracking, enableScrollTracking, trackInteractions])

  // Track time on page when component unmounts or location changes
  useEffect(() => {
    return () => {
      if (enableTimeTracking && pageStartTime.current) {
        const timeSpent = Date.now() - pageStartTime.current.getTime()
        try {
          // Track time spent on page
          // trackEvent would be called here with time_on_page event
        } catch (error) {
          trackError(error instanceof Error ? error.message : 'Unknown error', 'time_tracking', {
            timeSpent,
            location: location.pathname,
          })
        }
      }
    }
  }, [location.pathname, enableTimeTracking, trackError])

  // Track scroll depth
  useEffect(() => {
    if (!enableScrollTracking) return

    const handleScroll = () => {
      try {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop
        const docHeight = document.documentElement.scrollHeight - window.innerHeight
        const scrollPercent = Math.round((scrollTop / docHeight) * 100)

        // Track significant scroll milestones
        if (scrollPercent > lastScrollDepth.current + 25) {
          lastScrollDepth.current = scrollPercent
          // Track scroll depth event here
        }
      } catch (error) {
        trackError(error instanceof Error ? error.message : 'Unknown error', 'scroll_tracking', {
          location: location.pathname,
        })
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [enableScrollTracking, trackError, location.pathname])
}
