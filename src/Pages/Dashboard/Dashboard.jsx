import { NavLink, Outlet } from "react-router-dom";
import {
  Home,
  Music,
  BookOpen,
  PawPrint,
  HandCoins,
  UserRound,
  Heart
} from "lucide-react";

const Dashboard = () => {
  const user = {
    displayName: "Admin" 
  };

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
              <PawPrint className="w-5 h-5" />
              Manage Category
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/allDonation">
              <HandCoins className="w-5 h-5" />
              All Donations
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
            <NavLink to="/dashboard/addedPet">
              <PawPrint className="w-5 h-5" />
              My Added Pets
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/adoptionRequest">
              <HandCoins className="w-5 h-5" />
              Adoption Requests
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/createDonationCampaign">
              <HandCoins className="w-5 h-5" />
              Create Donation Campaign
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/addedDonation">
              <HandCoins className="w-5 h-5" />
              My Donation Campaigns
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/myDonation">
              <HandCoins className="w-5 h-5" />
              My Donations
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/favorites">
              <Heart className="w-5 h-5" />
              Favorites
            </NavLink>
          </li>

        </ul>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8">
        <p className="text-4xl uppercase border-y-4 py-4 text-center">
          Welcome {user.displayName}
        </p>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
