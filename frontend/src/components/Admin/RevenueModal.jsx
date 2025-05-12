import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { fetchRevenueStats } from '../../redux/actions/revenueAction';
import { useNavigate } from 'react-router-dom'; 

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function RevenueModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const { loading, revenueStats, error } = useSelector((state) => state.revenue);


  useEffect(() => {
    dispatch(fetchRevenueStats());
  }, [dispatch]);

  const chartData = {
    labels: ['Today', 'This Week', 'This Month', 'This Year'],
    datasets: [
      {
        label: 'Revenue (₹)',
        data: [
          revenueStats?.today || 0,
          revenueStats?.week || 0,
          revenueStats?.month || 0,
          revenueStats?.year || 0,
        ],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="inset-0 bg-gray-200 px-4  py-5   bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-3/4">
        <h2 className="text-2xl font-bold mb-4">Revenue Statistics</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <Bar data={chartData} />
        )}
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
}