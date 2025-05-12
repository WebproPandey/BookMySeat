import React from 'react'
import NavBar from '../components/Admin/NavBar'
import { Outlet } from 'react-router-dom'
import Header from '../components/Admin/Header';

const AdminLayout = () => {
    const token =  localStorage.getItem("adminToken");
  return (
      <div className='flex flex-col justify-between min-h-screen'>
        {token && (
          <NavBar/>
        )}
        <div className="">
            {token && (
          <Header/>
            )}

          <Outlet/>
         </div>
    </div>
  )
}

export default AdminLayout