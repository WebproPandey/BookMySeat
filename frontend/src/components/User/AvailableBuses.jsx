import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBusUser, createOrder, bookTicket } from "../../redux/actions/user/userActions";
import axios from "axios";
import api from "../../services/api";

const AvailableBuses = () => {
  const dispatch = useDispatch();

  // Getting buses data
  const { buses, loading, error } = useSelector((state) => state.userBus);

  // Getting logged-in user info
  const { userInfo } = useSelector((state) => state.userAuth);

  const [promoCodes, setPromoCodes] = useState({});
  const [selectedSeats, setSelectedSeats] = useState({}); // State for selected seats per bus

  useEffect(() => {
    dispatch(fetchBusUser());
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

    return price.toFixed();
  };

  const handleSeatSelection = (busId, seat) => {
    setSelectedSeats((prev) => {
      const busSeats = prev[busId] || [];
      if (busSeats.includes(seat)) {
        // Deselect seat
        return { ...prev, [busId]: busSeats.filter((s) => s !== seat) };
      } else {
        // Select seat
        return { ...prev, [busId]: [...busSeats, seat] };
      }
    });
  };

  const handlePromoCodeChange = (busId, code) => {
    setPromoCodes((prev) => ({
      ...prev,
      [busId]: code,
    }));
  };

  const handleBookTicket = async (bus) => {
    try {
      const busSelectedSeats = selectedSeats[bus._id] || [];
      const baseAmount = calculatePrice(bus) * busSelectedSeats.length;

      // Apply promo code   
       const promoCode = promoCodes[bus._id];

      let discountedAmount = baseAmount;
      if (promoCode) {
          const token = localStorage.getItem("userToken");
          const promoResponse = await api.get(`/api/user/promos?code=${promoCodes}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        );
        const promo = await promoResponse.data
        if (promo && promo.discountPercent) {
          discountedAmount -= (baseAmount * promo.discountPercent) / 100;
        }
      }

      // Convert amount to paise (Razorpay expects amount in paise)
      const amountInPaise = Math.round(discountedAmount);

      // Create Razorpay Order
      const order = await dispatch(createOrder(amountInPaise));

      // Razorpay Options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Use the Razorpay Key ID from .env
        amount: order.amount,
        currency: order.currency,
        name: "Ticket Booking",
        description: `Booking ticket for ${bus.name}`,
        order_id: order.id,
        handler: async (response) => {
          // Book Ticket After Payment
          await dispatch(
            bookTicket({
              busId: bus._id,
              seats: busSelectedSeats,
              couponCode: promoCode,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            })
          );
          alert("Ticket booked successfully!");
          
        },
        prefill: {
          name: userInfo?.name || "",
          email: userInfo?.email || "",
          contact: userInfo?.phone || "",
        },
        theme: {
          color: "#3399cc",
        },
      };

      // Ensure Razorpay script is loaded
      if (!window.Razorpay) {
        alert("Razorpay SDK not loaded. Please check your internet connection.");
        return;
      }

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error booking ticket:", error);
      alert("Failed to book ticket. Please try again.");
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {buses.map((bus) => (
        <div key={bus._id} className="bg-white rounded-lg shadow-md p-4">
          {/* Bus Image */}
          <div className="w-full h-48 overflow-hidden bg-gray-800">
            <img
              src={bus.busImage} // Ensure `busImage` is available in the bus object
              alt={bus.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Bus Details */}
          <h2 className="text-xl font-bold">{bus.name}</h2>
          <p>{bus.route.from} ➝ {bus.route.to}</p>
          <p>Distance: {bus.distance} km</p>
          <p>Price per seat: ₹{calculatePrice(bus)}</p>
          <p>Total Seats: {bus.seats}</p>
          <p>Available Seats: {bus.availableSeats.length}</p>

          {/* Seat Selection */}
          <div className="grid grid-cols-6 gap-2 mt-4">
            {Array.from({ length: bus.seats }, (_, i) => i + 1).map((seat) => (
              <button
                key={seat}
                className={`w-10 h-10 rounded ${
                  bus.availableSeats.includes(seat)
                    ? (selectedSeats[bus._id] || []).includes(seat)
                      ? "bg-blue-500 text-white"
                      : "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
                disabled={!bus.availableSeats.includes(seat)} // Disable booked seats
                onClick={() => handleSeatSelection(bus._id, seat)}
              >
                {seat}
              </button>
            ))}
          </div>

          {/* Promo Code Input */}
          <input
            type="text"
            placeholder="Enter Promo Code"
            value={promoCodes[bus._id] || ""} // Promo code for the specific bus
            onChange={(e) => handlePromoCodeChange(bus._id, e.target.value)}
            className="border p-2 rounded w-full mt-2"
          />

          {/* Book Ticket Button */}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            onClick={() => handleBookTicket(bus)}
          >
            Book Ticket
          </button>
        </div>
      ))}
    </div>
  );
};

export default AvailableBuses;