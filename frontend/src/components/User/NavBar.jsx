import { User } from 'lucide-react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logoutUser } from "../../redux/actions/user/userActions";
import { useDispatch } from "react-redux";



const NavBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const handleLogout = () => {
      dispatch(logoutUser(navigate));
    };
  return (
    <div className="h-[15vh] w-full bg-blue-400/30 flex items-center  justify-between px-10 sticky  top-0">
      <div className="websitelogo">
      <div className="w-[10vw] text-[3vw] text-black">LOGO</div>
      </div>
      <div className="Navlink flex   items-center  justify-center  gap-3">
        <Link to="available-buses" className="text-black font-medium text-[1.5vw] hover:text-blue-700">
          Available Buses
        </Link>
        <Link to="my-tickets" className="text-black font-medium text-[1.5vw] hover:text-blue-700">
          My Tickets
        </Link>
        <Link to="promos" className="text-black font-medium text-[1.5vw] hover:text-blue-700">
          Promos
        </Link>
        <Link to="download-ticket" className="text-black font-medium text-[1.5vw] hover:text-blue-700">
          Download Ticket
        </Link>
      </div>
      <div className="rightside flex items-center gap-4">
       <div className="h-[5vh] w-[5vh] bg-gray-300 p-2 flex items-center  justify-center rounded-full">
        <User className="text-black font-medium text-[1.5vw] hover:text-blue-700" />
       </div>
        <button
          onClick={handleLogout}
          className="bg-gray-300 text-black font-medium px-6 py-2 rounded hover:bg-gray-400"
          >
          Logout
        </button>
      </div>
      </div>
  )
}

export default NavBar