import React, { useEffect, useState } from "react";
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
  const [downloadingId, setDownloadingId] = useState(null);


  const { tickets, loading, error } = useSelector(
    (state) => state.userTicket
  );

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

   const handleDownloadPDF = async (ticketId) => {
    try {
      setDownloadingId(ticketId);
      await dispatch(downloadTicketPDF(ticketId));
      toast.success("Ticket PDF downloaded successfully!");
    } catch (err) {
      toast.error("Failed to download ticket PDF");
    } finally {
      setDownloadingId(null);
    }
  };
  const handleCancelTicket = async (ticketId) => {
    try {
      await dispatch(cancelTicket(ticketId));
      toast.success("Ticket canceled successfully");
      navigate("/user/home");
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to cancel ticket");
    }
  };

  const handleDeleteTicket = async (ticketId) => {
    try {
      await dispatch(deleteTicket(ticketId));
      toast.success("Ticket deleted successfully");
      dispatch(fetchBusUser());
      navigate("/user/home");
    } catch (error) {
      toast.error("Failed to delete ticket");
    }
  };

  const allTickets = Array.isArray(tickets?.tickets) ? tickets.tickets : [];

  return (
    <div className="p-4 max-w-6xl mx-auto pt-[15vh]   md:py-[10vh]">
      <h1 className="text-2xl font-bold mb-6 text-center">🚌 My Bus Tickets</h1>
      {loading ? (
        <p className="text-center text-blue-500">Loading...</p>
      ) : allTickets.length === 0 ? (
        <p className="text-center text-gray-500">No tickets found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {allTickets.map((ticket) => (
            <div
              key={ticket.ticketId}
              className="relative border shadow-md rounded-xl overflow-hidden"
            >
              <div className="flex md:flex-row flex-col items-stretch ">
                <div className="leftside w-full md:w-[70%] h-full  border-dashed border-black border-b-[1px] md:border-b-0 md:border-r-[1px] ">
                  <div className="top bg-blue-400  flex items-center justify-between w-full h-[10vh] pr-3 md:pr-1">
                    <div className="h-full flex items-start   gap-5 ">
                      <img
                        src={buslogo}
                        className="h-full object-contain"
                        alt=""
                      />
                      <div className="flex flex-col h-full items-start  gap-2  justify-center leading-none tracking-tight">
                      <div className="text-[3vw] font-medium md:text-[1.2vw] uppercase">Bus Yatra</div>
                      <p className="text-[2vw]  font-medium md:text-[1vw]">Have a Nice BusTrip</p>
                    </div>
                    </div>
                  

                    <div className="flex flex-col justify-center gap-2  leading-none tracking-tight">
                      <div className="text-[3vw] font-medium md:text-[1.2vw]   uppercase">
                        Boarding Pass
                      </div>
                      <p className="text-[2vw]  font-medium md:text-[1vw] text-end">
                        {ticket.busId.busType}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col  bg-gradient-to-br from-blue-100 to-blue-300  items-center gap-4 md:gap-9  justify-between h-full px-3 py-2">
                   <div className="w-full flex items-start justify-between">
                    <div className="leading-none  ">
                      <p className="text-md">Passenger</p>
                      <p className="text-sm text-blue-500">
                        {ticket.userId.name}
                      </p>
                    </div>
                    <div className="leading-none   text-start ">
                      <p className="text-md">Bus</p>
                      <p className="text-sm text-blue-500">
                        {ticket.busId.name}
                      </p>
                    </div>
                    <div className="leading-none   text-start ">
                      <p className="text-md">Class</p>
                      <p className="text-sm text-blue-500">
                        {ticket.busId.busType}
                      </p>
                    </div>
                    <div className="leading-none   text-start ">
                      <p className="text-md">Status</p>
                      <p className="text-sm text-blue-500">
                        {ticket.status}
                      </p>
                    </div>
                   </div>

                   <div className="h-full w-full flex  justify-between  items-start relative ">
                    <div className=" flex justify-between gap-4  items-center   ">
                      <div className="leading-none  ">
                        <p className="text-md">From</p>
                        <p className="text-sm text-blue-500">
                          {ticket.busId.route.from}
                        </p>
                      </div>
                      <div className="leading-none  w-full  ">
                        <p className="text-md">To</p>
                        <p className="text-sm text-blue-500">
                          {ticket.busId.route.to}
                        </p>
                      </div>
                    </div>

                    <div className="leading-none  ">
                      <p className="text-md">Pik-Up</p>
                      <p className="text-sm text-blue-500">
                        {ticket.busId.pickupTime}
                      </p>
                    </div>

                    <div className="flex flex-col  items-center  justify-center">
                      <img
                        src={ticket.qrCodeUrl}
                        alt="QR Code"
                        className="w-20 h-20"
                      />
                      <p className="text-xs mt-1">Scan at boarding</p>
                    </div>
                    <div className="absolute  bottom-0 left-0.5">
                      <div className="leading-none  ">
                       <p className="text-md">TicketId</p>
                       <p className="text-sm text-blue-500">
                         {ticket.ticketId}
                        </p>
                    </div>
                    </div>
                   </div>

                  </div>

                </div>

                <div className="rightside w-full md:w-[30%] h-full  ">
                  <div className="w-full bg-white  flex flex-col  justify-between">
                    <div className="top bg-blue-400  flex items-center justify-center w-full h-[5vh] md:h-[10vh]">
                      <div className="text-[3vw] md:text-[1vw] uppercase text-black">
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
                          <p className="text-sm text-blue-500">
                            ₹{ticket.totalFare}
                          </p>
                        </div>
                      </div>

                      <div className=" flex justify-between  items-center w-full  ">
                        <div className="leading-none  w-full">
                          <p className="text-md">Pik-Up</p>
                          <p className="text-sm text-blue-500">
                            {ticket.busId.pickupTime}
                          </p>
                        </div>
                        <div className="leading-none  w-full text-end ">
                          <p className="text-md">Drop</p>
                          <p className="text-sm text-blue-500">
                            {ticket.busId.dropTime}
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
                  disabled={downloadingId === ticket.ticketId}
                >
                  {downloadingId === ticket.ticketId ? "Downloading..." : "Download PDF"}
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
