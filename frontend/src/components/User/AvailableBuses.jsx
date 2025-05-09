import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBusUser, createOrder, bookTicket } from "../../redux/actions/user/userActions";
import api from "../../services/api";
import { toast } from "react-toastify";

const AvailableBuses = () => {
  const dispatch = useDispatch();

  // Getting buses data
  const { buses, loading, error } = useSelector((state) => state.userBus);

  // Getting logged-in user info
  const { userInfo } = useSelector((state) => state.userAuth);

  const [promoCodes, setPromoCodes] = useState({});
  const [selectedSeats, setSelectedSeats] = useState({}); 
  const [discounts, setDiscounts] = useState({}); 
  const [finalPrices, setFinalPrices] = useState({}); 

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

  const handlePromoCodeChange = async (busId, code) => {
    // Convert the promo code to uppercase
    const upperCaseCode = code.toUpperCase();
  
    setPromoCodes((prev) => ({
      ...prev,
      [busId]: upperCaseCode, // Store the uppercase promo code
    }));
  
    // Validate promo code and calculate discount
    try {
      const token = localStorage.getItem("userToken");
      const response = await api.get(`/api/user/validpromos?code=${upperCaseCode}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const promo = response.data;
      if (promo && promo.discountPercent) {
        const busSelectedSeats = selectedSeats[busId] || [];
        const baseAmount = calculatePrice(buses.find((bus) => bus._id === busId)) * busSelectedSeats.length;
        const discount = (baseAmount * promo.discountPercent) / 100;
        const finalPrice = baseAmount - discount;
  
        setDiscounts((prev) => ({
          ...prev,
          [busId]: discount,
        }));
  
        setFinalPrices((prev) => ({
          ...prev,
          [busId]: finalPrice,
        }));
  
        toast.success(`Promo code applied! You saved ₹${discount.toFixed(2)}`);
      } 
    } catch (error) {
      console.error("Error validating promo code:", error.message);
    }
  };

  const handleBookTicket = async (bus) => {
    try {
      const busSelectedSeats = selectedSeats[bus._id] || [];
  
      const pricePerSeat = parseFloat(calculatePrice(bus));
      const baseAmount = pricePerSeat * busSelectedSeats.length;
  
      console.log("Base Amount:", baseAmount); // ✅
  
      let discountedAmount = baseAmount;
      let discount = 0;
  
      const promoCode = promoCodes[bus._id];
  
      if (promoCode) {
        const token = localStorage.getItem("userToken");
        const promoResponse = await api.get(`/api/user/validpromos?code=${promoCode}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const promo = promoResponse.data;
  
        if (promo && promo.discountPercent) {
          discount = (baseAmount * promo.discountPercent) / 100;
          discountedAmount = baseAmount - discount;
  
          // Update state for UI
          setDiscounts((prev) => ({
            ...prev,
            [bus._id]: discount,
          }));
  
          setFinalPrices((prev) => ({
            ...prev,
            [bus._id]: discountedAmount,
          }));
          toast.success(`Promo code applied! You saved ₹${discount.toFixed(2)}`);

          console.log("Promo Code:", promoCode);
          console.log("Discount %:", promo.discountPercent);
          console.log("Discount:", discount); // ✅
          console.log("Discounted Amount:", discountedAmount); //
  
        }
        else {
          toast.error("Invalid promo code or expired.");
          return;
        }
      }
  
      const amountRupee = Math.round(discountedAmount);
      console.log("Amount in Rupee:", amountRupee); // ✅
  
      const order = await dispatch(createOrder(amountRupee));
  
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Ticket Booking",
        description: `Booking ticket for ${bus.name}`,
        order_id: order.id,
        handler: async (response) => {
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
          toast.success("Ticket booked successfully!");
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
  
      if (!window.Razorpay) {
        toast.error("Razorpay SDK not loaded. Please check your internet connection.");
        return;
      }
  
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error booking ticket:", error);
      toast.error("Failed to book ticket. Please try again.");
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

          {/* Discount and Final Price */}
          {discounts[bus._id] > 0 && (
            <p className="text-green-500 mt-2">
              Discount Applied: ₹{discounts[bus._id].toFixed(2)}
            </p>
          )}
          {finalPrices[bus._id] && (
            <p className="text-blue-500 mt-2">
              Final Price: ₹{finalPrices[bus._id].toFixed(2)}
            </p>
          )}

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