import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser, fetchUserDetails } from "../../redux/actions/user/userActions";
import { useDispatch, useSelector } from "react-redux";
import { User } from "lucide-react";

import buslogo from "../../assets/buslogo.png" 
import buslogo1 from "../../assets/buslogo1.png" 
import buslogo2 from "../../assets/buslogo2.png" 

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state.userAuth);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      dispatch(fetchUserDetails()); // Fetch user details if not already loaded
    }
  }, [dispatch, user]);

  const handleLogout = () => {
    dispatch(logoutUser(navigate));
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="h-[15vh] w-full bg-blue-400/30 flex items-center justify-between px-10 fixed top-0 z-[99]">
      <div className="websitelogo">
        <div className="w-[10vw] flex items-center  justify-center pt-6 ">
          <img src={buslogo} className="h-full  w-full  object-cover" alt="" />
        </div>
      </div>

      <div className="Navlink flex items-center justify-center gap-5">
        <Link to="/user/home" className="text-black font-medium text-[1.5vw] hover:text-white">
          Home
        </Link>
        <Link to="/user/available-buses" className="text-black font-medium text-[1.5vw] hover:text-white">
          Available Buses
        </Link>
     
        <Link to="/user/my-tickets" className="text-black font-medium text-[1.5vw] hover:text-white">
          My Tickets
        </Link>
        <Link to="/user/promos" className="text-black font-medium text-[1.5vw] hover:text-white">
          Promos
        </Link>
         <Link to="/user/about" className="text-black font-medium text-[1.5vw] hover:text-white">
          About
        </Link>
        <Link to="/user/services" className="text-black font-medium text-[1.5vw] hover:text-white">
          services
        </Link>
       
      </div>

      <div className="rightside flex items-center gap-4 relative">
        <div
          className="h-[5vh] w-[5vh] bg-gray-300 p-2 flex items-center justify-center rounded-full cursor-pointer"
          onClick={toggleDropdown}
        >
          <span className="text-black font-medium text-[1.8vw]">
            {user?.name ? user.name.charAt(0).toUpperCase() :  <User/> }
          </span>
        </div>
        {dropdownOpen && (
          <div className="absolute top-[6vh] right-0 bg-white shadow-lg rounded-lg p-4 w-[20vw]">
            <p className="text-black font-medium">Name: {user?.name || "Guest"}</p>
            <p className="text-black font-medium">Email: {user?.email || "Not Available"}</p>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white font-medium px-4 py-2 rounded mt-4 w-full hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;