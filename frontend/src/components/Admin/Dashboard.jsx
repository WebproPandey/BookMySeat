// components/admin/Dashboard.jsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bus, Users, Percent, BarChart3 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logoutAdmin } from '../../redux/actions/adminAuthActions';
import AllBuses from './AllBuses';
    

export default function Dashboard() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutAdmin(navigate));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 relative">
      <div className="w-full mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-800">Admin Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sticky top-0 bg-gray-200">
          <DashboardCard
            title="Manage Buses"
            icon={<Bus className="w-8 h-8 text-blue-500" />}
            link="/admin/add-bus"
          />
          <DashboardCard
            title="Promo Codes"
            icon={<Percent className="w-8 h-8 text-green-500" />}
            link="/admin/promos"
          />
          <DashboardCard
            title="Users"
            icon={<Users className="w-8 h-8 text-purple-500" />}
            link="/admin/users"
          />
          <DashboardCard
            title="Revenue Stats"
            icon={<BarChart3 className="w-8 h-8 text-orange-500" />}
            link="/admin/revenue"
          />
          <div className="mt-10 text-center">
          <Link 
             onClick={handleLogout}
          to="/" className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full text-lg transition">
            Logout
          </Link>
        </div>
        </div>

        <AllBuses/>

        
      </div>
    </div>
  );
}

function DashboardCard({ title, icon, link }) {
  return (
    <Link
      to={link}
      className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition flex items-center space-x-4 hover:bg-blue-50"
    >
      <div>{icon}</div>
      <div>
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500">Click to manage</p>
      </div>
    </Link>
  );
}
