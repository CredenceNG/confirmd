import React from 'react'
import { Link } from 'react-router-dom'

export const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-900 text-white py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Confirmed Person</h3>
            <p className="mb-4 text-blue-100">Your secure digital identity solution.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-orange-400">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-orange-400">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Solutions</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/personal" className="text-blue-100 hover:text-orange-400 transition">
                  Personal
                </Link>
              </li>
              <li>
                <Link to="/business" className="text-blue-100 hover:text-orange-400 transition">
                  Business
                </Link>
              </li>
              <li>
                <Link to="/government" className="text-blue-100 hover:text-orange-400 transition">
                  Government
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-blue-100 hover:text-orange-400 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-blue-100 hover:text-orange-400 transition">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-blue-100 hover:text-orange-400 transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-blue-100 hover:text-orange-400 transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-blue-100 hover:text-orange-400 transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-blue-100 hover:text-orange-400 transition">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-12 pt-8 text-sm text-center">
          <p className="text-blue-200">© {new Date().getFullYear()} Confirmed Person. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
