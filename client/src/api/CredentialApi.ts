import type { Credential } from '../slices/types'
import type { AxiosResponse } from 'axios'

import { apiCall } from './BaseUrl'

export const issueCredential = async (
  connectionId: string,
  cred: Credential,
  credDefId: string
): Promise<AxiosResponse> => {
  console.log('[CredentialApi] Issuing credential with:', { connectionId, credentialName: cred.name, credDefId })
  try {
    const response = await apiCall.post(`/demo/credentials/offerCredential`, {
      connection_id: connectionId,
      cred_def_id: credDefId,
      credential_proposal: {
        '@type': 'issue-credential/1.0/credential-preview',
        attributes: cred.attributes,
      },
    })
    console.log('[CredentialApi] Credential issuance successful:', response.data)
    return response
  } catch (error) {
    console.error('[CredentialApi] Credential issuance failed:', error)
    throw error
  }
}

export const issueDeepCredential = async (
  connectionId: string,
  cred: Credential,
  credDefId: string
): Promise<AxiosResponse> => {
  console.log('[CredentialApi] Issuing deep credential with:', { connectionId, credentialName: cred.name, credDefId })
  try {
    const response = await apiCall.post(`/demo/deeplink/offerCredential`, {
      connection_id: connectionId,
      cred_def_id: credDefId,
      credential_proposal: {
        '@type': 'issue-credential/1.0/credential-preview',
        attributes: cred.attributes,
      },
    })
    console.log('[CredentialApi] Deep credential issuance successful:', response.data)
    return response
  } catch (error) {
    console.error('[CredentialApi] Deep credential issuance failed:', error)
    throw error
  }
}

export const getOrCreateCredDefId = async (credential: Credential) => {
  console.log('[CredentialApi] Getting or creating credential definition for:', credential.name)
  try {
    const response = await apiCall.post(`/demo/credentials/getOrCreateCredDef`, credential)
    console.log('[CredentialApi] Credential definition retrieved/created:', response.data)
    return response
  } catch (error) {
    console.error('[CredentialApi] Failed to get/create credential definition:', error)
    throw error
  }
}

export const getDemoCredentialsByConnectionId = async (connectionId: string) => {
  console.log('[CredentialApi] Getting credentials by connection ID:', connectionId)
  try {
    const response = await apiCall.get(`/demo/credentials/connId/${connectionId}`)
    console.log('[CredentialApi] Credentials retrieved:', response.data)
    return response
  } catch (error) {
    console.error('[CredentialApi] Failed to get credentials by connection ID:', error)
    throw error
  }
}

export const getCredentialById = (credentialId: string): Promise<AxiosResponse> => {
  console.log('[CredentialApi] Getting credential by ID:', credentialId)
  return apiCall
    .get(`/demo/credentials/${credentialId}`)
    .then((response) => {
      console.log('[CredentialApi] Credential retrieved:', response.data)
      return response
    })
    .catch((error) => {
      console.error('[CredentialApi] Failed to get credential by ID:', error)
      throw error
    })
}

export const deleteCredentialById = (credentialId: string): Promise<AxiosResponse> => {
  console.log('[CredentialApi] Deleting credential by ID:', credentialId)
  return apiCall
    .delete(`/demo/credentials/${credentialId}`)
    .then((response) => {
      console.log('[CredentialApi] Credential deleted successfully:', response.data)
      return response
    })
    .catch((error) => {
      console.error('[CredentialApi] Failed to delete credential:', error)
      throw error
    })
}
