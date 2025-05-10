import React from 'react'
import { Outlet } from 'react-router-dom';
import NavBar from '../components/User/NavBar';
import Fotter from '../components/User/Fotter';

const UserLayout = () => {
    return (
    <div className='flex flex-col justify-between min-h-screen'>
      <NavBar />
      <div className="">
        <Outlet />
      </div>
      <Fotter/>
    </div>
  );
}

export default UserLayout