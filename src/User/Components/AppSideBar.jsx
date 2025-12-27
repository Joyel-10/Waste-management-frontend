 


import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaCalendarAlt,
  FaTrashAlt,
  FaWallet,
  FaExclamationCircle,
  FaUser,
} from 'react-icons/fa';

function AppSidebar() {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', icon: <FaTachometerAlt />, label: 'Dashboard', color: 'from-blue-500 to-indigo-600', hover: 'hover:bg-blue-600', shadow: 'hover:shadow-blue-400/40', text: 'text-blue-300' },

    { path: '/schedule-pickup', icon: <FaCalendarAlt />, label: 'Schedule', color: 'from-purple-500 to-pink-600', hover: 'hover:bg-purple-600', shadow: 'hover:shadow-purple-400/40', text: 'text-purple-300' },

    { path: '/pickup-history', icon: <FaTrashAlt />, label: 'History', color: 'from-green-500 to-emerald-600', hover: 'hover:bg-green-600', shadow: 'hover:shadow-green-400/40', text: 'text-green-300' },

    { path: '/payments', icon: <FaWallet />, label: 'Payments', color: 'from-yellow-500 to-orange-600', hover: 'hover:bg-yellow-600', shadow: 'hover:shadow-yellow-400/40', text: 'text-yellow-300' },

    { path: '/complaints', icon: <FaExclamationCircle />, label: 'Complaints', color: 'from-red-500 to-rose-600', hover: 'hover:bg-red-600', shadow: 'hover:shadow-red-400/40', text: 'text-red-300' },

    { path: '/profile', icon: <FaUser />, label: 'Profile', color: 'from-cyan-500 to-teal-600', hover: 'hover:bg-cyan-600', shadow: 'hover:shadow-cyan-400/40', text: 'text-cyan-300' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800
      text-white flex justify-around items-center py-2 px-2 shadow-2xl z-50 border-t-2 border-gray-700"
    >

      {navItems.map((item) => {
        const isActive = location.pathname === item.path;

        return (
          <Link key={item.path} to={item.path} className="relative group">

            {/* Active indicator bar */}
            {isActive && (
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-0.5
                bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full shadow-lg"></div>
            )}

            <div className="flex flex-col items-center relative">

              {/* ICON BOX */}
              <div
                className={`
                  flex items-center justify-center w-10 h-10 rounded-2xl transition-all duration-300 
                  ${isActive
                    ? `bg-gradient-to-br ${item.color} shadow-lg scale-110`
                    : `
                      bg-gray-700
                      ${item.hover}
                      group-hover:scale-110
                      group-hover:-translate-y-1
                      ${item.shadow}
                    `
                  }
                `}
              >
                <div
                  className={`text-base transition-all duration-300
                    ${isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'}
                  `}
                >
                  {item.icon}
                </div>
              </div>

              {/* LABEL */}
              <span
                className={`
                  mt-1 text-[11px] font-semibold transition-all duration-300
                  ${isActive ? item.text : 'text-gray-400 group-hover:text-white group-hover:scale-110'}
                `}
              >
                {item.label}
              </span>

              {/* Hover glow effect */}
              {!isActive && (
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/0 
                  group-hover:from-white/5 group-hover:to-white/10 rounded-xl transition-all duration-300 pointer-events-none"
                ></div>
              )}
            </div>
          </Link>
        );
      })}

    </div>
  );
}

export default AppSidebar;

