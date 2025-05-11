import React, { useEffect } from 'react'
import NavBar from '../components/Admin/NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../redux/actions/userActions';
import Header from '../components/Admin/Header';

const AdminLayout = () => {
    const dispatch = useDispatch();
    const {user , loading } = useSelector((state) => state.adminAuth);
    const token =  localStorage.getItem("adminToken");

      useEffect(() => {
          const token =  localStorage.getItem("adminToken");
          if(token && !user ){
            dispatch(fetchUsers());
          }
      }, [dispatch,user]);
    


  return (
      <div className='flex flex-col justify-between min-h-screen'>
        {token && user &&(
          <NavBar/>
        )}
        <div className="">
            {token && user &&(
          <Header/>
            )}

          <Outlet/>
         </div>
    </div>
  )
}

export default AdminLayout