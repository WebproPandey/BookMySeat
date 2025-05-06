import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTickets } from "../../redux/actions/user/userActions";

const MyTicket = () => {
  const dispatch = useDispatch();
  const { tickets, loading, error } = useSelector((state) => state.userTicket);

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  if (loading) return <p className="text-center text-blue-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  // Defensive check
  const allTickets = Array.isArray(tickets?.tickets) ? tickets.tickets : [];

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">🎟️ My Tickets</h1>

      {allTickets.length === 0 ? (
        <p className="text-center text-gray-500">No tickets found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {allTickets.map((ticket) => (
            <div
              key={ticket.ticketId}
              className="bg-white border border-gray-200 shadow-md rounded-xl overflow-hidden"
            >
              <img
                src={ticket.busId.busImage}
                alt="Bus"
                className="w-full h-40 object-cover"
              />
              <div className="p-4 space-y-2">
                <h2 className="text-lg font-semibold text-blue-600">
                  {ticket.busId.name}
                </h2>
                <p className="text-sm text-gray-600">
                  <strong>From:</strong> {ticket.from} → <strong>To:</strong> {ticket.to}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Distance:</strong> {ticket.distance} km
                </p>
                <div className="grid grid-cols-2 text-sm gap-2">
                  <p><strong>Type:</strong> {ticket.busId.busType}</p>
                  <p><strong>Pickup:</strong> {ticket.busId.pickupTime}</p>
                  <p><strong>Drop:</strong> {ticket.busId.dropTime}</p>
                  <p><strong>Status:</strong> 
                    <span className={`ml-1 font-medium ${ticket.status === "booked" ? "text-green-600" : "text-red-600"}`}>
                      {ticket.status}
                    </span>
                  </p>
                </div>
                <p><strong>Seats:</strong> {ticket.seatsBooked.join(", ")}</p>
                <p><strong>Fare:</strong> ₹{ticket.totalFare}</p>
                {ticket.promoCode && (
                  <p className="text-green-600">
                    <strong>Promo:</strong> {ticket.promoCode} (Saved ₹{ticket.discountApplied})
                  </p>
                )}
                <p className="text-sm text-gray-500">
                  <strong>Booked on:</strong> {new Date(ticket.bookingTime).toLocaleString()}
                </p>
              </div>
              <div className="p-4 border-t text-center">
                <img
                  src={ticket.qrCodeUrl}
                  alt="QR Code"
                  className="w-24 h-24 mx-auto"
                />
                <p className="text-xs text-gray-400 mt-1">Ticket ID: {ticket.ticketId}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTicket;
