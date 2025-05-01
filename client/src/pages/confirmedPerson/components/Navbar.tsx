import React from 'react'
import { FaHome } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import { DarkModeContainer } from '../../../components/DarkModeContainer'

export const NavBar: React.FC = () => {
  return (
    <div className="flex flex-row items-center justify-between my-8 md:pt-4 sm:my-4">
      <Link
        to="/"
        className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-bcgov-white hover:text-gray-900 transition-colors"
      >
        <FaHome className="h-5 w-5" />
        <span>Home</span>
      </Link>
      <DarkModeContainer />
    </div>
  )
}
