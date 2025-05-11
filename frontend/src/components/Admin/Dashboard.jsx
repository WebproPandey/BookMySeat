// components/admin/Dashboard.jsx

import React from 'react';
import { Outlet, useLocation,  } from 'react-router-dom';
import NavBar from './NavBar';
import buslogo from "../../assets/buslogo.png";
import Hero from './Hero';
import Header from './Header';


    

export default function Dashboard() {
   const location = useLocation();
  const showHero = location.pathname === "/admin/dashboard";
  return (
    <div className="min-h-screen w-full bg-gray-100  relative">
      <div className="w-full flex items-center  justify-between">
        <NavBar/>
        <div className='w-full bg-white h-screen flex flex-col  items-center rounded-tl-2xl rounded-bl-2xl' >
          <Header/>
          {/* change componetes */}
          <div className='w-full  h-full'>
              {showHero ? <Hero /> : <Outlet />}
          </div>
        </div>
      </div>
    </div>
  );
}


