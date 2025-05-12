import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
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
import UserProtectedRoute from "./components/UserProtectedRoute";
import AvailableBuses from "./components/User/AvailableBuses";
import MyTicket from "./components/User/MyTicket";
import AvailablePromo from "./components/User/AvailablePromo";
import UserHomes from "./components/User/UserHome";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import AdminHome from "./pages/AdminHome";


const App = () => {
  return (
    <Router>
      <Routes>

      {/* user Route */}
     <Route path="/" element={<UserLayout/>}>
      <Route index element={<UserHome />}/>
      <Route path="/user/register" element={<UserRegister />} />
      <Route path="/user/login" element={<UserLogin />} />
      <Route path="/user/home" element={
        <UserProtectedRoute>
          <UserHomes/>
        </UserProtectedRoute>  
        }/>
        <Route path="/user/available-buses" element={
          <UserProtectedRoute>
            <AvailableBuses/>
            </UserProtectedRoute>
          } />
        <Route path="/user/my-tickets" element={
          <UserProtectedRoute>
            <MyTicket/>
          </UserProtectedRoute>
          } />
        <Route path="/user/promos" element={
          <UserProtectedRoute>
            <AvailablePromo/>
          </UserProtectedRoute>
          } />
          
     </Route>







       {/* Admin route  */}
        <Route path="/admin"  element={<AdminHome/>} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/login" element={<AdminLogin />} />
       
        <Route path="/admin/dashboard" element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        }>
          <Route path="add-bus" element={<AddBus />} />
          <Route path="buses" element={<AllBuses />} />
          <Route path="edit-bus/:id" element={<EditBus />} />
          <Route path="promos" element={<ManagePromos />} />
          <Route path="users" element={<AllUsers />} />
          <Route path="user/:id/bookings" element={<UserBookingHistory />} />
          <Route path="revenue" element={<RevenueModal />} />
          <Route path="cancel-bus-bookings" element={<CancelBusBookings />} />
        </Route>

       
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;
