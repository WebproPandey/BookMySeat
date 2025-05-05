import React from 'react';
import Dashboard from '../../components/User/Dashboard';
import NavBar from '../../components/User/NavBar';

export default function UserDashboard() {
  return (
    <div className="w-full relative bg-blue-50">
    <NavBar/>
    <div className="flex flex-col items-center justify-start min-h-screen bg-blue-50">
     <Dashboard/>
    </div>
    </div>
  );
}
