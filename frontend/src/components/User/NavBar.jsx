import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  logoutUser,
  fetchUserDetails,
} from "../../redux/actions/user/userActions";
import { useDispatch, useSelector } from "react-redux";
import { CloudSnowIcon, Cross, Menu, MenuIcon, User, X } from "lucide-react";

import buslogo from "../../assets/buslogo.png";
import { toast } from "react-toastify";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state.userAuth);

  const [dropdownOpen, setDropdownOpen] = useState(false);


 useEffect(() => {
    if (!user) {
      dispatch(fetchUserDetails());
    }
  },[dispatch, user]);
  
  const handleLogout = () => {
    dispatch(logoutUser(navigate));
    toast.success("Logout successful");
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="h-[15vh] w-full bg-gray-100 flex items-center justify-between px-4 md:px-10 fixed top-0 z-[99]">
      <div className="websitelogo">
        <Link to="/user/home" className="w-[20vw]  md:w-[10vw] flex items-start md:items-center  justify-center pt-6 ">
          <img
            src={buslogo}
            className="h-full  w-full  object-contain"
            alt=""
          />
        </Link>
      </div>

      <div className="Navlink hidden md:flex items-center justify-center gap-5">
        <Link
          to="/user/home"
          className="text-black font-medium text-[1.5vw] hover:text-black/40"
        >
          Home
        </Link>
        <Link
          to="/user/available-buses"
          className="text-black font-medium text-[1.5vw] hover:text-black/40"
        >
          Available Buses
        </Link>

        <Link
          to="/user/my-tickets"
          className="text-black font-medium text-[1.5vw] hover:text-black/40"
        >
          My Tickets
        </Link>
        <Link
          to="/user/promos"
          className="text-black font-medium text-[1.5vw] hover:text-black/40"
        >
          Promos
        </Link>
      </div>

      <div className="rightside flex items-center gap-4 relative">
       
        {user &&(
          <>
         <div className="md:hidden" onClick={() => setMobileMenuOpen((o) => !o)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </div>
          
        <div
          className="h-[5vh] w-[5vh] bg-gray-300 p-2 flex items-center justify-center rounded-full cursor-pointer"
          onClick={toggleDropdown}
        >
          <span className="text-black font-medium text-[4vw] md:text-[1.8vw]">
            {user?.name ? user.name.charAt(0).toUpperCase() : <User />}
          </span>
        </div>
          </>

        )}


        {dropdownOpen && (
          <div className="absolute top-[6vh] right-0 bg-white shadow-lg rounded-lg p-4 w-[50vw] md:w-[20vw]">
            <p className="text-black font-medium md:text-base text-sm">
              Name: {user?.name || "Guest"}
            </p>
            <p className="text-black font-medium md:text-base text-sm">
              Email: {user?.email || "Not Available"}
            </p>

            {user ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white text-sm md:text-base  font-medium px-4 py-2 rounded mt-4 w-full hover:bg-red-600"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/user/login"
                className="bg-blue-500 text-white text-sm md:text-base  font-medium px-4 py-2 rounded mt-4 w-full text-center hover:bg-blue-600 block"
              >
                Login
              </Link>
            )}
          </div>
        )}

        {mobileMenuOpen && (
           <div className="flex flex-col absolute top-[6vh] right-0 bg-white shadow-lg rounded-lg p-4 w-[50vw]  ">
          <Link to="/user/home" className="block px-4 py-2 hover:bg-gray-200">
            Home
          </Link>
          <Link
            to="/user/available-buses"
            className="block px-4 py-2 hover:bg-gray-200"
          >
            Available Buses
          </Link>
          <Link
            to="/user/my-tickets"
            className="block px-4 py-2 hover:bg-gray-200"
          >
            My Tickets
          </Link>
          <Link to="/user/promos" className="block px-4 py-2 hover:bg-gray-200">
            Promos
          </Link>
        </div>
        )}

        
      </div>
    </div>
  );
};

export default NavBar;
