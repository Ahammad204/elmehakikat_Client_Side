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
import AddBook from "../Pages/Admin/AddBook/AddBook";
import AddBlog from "../Pages/Admin/AddBlog/AddBlog";
import CategoryManager from "../Pages/Admin/CategoryManager/CategoryManager";
import AllBook from "../Pages/Admin/AllBook/AllBook";
import UpdateBook from "../Pages/Admin/AllBook/UpdateBook";
import AllBlog from "../Pages/Admin/AllBlog/AllBlog";
import UpdateBlog from "../Pages/Admin/AllBlog/UpdateBlog";

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
  },{
  
      path: "/blog/:id",
      element: <BlogsDetails />,
    
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard/music-library",
        element: <AddMusic></AddMusic>,
      },
      {
        path: "/dashboard/all-music",
        element: <AllMusic></AllMusic>,
      },
      {
        path: "/dashboard/all-book",
        element: <AllBook></AllBook>,
      },
      {
        path: "/dashboard/update-music/:id",
        element: <UpdateMusic></UpdateMusic>,
      },
      
      {
        path: "/dashboard/all-blog",
        element: <AllBlog></AllBlog>,
      },
      {
        path: "/dashboard/update-blog/:id",
        element: <UpdateBlog></UpdateBlog>,
      },
      
      {
        path: "/dashboard/update-book/:id",
        element: <UpdateBook></UpdateBook>,
      },
      {
        path: "/dashboard/add-book",
        element: <AddBook></AddBook>,
      },
      {
        path: "/dashboard/add-blog",
        element: <AddBlog></AddBlog>,
      },
      {
        path: "/dashboard/category-manage",
        element: <CategoryManager></CategoryManager>,
      },
    ],
  },
]);
