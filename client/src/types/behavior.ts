// Behavior tracking types and enums
export enum BehaviorEventType {
  // Navigation
  PAGE_VIEW = 'page_view',
  ROUTE_CHANGE = 'route_change',

  // User Interactions
  BUTTON_CLICK = 'button_click',
  FORM_SUBMIT = 'form_submit',
  FORM_FIELD_FOCUS = 'form_field_focus',
  LINK_CLICK = 'link_click',

  // Onboarding Flow
  ONBOARDING_START = 'onboarding_start',
  ONBOARDING_STEP_COMPLETE = 'onboarding_step_complete',
  ONBOARDING_ABANDONED = 'onboarding_abandoned',
  ONBOARDING_COMPLETE = 'onboarding_complete',

  // Credential Operations
  CREDENTIAL_REQUEST = 'credential_request',
  CREDENTIAL_ACCEPT = 'credential_accept',
  CREDENTIAL_REJECT = 'credential_reject',
  CREDENTIAL_VIEW = 'credential_view',

  // Connection Operations
  CONNECTION_INITIATE = 'connection_initiate',
  CONNECTION_COMPLETE = 'connection_complete',
  CONNECTION_FAILED = 'connection_failed',
  QR_CODE_SCAN = 'qr_code_scan',

  // Proof Operations
  PROOF_REQUEST = 'proof_request',
  PROOF_SUBMIT = 'proof_submit',
  PROOF_VERIFIED = 'proof_verified',
  PROOF_FAILED = 'proof_failed',

  // Contact & Support
  CONTACT_FORM_START = 'contact_form_start',
  CONTACT_FORM_SUBMIT = 'contact_form_submit',
  CONTACT_FORM_ABANDON = 'contact_form_abandon',

  // Errors & Issues
  ERROR_OCCURRED = 'error_occurred',
  RETRY_ACTION = 'retry_action',

  // Engagement
  TIME_ON_PAGE = 'time_on_page',
  SCROLL_DEPTH = 'scroll_depth',
  FILE_DOWNLOAD = 'file_download',
  EXTERNAL_LINK = 'external_link',
}

export enum UserType {
  PERSONAL = 'personal',
  BUSINESS = 'business',
  ANONYMOUS = 'anonymous',
}

export enum DeviceType {
  DESKTOP = 'desktop',
  MOBILE = 'mobile',
  TABLET = 'tablet',
}

export interface BehaviorEvent {
  id: string
  userId?: string
  sessionId: string
  timestamp: Date
  type: BehaviorEventType
  category: string
  action: string
  label?: string
  value?: number
  properties: Record<string, any>
  page: {
    url: string
    title: string
    referrer?: string
  }
  user: {
    type: UserType
    isAuthenticated: boolean
    connectionId?: string
  }
  device: {
    type: DeviceType
    userAgent: string
    screenResolution?: string
    language: string
  }
  context: {
    source: string
    campaign?: string
    medium?: string
  }
}

export interface BehaviorTag {
  key: string
  value: string | number | boolean
  timestamp: Date
  source: string
}

export interface CustomerProfile {
  sessionId: string
  userId?: string
  tags: BehaviorTag[]
  events: BehaviorEvent[]
  summary: {
    totalEvents: number
    firstSeen: Date
    lastSeen: Date
    totalTimeSpent: number
    pagesVisited: number
    conversions: number
    onboardingCompleted: boolean
    credentialsIssued: number
    proofsVerified: number
  }
}

// Behavior scoring types
export interface BehaviorScore {
  engagement: number // 0-100
  intent: number // 0-100
  conversion: number // 0-100
  satisfaction: number // 0-100
  overall: number // 0-100
}

export interface BehaviorSegment {
  id: string
  name: string
  description: string
  criteria: BehaviorCriteria[]
  userCount: number
}

export interface BehaviorCriteria {
  field: string
  operator: 'equals' | 'contains' | 'greater_than' | 'less_than' | 'exists'
  value: any
}
