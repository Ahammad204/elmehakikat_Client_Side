import { NavLink, Outlet } from "react-router-dom";
import {
  Home,
  Music,
  BookOpen,
  HandCoins,
  UserRound,
  Folder,
  Settings,
} from "lucide-react";

import useAdmin from "../../Hooks/useAdmin";
import useAuth from "../../Hooks/useAuth";

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const { user } = useAuth();

  return (
    <div className="md:flex">
      {/* Sidebar */}
      <div className="md:w-64 min-h-screen bg-[#af4e45] text-white">
        <ul className="menu p-4">
          <li className="text-center mb-3 uppercase font-semibold text-lg">
            Dashboard
          </li>
          <hr className="mb-3" />

          <li>
            <NavLink to="/">
              <Home className="w-5 h-5" />
              Home
            </NavLink>
          </li>

          {isAdmin ? (
            <>
              <li>
                <NavLink to="/dashboard/music-library">
                  <Music className="w-5 h-5" />
                  Add Music
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/add-book">
                  <BookOpen className="w-5 h-5" />
                  Add Book
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/add-blog">
                  <UserRound className="w-5 h-5" />
                  Add Blog
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/category-manage">
                  <Settings className="w-5 h-5" />
                  Manage Category
                </NavLink>
              </li>

              <div className="divider" />

              <li>
                <NavLink to="/dashboard/all-music">
                  <Music className="w-5 h-5" />
                  Music Library
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/all-book">
                  <Folder className="w-5 h-5" />
                  Book Library
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/all-blog">
                  <HandCoins className="w-5 h-5" />
                  Blog Library
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/all-user">
                  <UserRound className="w-5 h-5" />
                  All User
                </NavLink>
              </li>
            </>
          ) : (
            <li className="text-center text-sm mt-4 text-red-200">
              More Feature Coming Soon
            </li>
          )}
        </ul>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8">
        <p className="text-4xl uppercase border-y-4 py-4 text-center">
          Welcome {user?.name}
        </p>

        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
