import React from "react";
import Home from "../pages/Home";
import {  createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/adminPage/Login.jsx";
import AdminPageLayout from "../layout/AdminPageLayout.jsx";
import DashBoard from "../pages/adminPage/DashBoard.jsx";
import ProductsListing from "../pages/ProductsListing.jsx";
import CategoryPage from "../pages/CategoryPage.jsx";


let router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        index:true,
        element:<Home/>
      },
      {
        element:<ProductsListing/>,
        path:"/products"
      },
      {
        path:"/:category",
        element:<CategoryPage/>
      },
      {
        path:"/:category/:subcategory",
        element:<CategoryPage/>
      }
    ]
  },
   {
        path:'/admin/login',
        element:<Login/>
      },
  {
    path:"/admin",
    element:<AdminPageLayout/>,
    children:[
     
      {
        path:"dashboard",
        element:<DashBoard/>
      }
    ]
  }
])



export default router;
