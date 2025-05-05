import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBusUser } from "../../redux/actions/user/userActions";

const AvailableBuses = () => {
  const dispatch = useDispatch();
  const { buses, loading, error } = useSelector((state) => state.userBus); // Ensure this matches the key in the store

  useEffect(() => {
    dispatch(fetchBusUser()); // Fetch buses on component mount
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const calculatePrice = (bus) => {
    const { distance, busType, pricePerKm } = bus;
    let price = 0;

    if (busType === "AC") price = distance * pricePerKm.ac;
    else if (busType === "Non-AC") price = distance * pricePerKm.nonAc;
    else if (busType === "Deluxe") price = distance * pricePerKm.deluxe;
    else if (busType === "Non-Deluxe") price = distance * pricePerKm.nonDeluxe;

    return price.toFixed(2); 
  };

  return (
    <div className="bg-gray-100 p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {buses.map((bus) => (
        <div
          key={bus._id}
          className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden"
        >
          <div className="w-full h-48 overflow-hidden bg-gray-800">
            <img
              src={bus.busImage}
              alt={bus.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4 space-y-2">
            <h2 className="text-xl font-bold text-gray-800">{bus.name}</h2>
            <p className="text-gray-600 text-sm">
              {bus.route.from} ➝ {bus.route.to}
            </p>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Pickup: {bus.pickupTime}</span>
              <span>Drop: {bus.dropTime}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Distance: {bus.distance} km</span>
              <span>
                Seats: {bus.availableSeats.length}/{bus.seats}
              </span>
            </div>
            <div className="text-sm text-gray-500">
              Type: <span className="font-medium">{bus.busType}</span>
            </div>
          
            <div className="text-lg font-bold text-gray-800">
              Ticket Price: ₹{calculatePrice(bus)}
            </div>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => alert(`Booking ticket for ${bus.name}`)} // Placeholder for booking logic
            >
              Book Ticket
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AvailableBuses;