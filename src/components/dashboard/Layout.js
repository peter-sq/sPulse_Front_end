import React from 'react';
import Navbar from './Navbar'; // Assuming you have a Navbar component
import Sidebar from './SideBar'; // Assuming you have a Sidebar component
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="flex">
      <Sidebar /> {/* Sidebar component */}
      <div className="flex-1">
        <div className="p-4">
          <Navbar /> {/* Navbar component */}
        </div>
        <div className="p-4">
          <Outlet /> {/* This renders the child routes */}
        </div>
      </div>
    </div>
  );
};

export default Layout;
