import React from 'react';

import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
      <h1 className="text-3xl font-bold mb-4">Welcome to Dashboard</h1>
      <Link to="/" className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Logout</Link>
    </div>
  );
}
