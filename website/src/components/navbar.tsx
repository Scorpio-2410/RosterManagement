import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { isAuthenticated, signOut } from "../utils/auth";
import Dropdown from "@/components/dropdown";

const Navbar = () => {
  const isLoggedIn = isAuthenticated();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [username, setUsername] = useState("");

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

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const handleLogout = () => {
    signOut();
    localStorage.removeItem("username");
    window.location.href = "/login";
  };

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
              <Link
                to="/users"
                className="[&.active]:font-bold text-white hover:text-gray-300"
              >
                Users
              </Link>
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
        <div className="relative">
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
