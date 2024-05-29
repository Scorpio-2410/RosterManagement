import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { isAuthenticated, signOut } from '../utils/auth';
import { useState, useEffect } from 'react';

export const Route = createRootRoute({
  component: () => {
    const isLoggedIn = isAuthenticated();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
      if (isLoggedIn) {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
          setUsername(storedUsername);
        }
      }
    }, [isLoggedIn]);

    const toggleDropdown = () => {
      setDropdownOpen(!dropdownOpen);
    };

    const closeDropdown = () => {
      setDropdownOpen(false);
    };

    const handleLogout = () => {
      signOut();
      localStorage.removeItem('username');
      window.location.href = '/login';
    };

    return (
      <>
        <div className="p-2 flex justify-between">
          <div className='flex gap-2'>
            {isLoggedIn ? (
              <>
                <Link to="/dashboard" className="[&.active]:font-bold text-blue-400">
                  Dashboard
                </Link>
                <Link to="/rosters" className="[&.active]:font-bold text-blue-400">
                  Rosters
                </Link>
                <Link to="/locations" className="[&.active]:font-bold text-blue-400">
                  Locations
                </Link>
                <Link to="/users" className="[&.active]:font-bold text-blue-400">
                  Users
                </Link>
              </>
            ) : (
              <Link to="/" className="[&.active]:font-bold text-blue-400">
                Home
              </Link>
            )}
          </div>
          <div className="relative">
            {isLoggedIn ? (
              <div className="relative inline-block text-left">
                <button
                  onClick={toggleDropdown}
                  className="inline-flex justify-center items-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                >
                  <i className="fa-solid fa-user mr-2"></i>{username}
                  <svg className="-mr-1 ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>

                {dropdownOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="none">
                      <Link to="/profile" onClick={closeDropdown} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Profile Settings
                      </Link>
                      <button
                        onClick={() => { closeDropdown(); handleLogout(); }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="[&.active]:font-bold text-blue-400">
                Login
              </Link>
            )}
          </div>
        </div>
        <hr />
        <Outlet />
        <TanStackRouterDevtools />
      </>
    );
  },
});