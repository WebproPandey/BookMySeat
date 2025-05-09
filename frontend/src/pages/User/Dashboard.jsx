import React, { useEffect } from 'react';
import { fetchUserDetails } from '../../redux/actions/user/userActions';
import { useDispatch } from 'react-redux';
import UserHome from '../../components/User/UserHome';

export default function UserDashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserDetails()); // Fetch user details on app load
  }, [dispatch]);
  return (
    <div className="w-full relative bg-blue-50">
      <div className="flex flex-col items-center justify-start min-h-screen bg-blue-50">
        <UserHome/>
      </div>
    </div>
  );
}
