const User = require('../models/user.modle');
const Bus = require('../models/bus.model');
const Ticket = require('../models/ticket.model');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');
const qrcode = require('qrcode');

exports.registerUser = async ({ name, email, phone, password }) => {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ name, email, phone, password: hashedPassword });
      await user.save();
      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
      return { message: 'User registered successfully', token };
    } catch (err) {
      console.error("Error in userService.registerUser:", err.message);
      throw new Error("User registration failed");
    }
  };
  

exports.loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('User not found');
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');
  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
  return { token };
};

exports.getUserByEmail = async (email) => {
  return await User.findOne({ email });
};

exports.getAvailableBuses = async () => {
  return await Bus.find();
};

exports.bookTicket = async ({ userId, busId, seats }) => {
  const bus = await Bus.findById(busId);
  const user = await User.findById(userId);
  if (!bus || !user) throw new Error('User or Bus not found');

  const typeKey = bus.busType.toLowerCase(); // e.g., 'deluxe'
  const pricePerKm = bus.pricePerKm[typeKey];

  if (!pricePerKm) {
    throw new Error(`Invalid or missing pricePerKm for bus type: ${bus.busType}`);
  }

  if (!Array.isArray(seats) || seats.length === 0) {
    throw new Error('No seats selected');
  }

  const totalFare = Number(bus.distance) * Number(pricePerKm) * seats.length;

  // if (user.walletBalance < totalFare) {
  //   throw new Error('Insufficient wallet balance');
  // }

  // Update seat availability
  bus.availableSeats = bus.availableSeats.filter(seat => !seats.includes(seat));
  await bus.save();

  const ticketId = uuidv4();
  const qrData = `TicketID: ${ticketId}\nFrom: ${bus.route.from}\nTo: ${bus.route.to}\nSeats: ${seats.join(',')}`;
  const qrCodeUrl = await qrcode.toDataURL(qrData);

  const ticket = new Ticket({
    userId,
    busId,
    from: bus.route.from,
    to: bus.route.to,
    distance: bus.distance,
    seatsBooked: seats,
    totalFare,
    ticketId,
    bookingTime: new Date(),
    qrCodeUrl
  });

  await ticket.save();
  user.walletBalance -= totalFare;
  await user.save();

  return ticket;
};

exports.getTicketById = async (ticketId, userId) => {
  return await Ticket.findOne({ ticketId, userId })
    .populate('busId')
    .populate('userId');
};
