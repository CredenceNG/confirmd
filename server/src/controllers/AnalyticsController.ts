import { Body, Get, JsonController, Post, QueryParam } from 'routing-controllers'
import { Service } from 'typedi'

interface BehaviorEvent {
  id: string
  userId?: string
  sessionId: string
  timestamp: Date
  type: string
  category: string
  action: string
  label?: string
  value?: number
  properties: Record<string, unknown>
  page: {
    url: string
    title: string
    referrer?: string
  }
  user: {
    type: string
    isAuthenticated: boolean
    connectionId?: string
  }
  device: {
    type: string
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

interface BehaviorTag {
  key: string
  value: string | number | boolean
  timestamp: Date
  source: string
}

interface AnalyticsPayload {
  events: BehaviorEvent[]
  tags: BehaviorTag[]
}

interface SessionData {
  id: string
  userId?: string
  firstSeen: Date
  lastSeen: Date
  eventCount: number
  pages: Set<string>
  device: {
    type: string
    userAgent: string
    screenResolution?: string
    language: string
  }
  userAgent: string
}

// In-memory storage for demo purposes
// In production, you would store this in a database
const analyticsData: {
  events: BehaviorEvent[]
  tags: BehaviorTag[]
  sessions: Map<string, SessionData>
} = {
  events: [],
  tags: [],
  sessions: new Map(),
}

@JsonController('/analytics')
@Service()
export class AnalyticsController {
  @Post('/track')
  public async trackAnalytics(@Body() payload: AnalyticsPayload) {
    try {
      if (!payload || !Array.isArray(payload.events) || !Array.isArray(payload.tags)) {
        return {
          success: false,
          error: 'Invalid payload format',
          message: 'Expected events and tags arrays',
        }
      }

      // Validate and store events
      for (const event of payload.events) {
        if (!event.id || !event.sessionId || !event.type) {
          console.warn('Invalid event data:', event)
          continue
        }

        // Store event
        analyticsData.events.push({
          ...event,
          timestamp: new Date(event.timestamp),
        })

        // Update session info
        if (!analyticsData.sessions.has(event.sessionId)) {
          analyticsData.sessions.set(event.sessionId, {
            id: event.sessionId,
            userId: event.userId,
            firstSeen: new Date(event.timestamp),
            lastSeen: new Date(event.timestamp),
            eventCount: 0,
            pages: new Set(),
            device: event.device,
            userAgent: event.device.userAgent,
          })
        }

        const session = analyticsData.sessions.get(event.sessionId)
        if (session) {
          session.lastSeen = new Date(event.timestamp)
          session.eventCount += 1
          if (event.type === 'page_view') {
            session.pages.add(event.page.url)
          }
        }
      }

      // Validate and store tags
      for (const tag of payload.tags) {
        if (!tag.key || tag.value === undefined) {
          console.warn('Invalid tag data:', tag)
          continue
        }

        analyticsData.tags.push({
          ...tag,
          timestamp: new Date(tag.timestamp),
        })
      }

      // Keep only last 10,000 events to prevent memory overflow
      if (analyticsData.events.length > 10000) {
        analyticsData.events = analyticsData.events.slice(-10000)
      }

      // Keep only last 1,000 tags
      if (analyticsData.tags.length > 1000) {
        analyticsData.tags = analyticsData.tags.slice(-1000)
      }

      console.log(`Tracked ${payload.events.length} events and ${payload.tags.length} tags`)

      return {
        success: true,
        message: 'Analytics data tracked successfully',
        tracked: {
          events: payload.events.length,
          tags: payload.tags.length,
        },
      }
    } catch (error) {
      console.error('Error tracking analytics:', error)
      return {
        success: false,
        error: 'Internal server error',
        message: 'Failed to track analytics data',
      }
    }
  }

  @Get('/data')
  public async getAnalytics(
    @QueryParam('sessionId') sessionId?: string,
    @QueryParam('userId') userId?: string,
    @QueryParam('limit') limit = 100,
    @QueryParam('type') type?: string
  ) {
    try {
      let events = analyticsData.events

      // Filter by session ID
      if (sessionId) {
        events = events.filter((event) => event.sessionId === sessionId)
      }

      // Filter by user ID
      if (userId) {
        events = events.filter((event) => event.userId === userId)
      }

      // Filter by event type
      if (type) {
        events = events.filter((event) => event.type === type)
      }

      // Limit results
      const limitNum = typeof limit === 'string' ? parseInt(limit, 10) : limit
      if (!isNaN(limitNum) && limitNum > 0) {
        events = events.slice(-limitNum)
      }

      // Get relevant tags
      let tags = analyticsData.tags
      if (sessionId || userId) {
        // For now, return all tags - in production you'd filter by session/user
        tags = analyticsData.tags.slice(-100)
      }

      // Get session info
      const sessions = Array.from(analyticsData.sessions.values()).map((session) => ({
        ...session,
        pages: Array.from(session.pages),
      }))

      return {
        success: true,
        data: {
          events,
          tags,
          sessions: sessionId ? sessions.filter((s) => s.id === sessionId) : sessions.slice(-10),
          summary: {
            totalEvents: analyticsData.events.length,
            totalTags: analyticsData.tags.length,
            totalSessions: analyticsData.sessions.size,
            lastEventTime:
              analyticsData.events.length > 0 ? analyticsData.events[analyticsData.events.length - 1].timestamp : null,
          },
        },
      }
    } catch (error) {
      console.error('Error getting analytics:', error)
      return {
        success: false,
        error: 'Internal server error',
        message: 'Failed to retrieve analytics data',
      }
    }
  }

  @Get('/summary')
  public async getAnalyticsSummary() {
    try {
      const now = new Date()
      const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000)
      const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

      const eventsLast24h = analyticsData.events.filter((event) => new Date(event.timestamp) >= last24Hours)
      const eventsLastWeek = analyticsData.events.filter((event) => new Date(event.timestamp) >= lastWeek)

      const uniqueSessionsLast24h = new Set(eventsLast24h.map((event) => event.sessionId)).size
      const uniqueSessionsLastWeek = new Set(eventsLastWeek.map((event) => event.sessionId)).size

      const pageViews24h = eventsLast24h.filter((event) => event.type === 'page_view').length
      const pageViewsWeek = eventsLastWeek.filter((event) => event.type === 'page_view').length

      const onboardingStarts = analyticsData.events.filter((event) => event.type === 'onboarding_start').length
      const onboardingCompletes = analyticsData.events.filter((event) => event.type === 'onboarding_complete').length

      const connectionAttempts = analyticsData.events.filter((event) => event.type === 'connection_initiate').length
      const connectionSuccesses = analyticsData.events.filter((event) => event.type === 'connection_complete').length

      const topPages = eventsLast24h
        .filter((event) => event.type === 'page_view')
        .reduce((acc: Record<string, number>, event) => {
          acc[event.page.url] = (acc[event.page.url] || 0) + 1
          return acc
        }, {})

      const topPagesArray = Object.entries(topPages)
        .map(([url, count]) => ({ url, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10)

      return {
        success: true,
        data: {
          overview: {
            totalEvents: analyticsData.events.length,
            totalSessions: analyticsData.sessions.size,
            totalTags: analyticsData.tags.length,
          },
          last24Hours: {
            events: eventsLast24h.length,
            sessions: uniqueSessionsLast24h,
            pageViews: pageViews24h,
          },
          lastWeek: {
            events: eventsLastWeek.length,
            sessions: uniqueSessionsLastWeek,
            pageViews: pageViewsWeek,
          },
          conversion: {
            onboardingConversion: onboardingStarts > 0 ? (onboardingCompletes / onboardingStarts) * 100 : 0,
            connectionConversion: connectionAttempts > 0 ? (connectionSuccesses / connectionAttempts) * 100 : 0,
          },
          topPages: topPagesArray,
          eventTypes: analyticsData.events.reduce((acc: Record<string, number>, event) => {
            acc[event.type] = (acc[event.type] || 0) + 1
            return acc
          }, {}),
        },
      }
    } catch (error) {
      console.error('Error getting analytics summary:', error)
      return {
        success: false,
        error: 'Internal server error',
        message: 'Failed to retrieve analytics summary',
      }
    }
  }

  @Post('/clear')
  public async clearAnalytics(@Body() body: { confirmClear: string }) {
    try {
      const { confirmClear } = body

      if (confirmClear !== 'YES_CLEAR_ALL_ANALYTICS') {
        return {
          success: false,
          error: 'Invalid confirmation',
          message: 'Please provide confirmClear: "YES_CLEAR_ALL_ANALYTICS" to clear all data',
        }
      }

      const cleared = {
        events: analyticsData.events.length,
        tags: analyticsData.tags.length,
        sessions: analyticsData.sessions.size,
      }

      analyticsData.events = []
      analyticsData.tags = []
      analyticsData.sessions.clear()

      console.log('Analytics data cleared:', cleared)

      return {
        success: true,
        message: 'Analytics data cleared successfully',
        cleared,
      }
    } catch (error) {
      console.error('Error clearing analytics:', error)
      return {
        success: false,
        error: 'Internal server error',
        message: 'Failed to clear analytics data',
      }
    }
  }
}
