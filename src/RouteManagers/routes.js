import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../components/dashboard/Layout";
import Admin from "../pages/Admin";
import Home from "../pages/Home";
import Profile from '../components/dashboard/pages/Profile';
import Dashboard from '../components/dashboard/pages/Dashboard';
import CreateGame from "../components/dashboard/pages/CreateGame";
import Registeration from "../pages/Registeration";
import Login from "../pages/Login"


const Router = () => {
  const routes = [
    { path: '/', element: <Home /> },
    { path: '/register', element: <Registeration /> },
    { path: '/login', element: <Login /> },
    {
      path: '/',
      element: <Layout />, 
      children: [
        { path: '/admin', element: <Dashboard /> },
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'profile', element: <Profile /> },
        { path: 'dashboard/create-game/:_id', element: <CreateGame /> }
      ]
    }
  ];

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};

export default Router;
