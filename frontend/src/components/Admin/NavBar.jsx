import { Banknote, Bus, BusFront, Home, List, Tag, User } from 'lucide-react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { fetchCurrentAdmin, logoutAdmin } from '../../redux/actions/adminAuthActions';

const NavBar = () => {

  const navigate = useNavigate();
   const dispatch = useDispatch();
  const { token, admin } = useSelector((state) => state.adminAuth);

  useEffect(() => {
    if (token && !admin) {
      dispatch(fetchCurrentAdmin());
    }
  }, [token, admin, dispatch]);


  const handleLogout = () => {
    dispatch(logoutAdmin(navigate));
  };


    
  return (
    <div className='h-[10vh] md:h-screen w-full md:w-[25vw]  px-[2vw] md:py-2  z-[8] bg-gray-100' >
      <div className='h-full w-full flex md:flex-col flex-row  items-end '>
        <div className='Navicon h-[80%] w-[75%] md:w-full relative'>
          <div className='h-full w-full md:w-[5vw] absolute left-0  bottom-0 md:top-0 rounded-full bg-gray-200 z-[8]'></div>

          <div className='w-full  h-full  z-[9] relative flex justify-evenly  flex-row md:flex-col'>
          <Link to="/admin/dashboard" className="flex justify-between cursor-pointer items-center gap-3 pl-[1.5vw] group hover:text-blue-500 py-[2vh]">
           <Home size={28} className="transform transition-transform duration-300 ease-in-out group-hover:scale-125"/>
               <h1 className="hidden md:block  text-[1.5vw] font-medium">Home</h1>
          </Link>
          <Link to="/admin/dashboard/add-bus" className="flex justify-between cursor-pointer items-center gap-3 pl-[1.5vw] group hover:text-blue-500 py-[2vh]">
           <BusFront size={28} className="transform transition-transform duration-300 ease-in-out group-hover:scale-125"/>
               <h1 className="hidden md:block  text-[1.5vw] font-medium">Create Bus</h1>
          </Link>
          <Link to="/admin/dashboard/buses" className='flex justify-between cursor-pointer items-center gap-3 pl-[1.5vw] group hover:text-blue-500 py-[2vh] '>
           <List size={28}  className="transform transition-transform duration-300 ease-in-out group-hover:scale-125"/>
            <h1 className='hidden md:block  text-[1.5vw] font-medium'>All Bus</h1>
           </Link>

            <Link to="/admin/dashboard/promos" className='flex justify-between cursor-pointer items-center gap-3 pl-[1.5vw] group hover:text-blue-500 py-[2vh] '>
           <Tag size={28}  className="transform transition-transform duration-300 ease-in-out group-hover:scale-125"/>
           <h1 className='hidden md:block  text-[1.5vw] font-medium'>Create Promo</h1>
           </Link>
            <Link to="/admin/dashboard/users" className='flex justify-between cursor-pointer items-center gap-3 pl-[1.5vw] group hover:text-blue-500 py-[2vh] '>
           <User size={28}  className="transform transition-transform duration-300 ease-in-out group-hover:scale-125"/>
           <h1 className='hidden md:block  text-[1.5vw] font-medium'>All User</h1>
           </Link>
            <Link to="/admin/dashboard/revenue" className='flex justify-between cursor-pointer items-center gap-3 pl-[1.5vw] group hover:text-blue-500 py-[2vh] '>
           <Banknote size={28}  className="transform transition-transform duration-300 ease-in-out group-hover:scale-125"/>
           <h1 className='hidden md:block  text-[1.5vw] font-medium'>Revenue</h1>
           </Link>
          </div>

        </div>
        <div className='md:h-[20%] w-[25%] md:w-full z-[8] flex justify-evenly md:justify-between items-center'>
          {admin ?(
             <>
              <div className=' text-[3.5vw] md:text-[1.2vw] font-semibold  md:py-3  md:px-4 rounded-full  px-3 py-2    bg-gray-200'> {admin.name?.charAt(0).toUpperCase()}</div>
              <button
                onClick={handleLogout}
                className='bg-red-500 text-white text-[2.5vw] md:text-[1vw] md:px-3 md:py-2 py-3 px-1 rounded-full md:rounded-lg hover:bg-red-600 transition'
              >
                Logout
              </button>
            </>
           
          ):(
           
             <>
             <div className='h-[6vh] w-[6vh] rounded-full bg-gray-300 flex items-center justify-center'>
              <User size={24} className='text-black' />
            </div>
              <button
                onClick={() => navigate("/admin/login")}
                className='bg-green-500 text-white text-[2.5vw] md:text-[1vw] md:px-3 md:py-2 py-2 px-1 rounded-full  md:rounded-lg hover:bg-red-600 transition'
              >
                Login
              </button>
            </>
          ) 
        }
        </div>
      </div>

    </div>
  )
}

export default NavBar