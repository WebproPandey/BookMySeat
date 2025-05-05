import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser} from "../../redux/actions/user/userActions";
import { handleError } from "../../utils/toast";
import { useNavigate } from "react-router-dom";

export default function UserLogin() {
  const [loginData, setloginData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { loading, error } = useSelector((state) => state.userAuth);

  const handleChange = (e) => {
    setloginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const {email,  password } = loginData;
    if ( !email || !password) return handleError("All fields are required");
    dispatch(loginUser(loginData , navigate ,handleError));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">User Registration</h2>
        <form onSubmit={handleSignup} className="space-y-4">
        
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={loginData.email}
              name="email"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
     
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={loginData.password}
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
            {loading ? "Loging..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}