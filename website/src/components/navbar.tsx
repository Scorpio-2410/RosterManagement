import { Link } from "@tanstack/react-router";
import { useState, useEffect, useRef, MouseEvent } from "react";
import { isAuthenticated, signOut } from "../utils/auth";
import Dropdown from "@/components/dropdown";

const Navbar = () => {
  const isLoggedIn = isAuthenticated();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [username, setUsername] = useState("");
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLoggedIn) {
      const storedUsername = localStorage.getItem("username");
      if (storedUsername) {
        setUsername(storedUsername);
      }
    }
  }, [isLoggedIn]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleUserDropdown = () => {
    setUserDropdownOpen(!userDropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const closeUserDropdown = () => {
    setUserDropdownOpen(false);
  };

  const handleLogout = () => {
    signOut();
    localStorage.removeItem("username");
    window.location.href = "/login";
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target as Node)
      ) {
        closeUserDropdown();
      }
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside as unknown as EventListener
    );
    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside as unknown as EventListener
      );
    };
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-500 to-teal-400 p-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          {isLoggedIn ? (
            <>
              <Link
                to="/dashboard"
                className="[&.active]:font-bold text-white hover:text-gray-300"
              >
                Dashboard
              </Link>
              <Link
                to="/rosters"
                className="[&.active]:font-bold text-white hover:text-gray-300"
              >
                Rosters
              </Link>
              <Link
                to="/locations"
                className="[&.active]:font-bold text-white hover:text-gray-300"
              >
                Locations
              </Link>
              <div className="relative" ref={userDropdownRef}>
                <button
                  onClick={toggleUserDropdown}
                  className="[&.active]:font-bold text-white hover:text-gray-300"
                >
                  Users
                </button>
                {userDropdownOpen && (
                  <div className="absolute mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      <Link
                        to="/users/create"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={closeUserDropdown}
                      >
                        Create Users
                      </Link>
                      <Link
                        to="/users/search-edit"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={closeUserDropdown}
                      >
                        Search Users
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link
              to="/"
              className="[&.active]:font-bold text-white hover:text-gray-300"
            >
              Home
            </Link>
          )}
        </div>
        <div className="relative" ref={profileDropdownRef}>
          {isLoggedIn ? (
            <Dropdown
              toggleDropdown={toggleDropdown}
              dropdownOpen={dropdownOpen}
              closeDropdown={closeDropdown}
              handleLogout={handleLogout}
              username={username}
            />
          ) : (
            <Link
              to="/login"
              className="[&.active]:font-bold text-white hover:text-gray-300"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
