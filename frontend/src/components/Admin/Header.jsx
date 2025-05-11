import React from 'react'
import buslogo from "../../assets/buslogo.png";
import { Link } from 'react-router-dom';


const Header = () => {
  return (
     <div className=' flex items-center  justify-between  w-full px-7 '>
            
            <div className='logo '>
               <Link to="/user/home" className="w-[20vw]  md:w-[6vw] flex items-start md:items-center  justify-center ">
                        <img
                          src={buslogo}
                          className="h-full  w-full  object-contain"
                          alt=""/>
                  </Link> 
              

            </div>
             <div className=''>
                <h1 className='text-black font-semibold uppercase'>BusYatra</h1>
                </div>   
               

          </div>
  )
}

export default Header