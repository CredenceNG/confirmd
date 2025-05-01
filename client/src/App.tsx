import type { Socket } from 'socket.io-client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom'
import { io } from 'socket.io-client'

import { baseWsUrl, socketPath } from './api/BaseUrl'
import { useAppDispatch } from './hooks/hooks'
import { useAnalytics } from './hooks/useAnalytics'
import { PageNotFound } from './pages/PageNotFound'
import { ConfirmedPersonPage } from './pages/confirmedPerson/ConfirmedPersonPage'
import { DashboardPage } from './pages/dashboard/DashboardPage'
import { LandingPage } from './pages/landing/LandingPage'
import { OnboardingPage } from './pages/onboarding/OnboardingPage'
import { UseCasePage } from './pages/useCase/UseCasePage'
import { useConnection } from './slices/connection/connectionSelectors'
import { usePreferences } from './slices/preferences/preferencesSelectors'
import { setDarkMode } from './slices/preferences/preferencesSlice'
import { fetchLastServerReset } from './slices/preferences/preferencesThunks'
import { setMessage } from './slices/socket/socketSlice'
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
    const ws = io(baseWsUrl, { path: socketPath })
    ws.on('connect', () => {
      setSocket(ws)
    })
    ws.on('message', (data) => {
      dispatch(setMessage(data))
    })
  }, [])
  useEffect(() => {
    if (!socket || !id) {
      return
    }
    socket.emit('subscribe', { connectionId: id })
  }, [socket, id])
  return (
    <ThemeProvider>
      <AuthProvider>
        <AnimatePresence mode="wait">
          {isVisible && (
            <motion.div key={location.pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Routes location={location}>
                {basePath !== '/' && <Route path="/" element={<Navigate to={basePath} />}></Route>}
                <Route path={`${basePath}/`} element={<LandingPage />} />
                <Route path={`${basePath}/:slug`} element={<LandingPage />} />
                <Route path={`${basePath}/demo`} element={<OnboardingPage />} />
                <Route path={`${basePath}/demo/:slug`} element={<OnboardingPage />} />
                <Route path={`${basePath}/confirmedperson`} element={<ConfirmedPersonPage />} />
                <Route
                  path={`${basePath}/dashboard`}
                  element={
                    <PrivateRoute>
                      <DashboardPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path={`${basePath}/uc/:slug`}
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
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
