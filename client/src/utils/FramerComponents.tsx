import type React from 'react'

import { AnimatePresence as FramerAnimatePresence } from 'framer-motion'

export const AnimatePresence = FramerAnimatePresence as React.ComponentType<
  React.PropsWithChildren<{
    mode?: 'sync' | 'wait' | 'popLayout'
    initial?: boolean
    onExitComplete?: () => void
  }>
>
