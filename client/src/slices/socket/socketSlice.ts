import type { PayloadAction } from '@reduxjs/toolkit'

import { createSlice } from '@reduxjs/toolkit'

export interface SocketState {
  message: any
  connectionStatus: 'disconnected' | 'connecting' | 'connected' | 'error'
  error: string | null
}

const initialState: SocketState = {
  message: null,
  connectionStatus: 'disconnected',
  error: null,
}

export const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<any>) => {
      state.message = action.payload
    },
    setConnectionStatus: (state, action: PayloadAction<SocketState['connectionStatus']>) => {
      state.connectionStatus = action.payload
    },
    setConnectionError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.connectionStatus = 'error'
    },
    clearSocketState: () => initialState,
  },
})

export const { setMessage, setConnectionStatus, setConnectionError, clearSocketState } = socketSlice.actions

export default socketSlice.reducer
