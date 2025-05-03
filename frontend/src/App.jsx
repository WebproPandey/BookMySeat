import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AdminHome from "./pages/Home";
import AdminRegister from "./pages/Admin/Register";
import AdminLogin from "./pages/Admin/Login";
import AdminDashboard from "./pages/Admin/Dashboard";
import ProtectedRoute from "./components/Admin/ProtectedRoute";
import AddBus from "./components/Admin/AddBus";
import AllBuses from "./components/Admin/AllBuses";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminHome />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard/*"element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/add-bus"element={
            <ProtectedRoute>
              <AddBus/>
            </ProtectedRoute>
          }
        />
         <Route
          path="/admin/buses"
          element={
            <ProtectedRoute>
              <AllBuses/>
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;
