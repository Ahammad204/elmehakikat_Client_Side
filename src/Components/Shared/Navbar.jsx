import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, Library, Music, LogIn, LogOut, User } from "lucide-react";
import { AuthContext } from "../../Provider/AuthProvider";


const Navbar = () => {
  const location = useLocation();
  const { user, logOut } = useContext(AuthContext); // Access the user and logOut from AuthContext
  const [active, setActive] = useState(location.pathname);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // To toggle the dropdown menu for profile



  const handleActive = (path) => {
    setActive(path);
  };

  const handleProfileClick = () => {
    setIsDropdownOpen((prev) => !prev); // Toggle the dropdown menu
  };

  const navItems = [
    { label: "Knowledge", path: "/", icon: <Home size={30} className="mr-1" /> },
    { label: "Books", path: "/books", icon: <Library size={30} className="mr-1" /> },
    { label: "Songs", path: "/songs", icon: <Music size={30} className="mr-1" /> },
  ];

  const navOptions = (
    <>
      {navItems.map((item) => (
        <li key={item.path} onClick={() => handleActive(item.path)}>
          <Link
            to={item.path}
            className={`relative flex items-center transition-all duration-300 ${
              active === item.path ? "text-[#c4a455]" : ""
            }`}
          >
            <div className="flex justify-center flex-col items-center text-lg">
              {item.icon} {item.label}
            </div>
            <br />
            {active === item.path && (
              <span className="absolute bottom-0 left-0 h-1 w-full bg-[#c4a455]"></span>
            )}
          </Link>
        </li>
      ))}
    </>
  );

  const userProfile = (
    <li onClick={handleProfileClick} className="relative">
      <div className="flex items-center cursor-pointer">
        {user?.photo ? (
          <>
        <div className="flex flex-col items-center">
            <img
            src={user.photo}
            alt="User Avatar"
            className="w-8 h-8 rounded-full"
          /> <br />
          <p>{user.name}</p>
        </div>
          </>
        ) : (
          <User size={30} />
        )}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 bg-white shadow-md rounded-md w-40">
            <ul className="py-2">
              <li>
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 text-sm text-gray-700"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    logOut();
                    setIsDropdownOpen(false); // Close dropdown after logout
                  }}
                  className="block px-4 py-2 text-sm text-gray-700 w-full text-left"
                >
                  Logout
                </button>
              </li>
              
            </ul>
          </div>
        )}
      </div>
    </li>
  );

  return (
    <div className="navbar mt-4 bg-base-100 shadow-sm sticky top-0 z-50">
      <div className="w-full flex justify-center">
        <ul className="menu menu-horizontal w-full justify-between px-4">
          {navOptions}
          {!user ? (
            <li key="/login">
              <Link
                to="/login"
                className={`relative flex items-center transition-all duration-300 ${
                  active === "/login" ? "text-[#c4a455]" : ""
                }`}
              >
                <LogIn size={30} className="mr-1" />
                Login
              </Link>
            </li>
          ) : (
            userProfile
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
