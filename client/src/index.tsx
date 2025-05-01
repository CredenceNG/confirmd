//import { newTracker, enableActivityTracking, trackPageView } from '@snowplow/browser-tracker'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

import App from './App'
import './index.css'
import * as Redux from './store/configureStore'
import { KBar } from './utils/KBar'

const { store, persistor } = Redux
// newTracker('sp1', 'spt.apps.gov.bc.ca', {
//   appId: 'Snowplow_standalone_DIG',
//   cookieLifetime: 86400 * 548,
//   platform: 'web',
//   contexts: {
//     webPage: true,
//   },
// })
// enableActivityTracking({ minimumVisitLength: 15, heartbeatDelay: 30 })
// trackPageView()

// Get the root element
const rootElement = document.getElementById('root')

// Create a root
if (!rootElement) {
  throw new Error('Root element not found')
}
const root = createRoot(rootElement)

// Render your application
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <KBar>
            <App />
          </KBar>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
