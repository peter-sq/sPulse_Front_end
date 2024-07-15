import React from 'react';
import Navbar from './Navbar'; 
import Sidebar from './SideBar'; 
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <div className="p-4 shadow-4xl">
          <Navbar />
        </div>
        <div className="p-4 flex-grow bg-[#f7f7f7]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
