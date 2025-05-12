import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom';
import NavBar from '../components/User/NavBar';
import Fotter from '../components/User/Fotter';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetails } from '../redux/actions/user/userActions';

const UserLayout = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.userAuth);
      const token = localStorage.getItem("userToken");
   useEffect(() => {
      const token = localStorage.getItem("userToken");
      if (token && !user) {
        dispatch(fetchUserDetails());
      }
    }, [dispatch, user]);

    return (
    <div className='flex flex-col justify-between min-h-screen'>
      {token && user && (
        <NavBar />
      )}
      <div className="">
        <Outlet />
      </div>
      {token && user && (
        <Fotter/>
      )}
      
    </div>
  );
}

export default UserLayout