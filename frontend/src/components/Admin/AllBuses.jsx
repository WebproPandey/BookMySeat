import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBuses } from "../../redux/actions/busAction";
import { Link } from "react-router-dom";

export default function AllBuses() {
  const dispatch = useDispatch();
  const { buses, loading, error } = useSelector((state) => state.bus);

  console.log("Buses:", buses);

  useEffect(() => {
    dispatch(fetchBuses());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="w-full mx-auto ">
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-800">All Buses</h1>

        {buses.length === 0 ? (
          <div className="text-center">
            <p className="text-lg text-gray-600 mb-4">No buses available.</p>
            <Link
              to="/admin/add-bus"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-lg transition"
            >
              Create Bus
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-red-200 w-full">
            {buses?.map((bus) => (
              <BusCard key={bus._id} bus={bus} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
function BusCard({ bus }) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden max-w-md mx-auto">
      {/* Image section */}
      <div className="w-full h-48 overflow-hidden bg-gray-800">
        <img
          src={bus?.busImage}
          alt={bus?.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Details section */}
      <div className="p-4 space-y-2">
        <h2 className="text-xl font-bold text-gray-800">{bus?.name}</h2>
        <p className="text-gray-600 text-sm">
          {bus?.route?.from} ➝ {bus?.route?.to}
        </p>

        <div className="flex justify-between text-sm text-gray-500">
          <span>Pickup: {bus?.pickupTime}</span>
          <span>Drop: {bus?.dropTime}</span>
        </div>

        <div className="flex justify-between text-sm text-gray-500">
          <span>Distance: {bus?.distance} km</span>
          <span>Seats: {bus?.availableSeats?.length}/{bus?.seats}</span>
        </div>

        <div className="text-sm text-gray-500">
          Type: <span className="font-medium">{bus?.busType}</span>
        </div>

        <div className="pt-2 text-sm text-gray-700">
          <p className="font-semibold">Pricing (₹/km):</p>
          <div className="grid grid-cols-2 gap-1 mt-1">
            {bus?.pricePerKm?.ac && <span>AC: ₹{bus.pricePerKm.ac}</span>}
            {bus?.pricePerKm?.nonAc && <span>Non-AC: ₹{bus.pricePerKm.nonAc}</span>}
            {bus?.pricePerKm?.deluxe && <span>Deluxe: ₹{bus.pricePerKm.deluxe}</span>}
            {bus?.pricePerKm?.nonDeluxe && <span>Non-Deluxe: ₹{bus.pricePerKm.nonDeluxe}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}