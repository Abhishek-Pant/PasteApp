import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="w-full bg-gray-900 border-b border-gray-800 shadow-lg sticky top-0 z-50">
      
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div>
          <h1 className="text-2xl font-bold text-blue-500 tracking-wide">
            PasteApp
          </h1>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-4">

          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-5 py-2 rounded-xl font-medium transition-all duration-300 ${
                isActive
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/pastes"
            className={({ isActive }) =>
              `px-5 py-2 rounded-xl font-medium transition-all duration-300 ${
                isActive
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`
            }
          >
            Pastes
          </NavLink>

        </div>
      </div>
    </nav>
  )
}

export default Navbar