import React from "react";
import { Navigate } from "react-router-dom";

const UserProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("userToken"); 
  return token ? children : <Navigate to="/user/login" />; 
};

export default UserProtectedRoute;