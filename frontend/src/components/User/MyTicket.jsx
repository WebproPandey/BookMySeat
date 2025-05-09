import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  cancelTicket,
  deleteTicket,
  downloadTicketPDF,
  fetchBusUser,
  fetchTickets,
} from "../../redux/actions/user/userActions";
import buslogo from "../../assets/buslogo.png";

const MyTicket = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { tickets, loading, error, downloading } = useSelector(
    (state) => state.userTicket
  );

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  const handleDownloadPDF = async (ticketId) => {
    try {
      await dispatch(downloadTicketPDF(ticketId));
      toast.success("Ticket PDF downloaded successfully!");
    } catch (error) {
      toast.error("Failed to download ticket PDF");
    }
  };

  const handleCancelTicket = async (ticketId) => {
    try {
      await dispatch(cancelTicket(ticketId));
      toast.success("Ticket canceled successfully");
      navigate("/user/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to cancel ticket");
    }
  };

  const handleDeleteTicket = async (ticketId) => {
    try {
      await dispatch(deleteTicket(ticketId));
      toast.success("Ticket deleted successfully");
      dispatch(fetchBusUser());
      navigate("/user/dashboard");
    } catch (error) {
      toast.error("Failed to delete ticket");
    }
  };

  const allTickets = Array.isArray(tickets?.tickets) ? tickets.tickets : [];

  return (
    <div className="p-4 max-w-6xl mx-auto py-[10vh]">
      <h1 className="text-2xl font-bold mb-6 text-center">🚌 My Bus Tickets</h1>
      {loading ? (
        <p className="text-center text-blue-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : allTickets.length === 0 ? (
        <p className="text-center text-gray-500">No tickets found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {allTickets.map((ticket) => (
            <div
              key={ticket.ticketId}
              className="relative bg-gradient-to-br from-blue-100 to-blue-300 border shadow-md rounded-xl overflow-hidden"
            >
              <div className="flex   items-stretch ">
                <div className="leftside w-[70%] h-full border-dashed border-black border-r-[1px] ">
                  <div className="top bg-blue-400  flex justify-between w-full h-[10vh] pr-1">
                    <div className="h-full">
                      <img
                        src={buslogo}
                        className="h-full  w-full  object-contain"
                        alt=""
                      />
                    </div>
                    <div className="flex flex-col items-start  justify-center leading-none tracking-tight">
                      <div className="text-[1.2vw] uppercase">Lorem Name</div>
                      <p className="text-[1vw]">Have a Nice BusTrip</p>
                    </div>

                    <div className="flex flex-col justify-center leading-none tracking-tight">
                      <div className="text-[1.2vw] uppercase">
                        Boarding Pass
                      </div>
                      <p className="text-[1vw] text-end">
                        {ticket.busId.busType}
                      </p>
                    </div>
                  </div>

                  <div className="w-full">
                      <img
                      src={ticket.qrCodeUrl}
                      alt="QR Code"
                      className="w-20 h-20"
                    />
                    <p className="text-xs mt-1">Scan at boarding</p>
                  </div>
                </div>

                <div className="rightside w-[30%] h-full ">
                  <div className="w-full bg-white  flex flex-col  justify-between">
                    <div className="top bg-blue-400  flex items-center justify-center w-full h-[10vh]">
                      <div className="text-[1vw] uppercase text-black">
                        Boarding Pass
                      </div>
                    </div>

                    <div className="flex flex-col items-center my-4 px-2">
                      <div className=" flex justify-between  items-center w-full  ">
                        <div className="leading-none  ">
                          <p className="text-md">Passenger</p>
                          <p className="text-sm text-blue-500">
                            {ticket.userId.name}
                          </p>
                        </div>
                        <div className="leading-none  w-full text-end ">
                          <p className="text-md">Class</p>
                          <p className="text-sm text-blue-500">
                            {ticket.busId.busType}
                          </p>
                        </div>
                      </div>

                      <div className=" flex justify-between  items-center w-full  ">
                        <div className="leading-none  ">
                          <p className="text-md">From</p>
                          <p className="text-sm text-blue-500">
                           {ticket.busId.route.from}
                          </p>
                        </div>
                        <div className="leading-none  w-full text-end ">
                          <p className="text-md">TO</p>
                          <p className="text-sm text-blue-500">
                            {ticket.busId.route.to}
                          </p>
                        </div>
                      </div>

                      
                      <div className=" flex justify-between  items-center w-full  ">
                        <div className="leading-none  ">
                          <p className="text-md">Seat</p>
                          <p className="text-sm text-blue-500">
                           {ticket.seatsBooked}
                          </p>
                        </div>
                        <div className="leading-none  w-full text-end ">
                          <p className="text-md">Price</p>
                          <p className="text-sm text-blue-500">₹
                            {ticket.totalFare}
                          </p>
                        </div>
                      </div>

                        <div className=" flex justify-between  items-center w-full  ">
                        <div className="leading-none  w-full">
                          <p className="text-md">Pik-Up</p>
                          <p className="text-sm text-blue-500">
                           {ticket.busId.pickupTime
}
                          </p>
                        </div>
                        <div className="leading-none  w-full text-end ">
                          <p className="text-md">Drop</p>
                          <p className="text-sm text-blue-500">
                            {ticket.busId.dropTime
}
                          </p>
                        </div>
                      </div>

                    

                    
                    
                    </div>
                  </div>
                </div>

             
              </div>

              <div className="bg-white border-t p-3 flex flex-wrap justify-around text-sm">
                <button
                  onClick={() => handleDownloadPDF(ticket.ticketId)}
                  className="text-blue-600 hover:underline"
                  disabled={downloading}
                >
                  {downloading ? "Downloading..." : "Download PDF"}
                </button>
                {ticket.status !== "canceled" && (
                  <button
                    onClick={() => handleCancelTicket(ticket.ticketId)}
                    className="text-red-600 hover:underline"
                  >
                    Cancel Ticket
                  </button>
                )}
                <button
                  onClick={() => handleDeleteTicket(ticket.ticketId)}
                  className="text-gray-600 hover:underline"
                >
                  Delete Ticket
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTicket;
