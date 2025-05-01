import type { PayloadAction } from '@reduxjs/toolkit'

import { createSlice } from '@reduxjs/toolkit'

export interface DocumentImage {
  label: string
  data: string
}

export interface PersonInformation {
  familyName: string
  givenNames: string
  dateOfBirth: string
  gender: string
  documentType: string
  documentNumber: string
  documentExpiryDate: string
  nationality: string
  documentIssuingBody: string
  documentImages?: DocumentImage[]
}

export interface ConfirmedPersonState {
  step: string
  connectionId?: string
  isCompleted: boolean
  personInformation: PersonInformation
}

const initialState: ConfirmedPersonState = {
  step: 'SETUP_START',
  connectionId: undefined,
  isCompleted: false,
  personInformation: {
    familyName: '',
    givenNames: '',
    dateOfBirth: '',
    gender: 'male',
    documentType: 'passport',
    documentNumber: '',
    documentExpiryDate: '',
    nationality: 'Nigeria',
    documentIssuingBody: '',
    documentImages: [],
  },
}

export const confirmedPersonSlice = createSlice({
  name: 'confirmedPerson',
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<string>) => {
      state.step = action.payload
    },
    setConnectionId: (state, action: PayloadAction<string>) => {
      state.connectionId = action.payload
    },
    updatePersonInformation: (state, action: PayloadAction<Partial<PersonInformation>>) => {
      state.personInformation = {
        ...state.personInformation,
        ...action.payload,
      }
    },
    completeConfirmedPersonFlow: (state) => {
      state.isCompleted = true
    },
    resetConfirmedPersonFlow: () => initialState,
  },
})

export const {
  setStep,
  setConnectionId,
  updatePersonInformation,
  completeConfirmedPersonFlow,
  resetConfirmedPersonFlow,
} = confirmedPersonSlice.actions

export default confirmedPersonSlice.reducer
