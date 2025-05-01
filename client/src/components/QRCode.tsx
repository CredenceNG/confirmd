import { track } from 'insights-js'
import QRCodeReact from 'qrcode.react' // This import should now use our type definitions
import React, { useEffect } from 'react'

import { isConnected } from '../utils/Helpers'

import { CheckMark } from './Checkmark'

export interface Props {
  invitationUrl: string
  connectionState?: string
  overlay?: boolean
}

export const QRCode: React.FC<Props> = ({ invitationUrl, connectionState, overlay }) => {
  const isCompleted = isConnected(connectionState as string)

  useEffect(() => {
    if (isCompleted) {
      track({
        id: 'connection-completed',
      })
    }
  }, [isCompleted])

  // Only render if we have a valid URL
  if (!invitationUrl) {
    //console.warn('QRCode component received empty invitationUrl')
    return null
  }

  return (
    <div className={`${!overlay && 'shadow-lg m-auto'}`}>
      <div className={`relative ${overlay ? 'bg-none' : 'rounded-lg bg-bcgov-lightgrey p-4 m-auto'}`}>
        <QRCodeReact value={invitationUrl} size={165} renderAs="svg" includeMargin={true} />
        {isCompleted && (
          <div className="absolute inset-0 flex justify-center items-center bg-grey bg-opacity-60 rounded-lg">
            <CheckMark height="64" colorCircle="grey" />
          </div>
        )}
      </div>
    </div>
  )
}
