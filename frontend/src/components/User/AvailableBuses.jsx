import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBusUser, createOrder, bookTicket } from "../../redux/actions/user/userActions";
import api from "../../services/api";
import { toast } from "react-toastify";

const AvailableBuses = () => {
  const dispatch = useDispatch();
  const [activeBusId, setActiveBusId] = useState(null);

  const { buses, loading, error } = useSelector((state) => state.userBus);
  const { userInfo } = useSelector((state) => state.userAuth);

  const [promoCodes, setPromoCodes] = useState({});
  const [selectedSeats, setSelectedSeats] = useState({});
  const [discounts, setDiscounts] = useState({});
  const [finalPrices, setFinalPrices] = useState({});

  const [filter, setFilter] = useState({ from: "", to: "" });
  const [filteredBuses, setFilteredBuses] = useState([]);

  useEffect(() => {
    dispatch(fetchBusUser());
  }, [dispatch]);

  useEffect(() => {
    if (buses.length) {
      setFilteredBuses(buses);
    }
  }, [buses]);

  const applyFilter = () => {
    const filtered = buses.filter(
      (bus) =>
        bus.route.from.toLowerCase().includes(filter.from.toLowerCase()) &&
        bus.route.to.toLowerCase().includes(filter.to.toLowerCase())
    );
    setFilteredBuses(filtered);
  };

  const showAllBuses = () => {
    setFilteredBuses(buses);
    setFilter({ from: "", to: "" });
  };

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
        return { ...prev, [busId]: busSeats.filter((s) => s !== seat) };
      } else {
        return { ...prev, [busId]: [...busSeats, seat] };
      }
    });
    setTimeout(() => {
      setActiveBusId(null);
    }, 300);
  };

  const handlePromoCodeChange = async (busId, code) => {
    const upperCaseCode = code.toUpperCase();

    setPromoCodes((prev) => ({
      ...prev,
      [busId]: upperCaseCode,
    }));

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

          setDiscounts((prev) => ({
            ...prev,
            [bus._id]: discount,
          }));

          setFinalPrices((prev) => ({
            ...prev,
            [bus._id]: discountedAmount,
          }));
          toast.success(`Promo code applied! You saved ₹${discount.toFixed(2)}`);
        } else {
          toast.error("Invalid promo code or expired.");
          return;
        }
      }

      const amountRupee = Math.round(discountedAmount);

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
        toast.error("Razorpay SDK not loaded.");
        return;
      }

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error booking ticket:", error);
      toast.error("Failed to book ticket. Please try again.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="px-4 md:px-10  py-[20vh] relative w-full">
      <div className="grid grid-cols-1 pt-[2vh] md:grid-cols-2 w-full bg-white sticky top-[15vh] md:top-[15vh] h-[20vh] md:h-[10vh] z-[9] ]">
         <div className="mb-4 text-[5vw] md:text-[2.5vw] font-medium">All Buses</div>

        <div className="grid grid-cols-4 w-full gap-2 md:gap-4 mb-6">
        <input
          type="text"
          placeholder="From"
          className="border px-1 py-1  md:px-4 md:py-2 rounded"
          value={filter.from}
          onChange={(e) => setFilter({ ...filter, from: e.target.value })}
        />
        <input
          type="text"
          placeholder="To"
          className="border px-1 py-1  md:px-4 md:py-2 rounded"
          value={filter.to}
          onChange={(e) => setFilter({ ...filter, to: e.target.value })}
        />
        <button
          className="bg-green-500 text-white px-1  py-1  md:px-4 md:py-2 rounded"
          onClick={applyFilter}
        >
          Search
        </button>
        <button
          className="bg-gray-500 text-white px-1 py-1  md:px-4 md:py-2 rounded"
          onClick={showAllBuses}
        >
          All Buses
        </button>
         </div>
      </div>


      {/* Buses List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBuses.map((bus) => (
          <div key={bus._id} className="bg-gray-200 rounded-lg shadow-md p-4 relative overflow-hidden">
            <div className="w-full h-48 overflow-hidden bg-gray-800">
              <img src={bus.busImage} alt={bus.name} className="w-full h-full object-cover" />
            </div>

            <div className="mt-2">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">{bus.name}</h2>
                <h2 className="text-md font-bold">{bus.busType}</h2>
              </div>
              <div className="flex justify-between items-center">
                <p>{bus.route.from}</p>
                <div className="w-[50%] h-[1px] bg-gray-300"></div>
                <p>{bus.route.to}</p>
              </div>
              <div className="flex justify-between items-center">
                <p>Distance: {bus.distance} km</p>
                <p>Price per seat: ₹{calculatePrice(bus)}</p>
              </div>
              <div className="flex justify-between items-center">
                <p>Total Seats: {bus.seats}</p>
                <p>Available Seats: {bus.availableSeats.length}</p>
              </div>
            </div>

            <div className={`w-full h-fit ${activeBusId === bus._id ? "block" : "hidden"} absolute top-0 left-0 bg-gray-300 drop-shadow-2xl py-7 pl-10`}>
              <div className="grid grid-cols-4 gap-2 mt-4">
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
                    disabled={!bus.availableSeats.includes(seat)}
                    onClick={() => handleSeatSelection(bus._id, seat)}
                  >
                    {seat}
                  </button>
                ))}
                <button
                  onClick={() => setActiveBusId(null)}
                  className="absolute top-3 right-3 text-black hover:text-red-500 text-xl"
                >
                  ×
                </button>
              </div>
            </div>

            <input
              type="text"
              placeholder="Enter Promo Code"
              value={promoCodes[bus._id] || ""}
              onChange={(e) => handlePromoCodeChange(bus._id, e.target.value)}
              className="border p-2 rounded w-full mt-2"
            />

            {discounts[bus._id] > 0 && (
              <p className="text-green-500 mt-2">Discount Applied: ₹{discounts[bus._id].toFixed(2)}</p>
            )}
            {finalPrices[bus._id] && (
              <p className="text-blue-500 mt-2">Final Price: ₹{finalPrices[bus._id].toFixed(2)}</p>
            )}

            <div className="flex justify-between">
              <button onClick={() => setActiveBusId(bus._id)} className="bg-blue-600 mt-4 text-white px-4 py-2 rounded">
                Book Seats
              </button>
              <button onClick={() => handleBookTicket(bus)} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
                Book Ticket
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableBuses;
