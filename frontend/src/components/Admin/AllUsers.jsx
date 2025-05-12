import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../redux/actions/userActions";
import { useNavigate } from "react-router-dom";

export default function AllUsers() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, loading } = useSelector((state) => state.user);


  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleViewBookings = (userId) => {
    navigate(`/admin/dashboard/user/${userId}/bookings`);
  };

  return (
    <div className=" py-3  px-4 bg-white h-full  sticky top-0">
      <div className="w-full px-2 py-3 h-[10vh] bg-gray-100 rounded-tl-2xl rounded-tr-2xl"> 
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      </div>
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <div className="Alluser space-y-4 grid  grid-cols-2 md:grid-cols-4  px-2 h-[70vh] md:h-fit overflow-scroll z-[5]   pt-0 pb-10 md:py-8  gap-x-3 gap-y-3 w-full bg-gray-100  ">
          {users.map((user) => (
            <div key={user._id} className="p-4  flex flex-col h-full  items-start  justify-between bg-white rounded shadow">
              <h2 className="text-lg font-bold">{user.name}</h2>
              <p>Email: {user.email}</p>
              <button
                onClick={() => handleViewBookings(user._id)}
                className="bg-blue-500 hover-bg-blue-600  cursor-pointer  text-white px-4 py-2 rounded"
              >
                View Bookings
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}