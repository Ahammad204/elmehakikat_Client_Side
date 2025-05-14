import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, Library, Music, LogIn } from "lucide-react";


const Navbar = () => {
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);

  const handleActive = (path) => {
    setActive(path);
  };

  const navItems = [
    { label: "Knowledge", path: "/", icon: <Home size={30} className="mr-1" /> },
    { label: "Books", path: "/books", icon: <Library size={30} className="mr-1" /> },
    { label: "Songs", path: "/songs", icon: <Music size={30} className="mr-1" /> },
    { label: "Login", path: "/login", icon: <LogIn size={30} className="mr-1" /> },
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
           <div className="flex justify-center flex-col items-center text-lg"> {item.icon} {item.label}</div><br />
            
            {active === item.path && (
              <span className="absolute bottom-0 left-0 h-1 w-full bg-[#c4a455]"></span>
            )}
          </Link>
        </li>
      ))}
    </>
  );

  return (
    <div className="navbar mt-4 bg-base-100 shadow-sm sticky top-0 z-50">
    <div className="w-full flex justify-center">
      <ul className="menu menu-horizontal w-full justify-between px-4">
        {navOptions}
      </ul>
    </div>
  </div>
  
  );
};

export default Navbar;
