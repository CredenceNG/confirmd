import type { Credential } from '../types'
import type { AxiosError } from 'axios' // Add this import

import { createAsyncThunk } from '@reduxjs/toolkit'

import * as Api from '../../api/CredentialApi'

export const issueCredential = createAsyncThunk(
  'credentials/issue',
  async (
    { connectionId, cred, credDefId }: { connectionId: string; cred: Credential; credDefId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await Api.issueCredential(connectionId, cred, credDefId)
      return response.data
    } catch (error: unknown) {
      // Type-safe error handling for axios errors
      if (error && typeof error === 'object' && 'response' in error) {
        // This is likely an axios error
        const axiosError = error as AxiosError
        return rejectWithValue(axiosError.response?.data || 'API error occurred')
      }
      // Handle standard errors
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error occurred')
    }
  }
)

export const issueDeepCredential = createAsyncThunk(
  'credentials/issueDeep',
  async (data: { connectionId: string; cred: Credential; credDefId: string }, { rejectWithValue }) => {
    let success = false
    let response = undefined
    let attempts = 0
    const maxAttempts = 3

    while (!success && attempts < maxAttempts) {
      attempts++
      console.log(`[credentialsThunks] issueDeepCredential attempt ${attempts}/${maxAttempts}`)
      try {
        response = await Api.issueDeepCredential(data.connectionId, data.cred, data.credDefId)
        success = true
        console.log('[credentialsThunks] issueDeepCredential success:', response.data)
      } catch (error) {
        console.warn(`[credentialsThunks] issueDeepCredential attempt ${attempts} failed:`, error)
        // Wait a bit before retry
        await new Promise((resolve) => setTimeout(resolve, 1000))
      }
    }

    if (!success) {
      console.error('[credentialsThunks] issueDeepCredential failed after max attempts')
      return rejectWithValue(new Error('Failed to issue deep credential after multiple attempts'))
    }

    return response?.data
  }
)

export const fetchCredentialById = createAsyncThunk(
  'credentials/fetchById',
  async (id: string, { rejectWithValue }) => {
    console.log('[credentialsThunks] fetchCredentialById action dispatched:', id)
    try {
      const response = await Api.getCredentialById(id)
      console.log('[credentialsThunks] fetchCredentialById success:', response.data)
      return response.data
    } catch (error: unknown) {
      console.error('[credentialsThunks] fetchCredentialById error:', error)
      return rejectWithValue(error instanceof Error ? error : String(error))
    }
  }
)

export const deleteCredentialById = createAsyncThunk(
  'credentials/deleteById',
  async (id: string, { rejectWithValue }) => {
    console.log('[credentialsThunks] deleteCredentialById action dispatched:', id)
    try {
      await Api.deleteCredentialById(id)
      console.log('[credentialsThunks] deleteCredentialById success for ID:', id)
      return id
    } catch (error: unknown) {
      console.error('[credentialsThunks] deleteCredentialById error:', error)
      return rejectWithValue(error instanceof Error ? error : String(error))
    }
  }
)
