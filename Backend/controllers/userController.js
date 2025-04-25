const userService = require('../Services/userService');
// const ticketService = require('../services/userService');
const PDFDocument = require('pdfkit');

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

exports.bookTicket = async (req, res) => {
  try {
    const userId = req.user.userId;
    const ticket = await userService.bookTicket({ ...req.body, userId });
    res.status(201).json(ticket);
  } catch (err) {
    console.log("BookTicket:" ,err.message)
    res.status(400).json({ error: err.message });
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