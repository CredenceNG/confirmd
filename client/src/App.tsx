import type { Socket } from 'socket.io-client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom'
import { io } from 'socket.io-client'

import { baseWsUrl, socketPath } from './api/BaseUrl'
import { BehaviorTracker } from './components/BehaviorTracker'
import { useAppDispatch } from './hooks/hooks'
import { useAnalytics } from './hooks/useAnalytics'
import { PageNotFound } from './pages/PageNotFound'
import { ConfirmedPersonPage } from './pages/confirmedPerson/ConfirmedPersonPage'
import { DashboardPage } from './pages/dashboard/DashboardPage'
import { AboutUsPage } from './pages/homepage/AboutUsPage'
import { BusinessPage } from './pages/homepage/BusinessPage'
import { ContactUsPage } from './pages/homepage/ContactUsPage'
import { HomePage } from './pages/homepage/HomePage'
import { PersonalPage } from './pages/homepage/PersonalPage'
import { LandingPage } from './pages/landing/LandingPage'
import { OnboardingPage } from './pages/onboarding/OnboardingPage'
import { UseCasePage } from './pages/useCase/UseCasePage'
import { useConnection } from './slices/connection/connectionSelectors'
import { usePreferences } from './slices/preferences/preferencesSelectors'
import { setDarkMode } from './slices/preferences/preferencesSlice'
import { fetchLastServerReset } from './slices/preferences/preferencesThunks'
import { setMessage, setConnectionStatus, setConnectionError } from './slices/socket/socketSlice'
import { AuthProvider } from './utils/AuthContext'
import { basePath } from './utils/BasePath'
import { PrivateRoute } from './utils/PrivateRoute'
import { ThemeProvider } from './utils/ThemeContext'

function App() {
  // Move useState inside the component
  const [isVisible, setIsVisible] = useState(true)

  // useAnalytics()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { connectionDate, lastServerReset } = usePreferences()
  const { id } = useConnection()
  const [socket, setSocket] = useState<Socket>()

  const localStorageTheme = localStorage.theme === 'dark'
  const windowMedia = !('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches

  useEffect(() => {
    if (localStorageTheme || windowMedia) {
      dispatch(setDarkMode(true))
    }
  }, [dispatch, localStorageTheme, windowMedia])

  useEffect(() => {
    if (connectionDate) {
      dispatch(fetchLastServerReset())
    }
  }, [connectionDate])

  useEffect(() => {
    if (connectionDate && lastServerReset) {
      if (connectionDate < lastServerReset) {
        navigate(`${basePath}/`)
        dispatch({ type: 'demo/RESET' })
      }
    }
  }, [connectionDate, lastServerReset])

  useEffect(() => {
    // Update connection status to connecting
    dispatch(setConnectionStatus('connecting'))

    console.log(`Connecting to socket at ${baseWsUrl} with path: ${socketPath}`)
    const ws = io(baseWsUrl, {
      path: socketPath,
      transports: ['websocket', 'polling'], // Try WebSocket first, fallback to polling
    })

    ws.on('connect', () => {
      console.log('Socket connection established')
      dispatch(setConnectionStatus('connected'))
      setSocket(ws)
    })

    ws.on('connect_error', (err) => {
      console.error('Socket connection error:', err.message)
      dispatch(setConnectionError(`Connection error: ${err.message}`))
    })

    ws.on('message', (data) => {
      dispatch(setMessage(data))
    })

    // Clean up on unmount
    return () => {
      console.log('Cleaning up socket connection')
      ws.disconnect()
      dispatch(setConnectionStatus('disconnected'))
    }
  }, [dispatch])

  useEffect(() => {
    if (!socket || !id) {
      return
    }
    socket.emit('subscribe', { connectionId: id })
  }, [socket, id])
  return (
    <ThemeProvider>
      <AuthProvider>
        <BehaviorTracker
          enableTimeTracking={true}
          enableScrollTracking={true}
          trackInteractions={true}
          autoSendInterval={30000} // Send data every 30 seconds
        >
          <AnimatePresence mode="wait">
            {isVisible && (
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Routes location={location}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/personal" element={<PersonalPage />} />
                  <Route path="/business" element={<BusinessPage />} />
                  <Route path="/about" element={<AboutUsPage />} />
                  <Route path="/contact" element={<ContactUsPage />} />
                  <Route path="/landing" element={<LandingPage />} />
                  <Route path="/:slug" element={<LandingPage />} />
                  <Route path="/demo" element={<OnboardingPage />} />
                  <Route path="/demo/:slug" element={<OnboardingPage />} />
                  <Route path="/confirmd" element={<ConfirmedPersonPage />} />
                  <Route
                    path="/dashboard"
                    element={
                      <PrivateRoute>
                        <DashboardPage />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/uc/:slug"
                    element={
                      <PrivateRoute>
                        <UseCasePage />
                      </PrivateRoute>
                    }
                  />
                  <Route path="*" element={<PageNotFound />} />
                </Routes>
              </motion.div>
            )}
          </AnimatePresence>
        </BehaviorTracker>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
