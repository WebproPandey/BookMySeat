const userService = require('../Services/userService');
const PromoCode = require('../models/promoCode.modle');
const Bus = require('../models/bus.model');
const Ticket = require('../models/ticket.model');
const PDFDocument = require('pdfkit');
const Razorpay = require("razorpay");
const crypto = require("crypto");


exports.registerUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    const existingUser = await userService.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    const result = await userService.registerUser({ name, email, phone, password });
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await userService.loginUser({ email, password });
    res.cookie('token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
    });
    res.status(200).json({ message: 'Login successful', token: result.token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




exports.getAvailableBuses = async (req, res) => {
  try {
    const buses = await userService.getAvailableBuses();
    res.status(200).json(buses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getAllPromos = async (req, res) => {
  const promos = await PromoCode.find({ expiryDate: { $gte: new Date() } });
  res.json(promos);
};


exports.bookTicket = async (req, res) => {
  try {
    const userId = req.user.userId;
    if (!userId) {
      return res.status(400).json({ error: "User not authenticated" });
    }

    const { busId, seats, couponCode, razorpayPaymentId, razorpayOrderId, razorpaySignature } = req.body;

    if (!busId || !seats || seats.length === 0) {
      return res.status(400).json({ error: "Bus ID and seat(s) are required" });
    }

    // Verify Razorpay Payment
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest("hex");

    if (generatedSignature !== razorpaySignature) {
      return res.status(400).json({ error: "Invalid payment signature" });
    }

    // Call the service to handle ticket booking logic
    const ticket = await userService.bookTicket({ busId, seats, couponCode, userId });

    res.status(201).json({ message: "Ticket booked successfully", ticket });
  } catch (err) {
    console.error("BookTicket:", err.message);
    res.status(500).json({ error: err.message || "An error occurred while booking the ticket" });
  }
};

exports.getMyTickets = async (req, res) => {
  try {
    const userId = req.user.userId || req.user._id;  
    if (!userId) {
      return res.status(400).json({ error: "User not authenticated" });
    }

    const tickets = await Ticket.find({ userId })
      .populate('busId')   
      .populate('userId')
      .sort({ bookingTime: -1 });

    res.status(200).json({
      totalTickets: tickets.length,
      tickets,
    });

  } catch (err) {
    console.error("getMyTickets:", err.message);
    res.status(500).json({ error: 'Unable to fetch tickets' });
  }
};



exports.getTicketPDF = async (req, res) => {
  try {
    const ticket = await userService.getTicketById(req.params.ticketId, req.user.userId);

    if (!ticket) return res.status(404).json({ message: 'Ticket not found or unauthorized' });

    const doc = new PDFDocument();
    res.setHeader('Content-Disposition', `attachment; filename=ticket-${ticket.ticketId}.pdf`);
    res.setHeader('Content-Type', 'application/pdf');
    doc.pipe(res);

    doc.fontSize(20).text('Bus Ticket Confirmation', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Ticket ID: ${ticket.ticketId}`);
    doc.text(`Passenger: ${ticket.userId.name}`);
    doc.text(`From: ${ticket.from}`);
    doc.text(`To: ${ticket.to}`);
    doc.text(`Distance: ${ticket.distance} KM`);
    doc.text(`Seats: ${ticket.seatsBooked.join(', ')}`);
    doc.text(`Bus: ${ticket.busId.name}`);
    doc.text(`Bus Type: ${ticket.busId.busType}`);
    doc.text(`Total Fare: ₹${ticket.totalFare}`);
    doc.text(`Date & Time: ${ticket.bookingTime.toLocaleString()}`);
    doc.end();

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.cancelTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const userId = req.user.userId || req.user._id;

    // Populate only busId, not userId!
    const ticket = await Ticket.findOne({ ticketId }).populate('busId');

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    if (!ticket.userId) {
      return res.status(400).json({ error: 'Ticket does not have a user assigned' });
    }

    // userId is simple ObjectId (string) => no populate needed
    if (ticket.userId.toString() !== userId.toString()) {
      return res.status(403).json({ error: 'Unauthorized to cancel this ticket' });
    }

    if (ticket.status === 'cancelled') {
      return res.status(400).json({ error: 'Ticket is already cancelled' });
    }

    // Seats ko wapas bus ke available seats me add karo (without duplicate)
    if (ticket.busId && Array.isArray(ticket.busId.availableSeats)) {
      ticket.seatsBooked.forEach((seat) => {
        if (!ticket.busId.availableSeats.includes(seat)) {
          ticket.busId.availableSeats.push(seat);
        }
      });

      // Seats sort ascending
      ticket.busId.availableSeats.sort((a, b) => a - b);
      await ticket.busId.save();
    }

    // Ticket ko cancel mark karo
    ticket.status = 'cancelled';
    await ticket.save();

    res.status(200).json({ message: 'Ticket cancelled successfully' });

  } catch (err) {
    console.error('CancelTicket:', err.message);
    res.status(500).json({ error: 'Unable to cancel ticket' });
  }
};



exports.deleteTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const userId = req.user.userId || req.user._id;

    const ticket = await Ticket.findOne({ ticketId });

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    if (ticket.userId.toString() !== userId.toString()) {
      return res.status(403).json({ error: 'Unauthorized to delete this ticket' });
    }

    // Seats ko wapas availableSeats me daalna (only if not present)
    const bus = await Bus.findById(ticket.busId);
    if (bus) {
      ticket.seatsBooked.forEach((seat) => {
        if (!bus.availableSeats.includes(seat)) {
          bus.availableSeats.push(seat);
        }
      });

      // Seats ko sort karo ascending order me
      bus.availableSeats.sort((a, b) => a - b);

      await bus.save();
    }

    await Ticket.deleteOne({ _id: ticket._id });

    res.status(200).json({ message: 'Ticket deleted permanently' });

  } catch (err) {
    console.error('deleteTicket:', err.message);
    res.status(500).json({ error: 'Unable to delete ticket' });
  }
};




