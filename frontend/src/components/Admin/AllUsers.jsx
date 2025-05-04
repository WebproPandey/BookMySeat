import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../redux/actions/userActions";
import { useNavigate } from "react-router-dom";

export default function AllUsers() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, loading } = useSelector((state) => state.user);

//   console.log("users:", users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleViewBookings = (userId) => {
    navigate(`/admin/user/${userId}/bookings`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <div className="space-y-4">
          {users.map((user) => (
            <div key={user._id} className="p-4 bg-gray-100 rounded shadow">
              <h2 className="text-lg font-bold">{user.name}</h2>
              <p>Email: {user.email}</p>
              <button
                onClick={() => handleViewBookings(user._id)}
                className="bg-blue-600 text-white px-4 py-2 rounded"
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