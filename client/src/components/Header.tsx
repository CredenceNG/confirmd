import React from 'react'
import { Link } from 'react-router-dom'

interface HeaderProps {
  activePage?: 'personal' | 'business' | 'about' | 'contact'
}

export const Header: React.FC<HeaderProps> = ({ activePage }) => {
  return (
    <header className="sticky top-0 z-50 bg-blue-800 dark:bg-blue-900 shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src="/confirmd-logo.png" alt="Confirmed Person Logo" className="h-8 mr-2" />
              <span className="text-2xl font-bold text-white">ConfirmD</span>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className={`text-white hover:text-orange-400 transition font-medium ${
                activePage === 'personal' ? 'underline' : ''
              }`}
            >
              Personal
            </Link>
            <Link
              to="/business"
              className={`text-white hover:text-orange-400 transition font-medium ${
                activePage === 'business' ? 'underline' : ''
              }`}
            >
              Business
            </Link>
            <Link
              to="/about"
              className={`text-white hover:text-orange-400 transition font-medium ${
                activePage === 'about' ? 'underline' : ''
              }`}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className={`text-white hover:text-orange-400 transition font-medium ${
                activePage === 'contact' ? 'underline' : ''
              }`}
            >
              Contact
            </Link>
          </nav>
          <div className="flex space-x-4">
            <Link
              to="/demo"
              className="hidden md:block px-6 py-2 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition dark:bg-orange-600 dark:hover:bg-orange-500 font-semibold shadow-md"
            >
              Get Started
            </Link>
            <button className="md:hidden text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
