import React from 'react'
import { Outlet } from 'react-router-dom';
import NavBar from '../components/User/NavBar';
import Fotter from '../components/User/Fotter';

const UserLayout = () => {
    return (
    <>
      <NavBar />
      <div className="">
        <Outlet />
      </div>
      <Fotter/>
    </>
  );
}

export default UserLayout