import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AdminHome from './pages/Home';
import AdminRegister from './pages/Admin/Register';
import AdminLogin from './pages/Admin/Login';
import AdminDashboard from './pages/Admin/Dashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminHome/>} />
        <Route path="/admin/register" element={<AdminRegister/>} />
        <Route path="/admin/login" element={<AdminLogin/>} />
        <Route path="/admin/dashboard/*" element={<AdminDashboard/>} />
      </Routes>
      <ToastContainer/> 
    </Router>
  );
};

export default App;