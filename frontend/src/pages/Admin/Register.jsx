import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerAdmin } from "../../redux/actions/adminAuthActions";
import { handleError, handleSuccess } from "../../utils/toast";

export default function AdminRegister() {
  const [adminData, setAdminData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.adminAuth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = adminData;
    if (!name || !email || !password) return handleError("All fields are required");

    dispatch(registerAdmin(adminData, navigate, handleError));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <input
            onChange={handleChange}
            value={adminData.name}
            type="text"
            name="name"
            placeholder="Name"
            className="w-full px-3 py-2 border rounded"
          />
          <input
            onChange={handleChange}
            value={adminData.email}
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-3 py-2 border rounded"
          />
          <input
            onChange={handleChange}
            value={adminData.password}
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-3 py-2 border rounded"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/admin/login" className="text-green-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
