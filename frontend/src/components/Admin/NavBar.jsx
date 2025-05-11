import { Banknote, Bus, BusFront, Home, List, Tag, User } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className='h-screen w-[25vw]  px-[2vw] py-2' >
      <div className='h-full w-full '>
        <div className='Navicon h-[80%] w-full relative'>
          <div className='h-full w-[5vw] absolute left-0  top-0 rounded-full bg-gray-200 z-[8]'></div>

          <div className='w-full  h-full  z-[9] relative flex justify-evenly  flex-col'>
          <Link to="/admin/dashboard" className="flex justify-between cursor-pointer items-center gap-3 pl-[1.5vw] group hover:text-blue-500 py-[2vh]">
           <Home size={28} className="transform transition-transform duration-300 ease-in-out group-hover:scale-125"/>
               <h1 className="text-[1.5vw] font-medium">Home</h1>
          </Link>
          <Link to="/admin/dashboard/add-bus" className="flex justify-between cursor-pointer items-center gap-3 pl-[1.5vw] group hover:text-blue-500 py-[2vh]">
           <BusFront size={28} className="transform transition-transform duration-300 ease-in-out group-hover:scale-125"/>
               <h1 className="text-[1.5vw] font-medium">Create Bus</h1>
          </Link>
          <Link to="/admin/dashboard/buses" className='flex justify-between cursor-pointer items-center gap-3 pl-[1.5vw] group hover:text-blue-500 py-[2vh] '>
           <List size={28}  className="transform transition-transform duration-300 ease-in-out group-hover:scale-125"/>
            <h1 className='text-[1.5vw] font-medium'>All Bus</h1>
           </Link>

            <Link to="/admin/dashboard/promos" className='flex justify-between cursor-pointer items-center gap-3 pl-[1.5vw] group hover:text-blue-500 py-[2vh] '>
           <Tag size={28}  className="transform transition-transform duration-300 ease-in-out group-hover:scale-125"/>
           <h1 className='text-[1.5vw] font-medium'>Create Promo</h1>
           </Link>
            <Link to="/admin/dashboard/users" className='flex justify-between cursor-pointer items-center gap-3 pl-[1.5vw] group hover:text-blue-500 py-[2vh] '>
           <User size={28}  className="transform transition-transform duration-300 ease-in-out group-hover:scale-125"/>
           <h1 className='text-[1.5vw] font-medium'>All User</h1>
           </Link>
            <Link to="/admin/dashboard/revenue" className='flex justify-between cursor-pointer items-center gap-3 pl-[1.5vw] group hover:text-blue-500 py-[2vh] '>
           <Banknote size={28}  className="transform transition-transform duration-300 ease-in-out group-hover:scale-125"/>
           <h1 className='text-[1.5vw] font-medium'>Revenue</h1>
           </Link>
          </div>

        </div>
        <div className='h-[20%] w-full  flex justify-between items-center'>
          <div className='h-[6vh] w-[6vh] rounded-full bg-gray-300 flex  items-center  justify-center'>
           <User size={24} className='text-black' />
          </div>
          <div className='text-[1vw] font-semibold'>User Name ..</div>
        </div>
      </div>

    </div>
  )
}

export default NavBar