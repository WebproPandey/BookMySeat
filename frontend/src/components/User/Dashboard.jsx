import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/actions/user/userActions";

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser(navigate));
  };

  return (
    <div className="user-dashboard">
      <h1 className="text-3xl font-bold text-center mb-6">User Dashboard</h1>

      <div className="features-placeholder text-center">
        <p className="text-lg text-gray-600">Welcome to your dashboard!</p>
        <p className="text-gray-500">Here you will see your tickets, available buses, and more.</p>
      </div>

      {/* Logout Button */}
      <div className="logout-container text-center mt-8">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}