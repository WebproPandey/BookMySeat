import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AdminHome from "./pages/Home";
import AdminRegister from "./pages/Admin/Register";
import AdminLogin from "./pages/Admin/Login";
import AdminDashboard from "./pages/Admin/Dashboard";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import AddBus from "./components/Admin/AddBus";
import AllBuses from "./components/Admin/AllBuses";
import EditBus from "./components/Admin/EditBus";
import ManagePromos from "./components/Admin/ManagePromos";
import AllUsers from "./components/Admin/AllUsers";
import UserBookingHistory from "./components/Admin/UserBookingHistory";
import RevenueModal from "./components/Admin/RevenueModal";
import CancelBusBookings from "./components/Admin/CancelBusBookings";


import UserHome from "./pages/UserHome";
import UserRegister from "./pages/User/Register";
import UserLogin from "./pages/User/Login";
import UserDashboard from "./pages/User/Dashboard";
import UserProtectedRoute from "./components/UserProtectedRoute";

const App = () => {
  return (
    <Router>
      <Routes>

      {/* user Route */}

      <Route path="/user/home" element={<UserHome />}/>
      <Route path="/user/register" element={<UserRegister />} />
      <Route path="/user/login" element={<UserLogin />} />
      <Route path="/user/dashboard" element={
        <UserProtectedRoute>
          <UserDashboard/>
        </UserProtectedRoute>  
        } />




       {/* Admin route  */}
        <Route path="/" element={<AdminHome />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard/*"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/add-bus"
          element={
            <AdminProtectedRoute>
              <AddBus />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/buses"
          element={
            <AdminProtectedRoute>
              <AllBuses />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/edit-bus/:id"
          element={
            <AdminProtectedRoute>
              <EditBus />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/promos"
          element={
            <AdminProtectedRoute>
              <ManagePromos />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <AdminProtectedRoute>
              <AllUsers />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/user/:id/bookings"
          element={
            <AdminProtectedRoute>
              <UserBookingHistory />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/revenue"
          element={
            <AdminProtectedRoute>
              <RevenueModal />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/cancel-bus-bookings"
          element={
            <AdminProtectedRoute>
              <CancelBusBookings/>
            </AdminProtectedRoute>
          }
        />
 
       
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;
