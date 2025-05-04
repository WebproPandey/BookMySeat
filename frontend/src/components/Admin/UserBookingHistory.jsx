import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserBookingHistory } from "../../redux/actions/userActions";
import { useParams } from "react-router-dom";

export default function UserBookingHistory() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { userBookings, loading } = useSelector((state) => state.user);

  console.log("userBookings:", userBookings); // Debugging the structure of userBookings

  useEffect(() => {
    dispatch(fetchUserBookingHistory(id));
  }, [dispatch, id]);

  // Safely access user and bookingHistory from userBookings
  const user = userBookings?.user || {};
  const bookingHistory = userBookings?.bookingHistory || [];

  // Group bookings by busId
  const bookingsByBus = bookingHistory.reduce((acc, booking) => {
    const busKey = booking.busId ? booking.busId.name : "N/A";
    if (!acc[busKey]) {
      acc[busKey] = [];
    }
    acc[busKey].push(booking);
    return acc;
  }, {});

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Booking History</h1>

      {/* Display user details */}
      <div className="mb-6 p-4 bg-blue-100 rounded shadow">
        <h2 className="text-lg font-bold">User Details</h2>
        <p><strong>Name:</strong> {user.name || "N/A"}</p>
        <p><strong>Email:</strong> {user.email || "N/A"}</p>
        <p><strong>Wallet Balance:</strong> ₹{user.walletBalance || 0}</p>
        <p><strong>Booking Count:</strong> {user.bookingCount || 0}</p>
      </div>

      {/* Display booking history */}
      {loading ? (
        <p>Loading booking history...</p>
      ) : Object.keys(bookingsByBus).length > 0 ? (
        <div className="space-y-6">
          {Object.entries(bookingsByBus).map(([busName, bookings]) => (
            <div key={busName} className="p-4 bg-gray-100 rounded shadow">
              <h2 className="text-lg font-bold">Bus: {busName}</h2>
              <div className="space-y-4 mt-4">
                {bookings.map((booking) => (
                  <div key={booking._id} className="p-4 bg-white rounded shadow">
                    <p>
                      <strong>Route:</strong>{" "}
                      {booking.busId
                        ? `${booking.busId.route.from} to ${booking.busId.route.to}`
                        : `${booking.from} to ${booking.to}`}
                    </p>
                    <p><strong>Date:</strong> {new Date(booking.bookingTime).toLocaleDateString()}</p>
                    <p><strong>Seats:</strong> {booking.seatsBooked.join(", ")}</p>
                    <p><strong>Status:</strong> {booking.status}</p>
                    {booking.promoCode && (
                      <p>
                        <strong>Promo Code:</strong> {booking.promoCode} (Discount: ₹
                        {booking.discountApplied})
                      </p>
                    )}
                    <p><strong>Total Fare:</strong> ₹{booking.totalFare}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No booking history available.</p>
      )}
    </div>
  );
}