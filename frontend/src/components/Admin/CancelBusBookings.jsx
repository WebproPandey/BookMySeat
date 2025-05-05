import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cancelBusBookings } from '../../redux/actions/cancelBusBookings';
import { useNavigate } from 'react-router-dom';

export default function CancelBusBookings() {
  const [busId, setBusId] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const { loading, successMessage, error } = useSelector((state) => state.cancelBusBookings);

  console.log('Cancel Bus Bookings:',  successMessage);

  const handleCancelBookings = () => {
    if (busId) {
      dispatch(cancelBusBookings(busId));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-3/4">
        <h2 className="text-2xl font-bold mb-4">Cancel Bus Bookings</h2>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Enter Bus ID"
            value={busId}
            onChange={(e) => setBusId(e.target.value)}
            className="p-2 border rounded w-full"
          />
          <button
            onClick={handleCancelBookings}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            disabled={loading}
          >
            {loading ? 'Cancelling...' : 'Cancel Bookings'}
          </button>
        </div>
        {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
        {error && <p className="text-red-500 mt-4">{error}</p>}
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Close
        </button>
      </div>
    </div>
  );
}