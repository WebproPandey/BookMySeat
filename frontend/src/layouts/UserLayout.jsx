import React from 'react'
import { Outlet } from 'react-router-dom';
import NavBar from '../components/User/NavBar';

const UserLayout = () => {
    return (
    <>
      <NavBar />
      <div className="">
        <Outlet />
      </div>
    </>
  );
}

export default UserLayout