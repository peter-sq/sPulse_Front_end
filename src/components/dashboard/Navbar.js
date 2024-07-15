import React from 'react';
import Toggle from './ThemeToggle';

const Navbar = () => {
  return (
    <nav className='bg-white border-gray-200 mx-2 px-2 py-2.5 rounded dark:bg-gray-800'>
      <div className='container flex justify-between items-center mx-auto pt-3'>
        <div className='flex '>
        <div className="flex justify-center px-[26rem] space-x-16">
        <div className='px-18 text-lg  font-bold tracking-normal leading-6 text-center
        font-sans'></div>
        <div className='px-18 text-lg   font-bold tracking-normal leading-6 text-center
        font-sans'><a href=''>Home</a></div>
        <div className='px-18 text-lg   font-bold tracking-normal leading-6 text-center
        font-sans'><a href=''>Shop</a></div>
        <div className='px-18 text-lg   font-bold tracking-normal leading-6 text-center
        font-sans'><a href=''>About</a></div>
          <div className='px-18 text-lg   font-bold tracking-normal leading-6 text-center
        font-sans'><a href=''>Contact Us</a></div>
      </div>
        </div>
        <div className='flex justify-end pr-4'>
          <Toggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
