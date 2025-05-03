import React from 'react'
import { FaHome } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import { DarkModeContainer } from '../../../components/DarkModeContainer'
import { basePath } from '../../../utils/BasePath'

interface Props {
  step: string
}
export const ConfirmedPersonNavBar: React.FC<Props> = ({ step }) => {
  return (
    <div className="w-full mb-4">
      <div className="flex flex-row items-center justify-between">
        <Link
          to={`/`}
          className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-bcgov-white hover:text-gray-900 transition-colors"
        >
          <FaHome className="h-5 w-5" />
          <span>Home</span>
        </Link>
        <DarkModeContainer />
      </div>
    </div>
  )
}
