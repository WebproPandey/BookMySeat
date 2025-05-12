const userService = require("../Services/userService");
const PromoCode = require("../models/promoCode.modle");
const Bus = require("../models/bus.model");
const Ticket = require("../models/ticket.model");
const PDFDocument = require("pdfkit");
const Razorpay = require("razorpay");
const crypto = require("crypto");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // Check if user already exists
    const existingUser = await userService.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Create user
    const user = await userService.registerUser({
      name,
      email,
      phone,
      password,
    });

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        walletBalance: user.walletBalance || 0,
      },
    });
  } catch (error) {
    console.error("Register Error:", error.message);
    res.status(500).json({ error: "Registration failed" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { user, token } = await userService.loginUser({ email, password });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        walletBalance: user.walletBalance || 0,
      },
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(401).json({ error: error.message || "Login failed" });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user.userId || req.user._id;
    if (!userId) {
      return res.status(400).json({ error: "User not authenticated" });
    }
    const user = await userService.getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
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

    const {
      busId,
      seats,
      couponCode,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
    } = req.body;

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
    const ticket = await userService.bookTicket({
      busId,
      seats,
      couponCode,
      userId,
    });

    res.status(201).json({ message: "Ticket booked successfully", ticket });
  } catch (err) {
    console.error("BookTicket:", err.message);
    res
      .status(500)
      .json({
        error: err.message || "An error occurred while booking the ticket",
      });
  }
};

exports.getMyTickets = async (req, res) => {
  try {
    const userId = req.user.userId || req.user._id;
    if (!userId) {
      return res.status(400).json({ error: "User not authenticated" });
    }

    const tickets = await Ticket.find({ userId })
      .populate("busId")
      .populate("userId")
      .sort({ bookingTime: -1 });

    res.status(200).json({
      totalTickets: tickets.length,
      tickets,
    });
  } catch (err) {
    console.error("getMyTickets:", err.message);
    res.status(500).json({ error: "Unable to fetch tickets" });
  }
};

exports.validatePromoCode = async (req, res) => {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).json({ error: "Promo code is required" });
    }
    const promo = await PromoCode.findOne({ code: code.toUpperCase() });
    if (!promo) {
      return res.status(400).json({ error: "Promo code does not exist" });
    }
    const currentDate = new Date();
    if (new Date(promo.expiryDate) < currentDate) {
      return res.status(400).json({ error: "Promo code has expired" });
    }
    if (promo.usedCount >= promo.usageLimit) {
      return res.status(400).json({ error: "Promo code usage limit reached" });
    }
    res.status(200).json({
      discountPercent: promo.discountPercent,
      message: "Promo code is valid",
    });
  } catch (err) {
    console.error("ValidatePromoCode:", err.message);
    res.status(500).json({ error: "Unable to validate promo code" });
  }
};

exports.getTicketPDF = async (req, res) => {
  try {
    const ticket = await userService.getTicketById(
      req.params.ticketId,
      req.user.userId
    );
    if (!ticket)
      return res
        .status(404)
        .json({ message: "Ticket not found or unauthorized" });

    const doc = new PDFDocument({ size: [600, 300], margin: 0 });
    const pageWidth = 600;
    const pageHeight = 300;
    const wmFontSize = 100;
    const wmY = (pageHeight - wmFontSize) / 2;

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=ticket-${ticket.ticketId}.pdf`
    );
    res.setHeader("Content-Type", "application/pdf");
    doc.pipe(res);

    // === BACKGROUND COLOR ===
    doc.rect(0, 0, 600, 300).fill("#87CEFA");

    // === WATERMARK CENTERED ===

    // compute vertical center

    doc.fontSize(wmFontSize).fillColor("#e0f0ff").text(
      "BusYatra",
      0, // x = left edge
      wmY, // y = vertical center minus half font size
      {
        width: pageWidth, // span full width
        align: "center", // center horizontally
        opacity: 0.2,
      }
    );

    // === HEADER ===
    doc
      .fontSize(18)
      .fillColor("#000080")
      .text("Bus Yatra", 20, 20)
      .fontSize(10)
      .fillColor("#000")
      .text("Have a Nice BusTrip", 20, 40);

    doc
      .fontSize(14)
      .fillColor("#000080")
      .text("BOARDING PASS", 420, 20)
      .fontSize(10)
      .fillColor("#000")
      .text(`Class: ${ticket.busId.busType}`, 420, 40);

    // === LINE UNDER HEADER ===
    doc.moveTo(20, 60).lineTo(580, 60).strokeColor("#fff").stroke();

    // === SECONDARY HEADER INFO ===
    doc
      .fontSize(10)
      .fillColor("#000")
      .text(`From: ${ticket.from}`, 20, 70)
      .text(`To: ${ticket.to}`, 150, 70)
      .text(`Date & Time: ${ticket.bookingTime.toLocaleString()}`, 320, 70);

    // === LEFT-SIDE DETAILS ===
    doc
      .fontSize(12)
      .fillColor("#000")
      .text(`Passenger: ${ticket.userId.name}`, 20, 100)
      .text(`Bus: ${ticket.busId.name}`, 20, 120)
      .text(`Class: ${ticket.busId.busType}`, 20, 140)
      .text(`Status: Booked`, 20, 160)
      .text(`Ticket ID: ${ticket.ticketId}`, 20, 180);

    // === QR CODE RIGHT SIDE ===
    if (ticket.qrCodeUrl) {
      const qrImageBuffer = Buffer.from(
        ticket.qrCodeUrl.split(",")[1],
        "base64"
      );
      doc.image(qrImageBuffer, 400, 100, { fit: [150, 150] });
      doc.fontSize(10).fillColor("#000").text("Scan at boarding", 440, 255);
    }

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
    const ticket = await Ticket.findOne({ ticketId }).populate("busId");

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    if (!ticket.userId) {
      return res
        .status(400)
        .json({ error: "Ticket does not have a user assigned" });
    }

    // userId is simple ObjectId (string) => no populate needed
    if (ticket.userId.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ error: "Unauthorized to cancel this ticket" });
    }

    if (ticket.status === "cancelled") {
      return res.status(400).json({ error: "Ticket is already cancelled" });
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
    ticket.status = "cancelled";
    await ticket.save();

    res.status(200).json({ message: "Ticket cancelled successfully" });
  } catch (err) {
    console.error("CancelTicket:", err.message);
    res.status(500).json({ error: "Unable to cancel ticket" });
  }
};

exports.deleteTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const userId = req.user.userId || req.user._id;

    const ticket = await Ticket.findOne({ ticketId });

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    if (ticket.userId.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ error: "Unauthorized to delete this ticket" });
    }

    // Find the bus and update availableSeats
    const bus = await Bus.findById(ticket.busId);
    if (bus) {
      ticket.seatsBooked.forEach((seat) => {
        if (!bus.availableSeats.includes(seat)) {
          bus.availableSeats.push(seat); // Re-add the seat to availableSeats
        }
      });

      // Sort the availableSeats array in ascending order
      bus.availableSeats.sort((a, b) => a - b);

      await bus.save(); // Save the updated bus
    }

    // Delete the ticket
    await Ticket.deleteOne({ _id: ticket._id });

    res
      .status(200)
      .json({ message: "Ticket deleted permanently and seats updated" });
  } catch (err) {
    console.error("deleteTicket:", err.message);
    res.status(500).json({ error: "Unable to delete ticket" });
  }
};
