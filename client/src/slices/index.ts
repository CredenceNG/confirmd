import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'

import behaviorSlice from './behavior/behaviorSlice'
import charactersSlice from './characters/charactersSlice'
import confirmedPersonSlice from './confirmedPerson/confirmedPersonSlice'
import connectionSlice from './connection/connectionSlice'
import credentialsSlice from './credentials/credentialsSlice'
import onboardingSlice from './onboarding/onboardingSlice'
import preferencesSlice from './preferences/preferencesSlice'
import proofSlice from './proof/proofSlice'
import sectionSlice from './section/sectionSlice'
import socketSlice from './socket/socketSlice'
import useCaseSlice from './useCases/useCasesSlice'
import walletsSlice from './wallets/walletsSlice'

export const VERSION = 4

const appReducer = combineReducers({
  socket: socketSlice,
  wallets: walletsSlice,
  characters: charactersSlice,
  connection: connectionSlice,
  credentials: credentialsSlice,
  onboarding: onboardingSlice,
  preferences: preferencesSlice,
  proof: proofSlice,
  section: sectionSlice,
  useCases: useCaseSlice,
  confirmedPerson: confirmedPersonSlice,
  behavior: behaviorSlice,
})

// Updated rootReducer with proper TypeScript types
const rootReducer = (state: any, action: any) => {
  // Pass the _persist key through without triggering warnings
  if (state && '_persist' in state) {
    const { _persist, ...stateWithoutPersist } = state
    return {
      ...appReducer(stateWithoutPersist, action),
      _persist,
    }
  }
  return appReducer(state, action)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const pReducer = (state: any, action: any) => {
  if (action.type === 'persist/REHYDRATE') {
    const storageVersion = action.payload?._persist.version

    if (storageVersion !== VERSION) {
      return rootReducer(undefined, action)
    }

    return rootReducer(action.payload, action)
  }

  if (action.type === 'demo/RESET') {
    return rootReducer(undefined, action)
  }

  return rootReducer(state, action)
}

export default pReducer
