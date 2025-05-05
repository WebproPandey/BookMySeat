import React from 'react';

import { Link } from 'react-router-dom';

export default function UserHome() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100">
      <div className="text-center bg-white p-6 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to User Panel</h1>
        <p className="text-gray-600 mb-6">
          This is the User home page. From here, you can book , buses, and ticket , cancle booking etc.
        </p>
        <Link
          to="/user/register"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Go to Register Page
        </Link>
      </div>
    </div>
  );
}
