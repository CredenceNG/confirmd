import ReactGA from 'react-ga4'

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
  }
}

// Google Analytics configuration
export const GA_MEASUREMENT_ID = process.env.REACT_APP_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX'

// Initialize Google Analytics
export const initializeGA = () => {
  if (GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
    ReactGA.initialize(GA_MEASUREMENT_ID, {
      testMode: process.env.NODE_ENV === 'test',
      gtagOptions: {
        send_page_view: false, // We'll handle page views manually
        anonymize_ip: true, // Anonymize IP for privacy
      },
    })
    console.log('Google Analytics initialized with ID:', GA_MEASUREMENT_ID)
  } else {
    console.warn('Google Analytics not initialized - missing REACT_APP_GA_MEASUREMENT_ID')
  }
}

// Check if GA is initialized
export const isGAInitialized = (): boolean => {
  return typeof window !== 'undefined' && typeof window.gtag === 'function'
}

// Enhanced page tracking with custom dimensions
export const trackPageView = (path: string, title?: string, customDimensions?: Record<string, unknown>) => {
  if (!isGAInitialized()) return

  ReactGA.send({
    hitType: 'pageview',
    page: path,
    title: title || document.title,
    ...customDimensions,
  })
}

// Enhanced event tracking with custom parameters
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number,
  customParameters?: Record<string, unknown>
) => {
  if (!isGAInitialized()) return

  ReactGA.event(action, {
    event_category: category,
    event_label: label,
    value: value,
    ...customParameters,
  })
}

// Track custom events with full parameter support
export const trackCustomEvent = (eventName: string, parameters: Record<string, unknown>) => {
  if (!isGAInitialized()) return

  ReactGA.event(eventName, parameters)
}

// Track form interactions
export const trackFormInteraction = (
  formName: string,
  action: 'start' | 'submit' | 'abandon',
  formData?: Record<string, unknown>
) => {
  if (!isGAInitialized()) return

  ReactGA.event(`form_${action}`, {
    event_category: 'engagement',
    form_name: formName,
    form_action: action,
    ...formData,
  })
}

// Track user engagement
export const trackEngagement = (engagementType: string, details?: Record<string, unknown>) => {
  if (!isGAInitialized()) return

  ReactGA.event('engagement', {
    event_category: 'user_engagement',
    engagement_type: engagementType,
    ...details,
  })
}

// Track conversions
export const trackConversion = (conversionType: string, value?: number, currency?: string) => {
  if (!isGAInitialized()) return

  ReactGA.event('conversion', {
    event_category: 'conversions',
    conversion_type: conversionType,
    value: value,
    currency: currency || 'USD',
  })
}

// Track errors
export const trackError = (errorMessage: string, errorType: string, context?: string) => {
  if (!isGAInitialized()) return

  ReactGA.event('exception', {
    description: errorMessage,
    fatal: false,
    error_type: errorType,
    error_context: context,
  })
}

// Set user properties
export const setUserProperties = (properties: Record<string, unknown>) => {
  if (!isGAInitialized()) return

  ReactGA.set(properties)
}

// Set user ID for cross-platform tracking
export const setUserId = (userId: string) => {
  if (!isGAInitialized()) return

  ReactGA.set({ user_id: userId })
}

// Track timing events
export const trackTiming = (category: string, variable: string, value: number, label?: string) => {
  if (!isGAInitialized()) return

  ReactGA.event('timing_complete', {
    event_category: category,
    name: variable,
    value: value,
    event_label: label,
  })
}

// Enhanced ecommerce tracking for credential/proof transactions
export const trackPurchase = (
  transactionId: string,
  items: Array<{
    item_id: string
    item_name: string
    category: string
    quantity?: number
    price?: number
  }>
) => {
  if (!isGAInitialized()) return

  ReactGA.event('purchase', {
    transaction_id: transactionId,
    value: items.reduce((total, item) => total + (item.price || 0) * (item.quantity || 1), 0),
    currency: 'USD',
    items: items,
  })
}

export default {
  initialize: initializeGA,
  trackPageView,
  trackEvent,
  trackCustomEvent,
  trackFormInteraction,
  trackEngagement,
  trackConversion,
  trackError,
  setUserProperties,
  setUserId,
  trackTiming,
  trackPurchase,
}
