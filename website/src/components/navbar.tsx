import { Link } from "@tanstack/react-router";
import { useState, useEffect, useRef, MouseEvent } from "react";
import { useAuth } from "../utils/auth";
import Dropdown from "@/components/dropdown";

const Navbar = () => {
  const { isAuthenticated, user, signIn, signOut } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [rosterDropdownOpen, setRosterDropdownOpen] = useState(false);
  const [username, setUsername] = useState("");
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const locationDropdownRef = useRef<HTMLDivElement>(null);
  const rosterDropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isAuthenticated) {
      if (user && user.name) {
        setUsername(user.name);
      }
    }
  }, [isAuthenticated, user]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleUserDropdown = () => {
    setUserDropdownOpen(!userDropdownOpen);
  };

  const toggleLocationDropdown = () => {
    setLocationDropdownOpen(!locationDropdownOpen);
  };

  const toggleRosterDropdown = () => {
    setRosterDropdownOpen(!rosterDropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const closeUserDropdown = () => {
    setUserDropdownOpen(false);
  };

  const closeLocationDropdown = () => {
    setLocationDropdownOpen(false);
  };

  const closeRosterDropdown = () => {
    setRosterDropdownOpen(false);
  };

  const handleLogout = () => {
    signOut();
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
        locationDropdownRef.current &&
        !locationDropdownRef.current.contains(event.target as Node)
      ) {
        closeLocationDropdown();
      }
      if (
        rosterDropdownRef.current &&
        !rosterDropdownRef.current.contains(event.target as Node)
      ) {
        closeRosterDropdown();
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
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="[&.active]:font-bold text-white hover:text-gray-300"
              >
                Dashboard
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
                        to="/users/search-modify-delete"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={closeUserDropdown}
                      >
                        Search Users
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              <div className="relative" ref={locationDropdownRef}>
                <button
                  onClick={toggleLocationDropdown}
                  className="[&.active]:font-bold text-white hover:text-gray-300"
                >
                  Locations
                </button>
                {locationDropdownOpen && (
                  <div className="absolute mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      <Link
                        to="/locations/create"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={closeLocationDropdown}
                      >
                        Create Location
                      </Link>
                      <Link
                        to="/locations/search-modify"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={closeLocationDropdown}
                      >
                        Search Locations
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              <div className="relative" ref={rosterDropdownRef}>
                <button
                  onClick={toggleRosterDropdown}
                  className="[&.active]:font-bold text-white hover:text-gray-300"
                >
                  Rosters
                </button>
                {rosterDropdownOpen && (
                  <div className="absolute mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      <Link
                        to="/rosters/createroster"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={closeRosterDropdown}
                      >
                        Create Roster
                      </Link>
                      <Link
                        to="/rosters/searchroster"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={closeRosterDropdown}
                      >
                        Search Rosters
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
          {isAuthenticated ? (
            <Dropdown
              toggleDropdown={toggleDropdown}
              dropdownOpen={dropdownOpen}
              closeDropdown={closeDropdown}
              handleLogout={handleLogout}
              username={username}
            />
          ) : (
            <Link
              onClick={() => signIn()}
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
