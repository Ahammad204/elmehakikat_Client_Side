import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home/Home";
import { BlogsDetails } from "../Pages/Home/Blogs/BlogsDetails";
import { Books } from "../Pages/Books/Books/Books";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },{
        path:"/blog/:id",
        element:<BlogsDetails></BlogsDetails>
      },{
        path:"/books",
        element:<Books></Books>
      }
    ],
  },
]);
