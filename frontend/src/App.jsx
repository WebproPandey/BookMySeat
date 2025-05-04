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
import EditBus from "./components/Admin/EditBus";
import ManagePromos from "./components/Admin/ManagePromos";
import AllUsers from "./components/Admin/AllUsers";
import UserBookingHistory from "./components/Admin/UserBookingHistory";
import RevenueModal from "./components/Admin/RevenueModal";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminHome />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard/*"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/add-bus"
          element={
            <ProtectedRoute>
              <AddBus />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/buses"
          element={
            <ProtectedRoute>
              <AllBuses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/edit-bus/:id"
          element={
            <ProtectedRoute>
              <EditBus />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/promos"
          element={
            <ProtectedRoute>
              <ManagePromos />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute>
              <AllUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/user/:id/bookings"
          element={
            <ProtectedRoute>
              <UserBookingHistory />
            </ProtectedRoute>
          }
        />
          <Route
          path="/admin/revenue"
          element={
            <ProtectedRoute>
              <RevenueModal/>
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;
