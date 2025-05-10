import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/actions/user/userActions";
import { handleError } from "../../utils/toast";
import { Link, useNavigate } from "react-router-dom";

export default function UserRegister() {
  const [userData, setuserData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { loading, error } = useSelector((state) => state.userAuth);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setuserData((prev) => ({ ...prev, [name]: value }));
    };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, phone,  password } = userData;
    if (!name || !email || !phone || !password) return handleError("All fields are required");
    dispatch(registerUser(userData , navigate ,handleError));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">User Registration</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={userData.name}
              name="name"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={userData.email}
              name="email"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="text"
              placeholder="Enter your phone number"
              value={userData.phone}
              name="phone"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={userData.password}
              name="password"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 text-white rounded-lg ${
              loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
           <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
               have an account?{" "}
              <Link to="/user/login" className="text-blue-500 hover:underline">
                Login
              </Link>
            </p>
          </div>

        </form>
      </div>
    </div>
  );
}