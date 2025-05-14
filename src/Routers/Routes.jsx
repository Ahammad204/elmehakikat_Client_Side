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
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import { Userprofile } from "../Pages/Dashboard/UserProfile/Userprofile";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRouter";
import AllUser from "../Pages/Admin/AllUser/AllUser";

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
    
  },{
        path:"/login",
        element:<Login></Login>
      },{
        path:"/register",
        element:<Register></Register>
      },
  {
    path: "/dashboard",
    element: <PrivateRoute><Dashboard /></PrivateRoute>,

    children: [
      {
        path:"/dashboard",
        element:<PrivateRoute><Userprofile></Userprofile></PrivateRoute>
      },
      {
        path: "/dashboard/music-library",
        element: <PrivateRoute><AdminRoute><AddMusic></AddMusic></AdminRoute></PrivateRoute>,
      },
      {
        path: "/dashboard/all-music",
        element: <PrivateRoute><AdminRoute><AllMusic></AllMusic></AdminRoute></PrivateRoute>,
      },
      {
        path: "/dashboard/all-book",
        element: <PrivateRoute><AdminRoute><AllBook></AllBook></AdminRoute></PrivateRoute>,
      },
      {
        path: "/dashboard/update-music/:id",
        element: <PrivateRoute><AdminRoute><UpdateMusic></UpdateMusic></AdminRoute></PrivateRoute>,
      },
      
      {
        path: "/dashboard/all-blog",
        element: <PrivateRoute><AdminRoute><AllBlog></AllBlog></AdminRoute></PrivateRoute>,
      },
      {
        path: "/dashboard/update-blog/:id",
        element: <PrivateRoute><AdminRoute><UpdateBlog></UpdateBlog></AdminRoute></PrivateRoute>,
      },
      
      {
        path: "/dashboard/update-book/:id",
        element: <PrivateRoute><AdminRoute><UpdateBook></UpdateBook></AdminRoute></PrivateRoute>,
      },
      {
        path: "/dashboard/add-book",
        element: <PrivateRoute><AdminRoute><AddBook></AddBook></AdminRoute></PrivateRoute>,
      },
      {
        path: "/dashboard/add-blog",
        element: <PrivateRoute><AdminRoute><AddBlog></AddBlog></AdminRoute></PrivateRoute>,
      },
      {
        path: "/dashboard/category-manage",
        element: <PrivateRoute><AdminRoute><CategoryManager></CategoryManager></AdminRoute></PrivateRoute>,
      },
      
      {
        path: "/dashboard/all-user",
        element: <PrivateRoute><AdminRoute><AllUser></AllUser></AdminRoute></PrivateRoute>,
      },
    ],
  },
]);
