import type { AxiosResponse } from 'axios'

import { apiCall } from './BaseUrl'

export const createInvitation = (
  agentName?: string,
  goalCode?: string,
  agentImageUrl?: string
): Promise<AxiosResponse> => {
  // Add flow type to identify which flow is creating the invitation
  const flowTag = window.location.pathname.includes('confirmedPerson') ? 'confirmed-person-flow' : 'onboarding-flow'

  console.log(`[ConnectionApi] Creating invitation for ${flowTag} with:`, { agentName, goalCode, agentImageUrl })

  return apiCall.post('/demo/connections/createInvite', {
    my_label: agentName,
    image_url: agentImageUrl,
    goal_code: goalCode,
    flow_type: flowTag, // Send flow type to server for better tracking
  })
}

export const getConnectionByInvitation = (invitationMsgId: string): Promise<AxiosResponse> => {
  console.log(`[ConnectionApi] Getting connection by invitation ID:`, invitationMsgId)
  return apiCall.get(`/demo/connections/invitationId/${invitationMsgId}`)
}

export const getConnectionById = (connectionId: string): Promise<AxiosResponse> => {
  console.log(`[ConnectionApi] Getting connection status for ID:`, connectionId)
  return apiCall.get(`/demo/connections/getConnectionStatus/${connectionId}`)
}

// New method to check connection health
export const checkConnectionHealth = (connectionId: string): Promise<AxiosResponse> => {
  console.log(`[ConnectionApi] Checking connection health for ID:`, connectionId)
  return apiCall.get(`/demo/connections/health/${connectionId}`)
}

// New method to force connection state refresh
export const refreshConnectionState = (connectionId: string): Promise<AxiosResponse> => {
  console.log(`[ConnectionApi] Forcing refresh of connection state for ID:`, connectionId)
  return apiCall.post(`/demo/connections/refresh/${connectionId}`)
}
