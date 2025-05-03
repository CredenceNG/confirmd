import React from 'react'
import { Link } from 'react-router-dom'

export interface BreadcrumbItem {
  label: string
  path: string
  active?: boolean
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-3 text-sm">
        <ol className="flex flex-wrap items-center space-x-2">
          <li className="flex items-center">
            <Link to="/" className="text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-100">
              Home
            </Link>
          </li>

          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              <span className="mx-2 text-gray-500">/</span>
              {item.active ? (
                <span className="font-medium text-gray-700 dark:text-gray-300">{item.label}</span>
              ) : (
                <Link
                  to={item.path}
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-100"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  )
}
