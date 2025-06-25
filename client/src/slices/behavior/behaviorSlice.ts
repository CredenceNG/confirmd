import type { BehaviorEvent, BehaviorTag, CustomerProfile } from '../../types/behavior'

import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

import { BehaviorEventType } from '../../types/behavior'

interface BehaviorState {
  sessionId: string
  userId?: string
  profile: CustomerProfile | null
  events: BehaviorEvent[]
  tags: BehaviorTag[]
  isTracking: boolean
  isAnalyticsEnabled: boolean
  lastEventTime?: Date
  sessionStartTime: Date
}

const initialState: BehaviorState = {
  sessionId: uuidv4(),
  profile: null,
  events: [],
  tags: [],
  isTracking: true,
  isAnalyticsEnabled: true,
  sessionStartTime: new Date(),
}

// Async thunk to send analytics data to server
export const sendAnalyticsData = createAsyncThunk(
  'behavior/sendAnalyticsData',
  async (payload: { events: BehaviorEvent[]; tags: BehaviorTag[] }) => {
    try {
      const response = await fetch('/demo/analytics/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error('Failed to send analytics data')
      }

      return await response.json()
    } catch (error) {
      console.warn('Analytics tracking failed:', error)
      throw error
    }
  }
)

const behaviorSlice = createSlice({
  name: 'behavior',
  initialState,
  reducers: {
    trackEvent: (state, action: PayloadAction<Omit<BehaviorEvent, 'id' | 'sessionId' | 'timestamp'>>) => {
      if (!state.isTracking) return

      const event: BehaviorEvent = {
        id: uuidv4(),
        sessionId: state.sessionId,
        timestamp: new Date(),
        ...action.payload,
      }

      state.events.push(event)
      state.lastEventTime = new Date()

      // Keep only last 100 events in memory
      if (state.events.length > 100) {
        state.events = state.events.slice(-100)
      }
    },

    addTag: (state, action: PayloadAction<Omit<BehaviorTag, 'timestamp'>>) => {
      const tag: BehaviorTag = {
        ...action.payload,
        timestamp: new Date(),
      }

      // Remove existing tag with same key and update
      state.tags = state.tags.filter((t) => t.key !== tag.key)
      state.tags.push(tag)
    },

    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload
    },

    setTrackingEnabled: (state, action: PayloadAction<boolean>) => {
      state.isTracking = action.payload
    },

    setAnalyticsEnabled: (state, action: PayloadAction<boolean>) => {
      state.isAnalyticsEnabled = action.payload
    },

    updateProfile: (state, action: PayloadAction<Partial<CustomerProfile>>) => {
      if (state.profile) {
        state.profile = { ...state.profile, ...action.payload }
      } else {
        state.profile = {
          sessionId: state.sessionId,
          userId: state.userId,
          tags: state.tags,
          events: state.events,
          summary: {
            totalEvents: state.events.length,
            firstSeen: state.sessionStartTime,
            lastSeen: new Date(),
            totalTimeSpent: 0,
            pagesVisited: new Set(
              state.events.filter((e) => e.type === BehaviorEventType.PAGE_VIEW).map((e) => e.page.url)
            ).size,
            conversions: 0,
            onboardingCompleted: false,
            credentialsIssued: 0,
            proofsVerified: 0,
          },
          ...action.payload,
        }
      }
    },

    clearSession: (state) => {
      state.sessionId = uuidv4()
      state.events = []
      state.tags = []
      state.profile = null
      state.sessionStartTime = new Date()
    },

    incrementConversion: (state) => {
      if (state.profile) {
        state.profile.summary.conversions += 1
      }
    },

    markOnboardingComplete: (state) => {
      if (state.profile) {
        state.profile.summary.onboardingCompleted = true
      }
    },

    incrementCredentials: (state) => {
      if (state.profile) {
        state.profile.summary.credentialsIssued += 1
      }
    },

    incrementProofs: (state) => {
      if (state.profile) {
        state.profile.summary.proofsVerified += 1
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendAnalyticsData.fulfilled, () => {
        // Optionally clear sent events
        // state.events = []
      })
      .addCase(sendAnalyticsData.rejected, (state, action) => {
        console.warn('Failed to send analytics data:', action.error.message)
      })
  },
})

export const {
  trackEvent,
  addTag,
  setUserId,
  setTrackingEnabled,
  setAnalyticsEnabled,
  updateProfile,
  clearSession,
  incrementConversion,
  markOnboardingComplete,
  incrementCredentials,
  incrementProofs,
} = behaviorSlice.actions

export default behaviorSlice.reducer
