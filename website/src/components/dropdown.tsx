import { Link } from "@tanstack/react-router";

interface DropdownProps {
  toggleDropdown: () => void;
  dropdownOpen: boolean;
  closeDropdown: () => void;
  handleLogout: () => void;
  username: string;
}

const Dropdown = ({
  toggleDropdown,
  dropdownOpen,
  closeDropdown,
  handleLogout,
  username,
}: DropdownProps) => {
  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="inline-flex justify-center items-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
      >
        <i className="fa-solid fa-user mr-2"></i>
        {username}
        <svg
          className="-mr-1 ml-2 h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {dropdownOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="none">
            <Link
              to="/profile"
              onClick={closeDropdown}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Profile Settings
            </Link>
            <button
              onClick={() => {
                closeDropdown();
                handleLogout();
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
