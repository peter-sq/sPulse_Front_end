import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../components/dashboard/Layout";
import Admin from "../pages/Admin";
import Home from "../pages/Home";
import Profile from '../components/dashboard/pages/Profile';
import Dashboard from '../components/dashboard/pages/Dashboard';
import CreateGame from "../components/dashboard/pages/CreateGame";

const Router = () => {
  const routes = [
    { path: '/', element: <Home /> },
    {
      path: '/',
      element: <Layout />, // This wraps the following routes in the Layout component
      children: [
        { path: '/admin', element: <Dashboard /> },
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'profile', element: <Profile /> },
        { path: 'dashboard/create-game', element: <CreateGame /> }
      ]
    }
  ];

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};

export default Router;
