import React from 'react'
import { Link } from 'react-router-dom'

import { DarkModeContainer } from '../../../components/DarkModeContainer'
import { basePath } from '../../../utils/BasePath'

export const NavBar: React.FC = () => {
  return (
    <div className="flex flex-row select-none my-8 md:pt-4 sm:my-4 items-center">
      <div className="flex-1">
        <Link to={`/`}>
          <img src="/confirmd-logo.png" alt="Confirmd Logo" className="h-12 md:h-16" />
        </Link>
      </div>
      <DarkModeContainer />
    </div>
  )
}
