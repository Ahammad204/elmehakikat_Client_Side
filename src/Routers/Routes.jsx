import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home/Home";
import { BlogsDetails } from "../Pages/Home/Blogs/BlogsDetails";
import { Books } from "../Pages/Books/Books/Books";
import { Music } from "../Pages/Songs/Songs/Songs";
import { MusicDetails } from "../Pages/Songs/Songs/SongsDetails";
import Dashboard from "../Pages/Dashboard/Dashboard";
import AddMusic from "../Pages/Admin/AddMusic/AddMusic";
import AllMusic from "../Pages/Admin/AllMusic/AllMusic";
import UpdateMusic from "../Pages/Admin/AllMusic/UpdateMusic";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/blog/:id",
        element: <BlogsDetails />,
      },
      {
        path: "/books",
        element: <Books />,
      },
      {
        path: "/songs",
        element: <Music />,
      },
      {
        path: "/music/:id",
        element: <MusicDetails />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children:[
      {
      path:"/dashboard/music-library",
      element:<AddMusic></AddMusic>
    },{
      path:"/dashboard/all-music",
      element:<AllMusic></AllMusic>
    },{
      path:"/dashboard/update-music/:id",
      element:<UpdateMusic></UpdateMusic>
    }
  ]
  },
]);
