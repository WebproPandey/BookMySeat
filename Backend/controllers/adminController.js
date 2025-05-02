const adminService = require('../Services/adminService');
const Bus = require('../models/bus.model');
const PromoCode = require('../models/promoCode.modle');
const User = require('../models/user.modle');
const Ticket = require('../models/ticket.model');
const moment = require('moment');



exports.registerAdmin = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    const result = await adminService.registerAdmin({ name, email, phone, password });
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Admin login
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await adminService.loginAdmin({ email, password });

    res.cookie('token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'Lax',
      maxAge: 24 * 60 * 60 * 3000 
    });

    res.status(200).json({ message: 'Admin login successful', token: result.token });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Add Bus
exports.addBus = async (req, res) => {
  try {
    const {
      name, route, pickupTime, dropTime, distance,
      pricePerKm, busType, seats ,busImage  
    } = req.body;

    const availableSeats = Array.from({ length: seats }, (_, i) => i + 1);

    const bus = new Bus({
      name,
      busImage,
      route,
      pickupTime,
      dropTime,
      distance,
      pricePerKm,
      busType,
      seats,
      availableSeats
    });

    await bus.save();
    res.status(201).json(bus);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// View all buses
exports.getAllBuses = async (req, res) => {
  try {
    const buses = await Bus.find();
    res.status(200).json(buses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a bus
exports.updateBus = async (req, res) => {
  try {
    const updatedBus = await Bus.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedBus);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a bus
exports.deleteBus = async (req, res) => {
  try {
    await Bus.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Bus deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// controller/adminController.js


exports.PromoCode = async (req, res) => {
  try {
    const { code, discountPercent, expiryDate, usageLimit } = req.body;

    const existing = await PromoCode.findOne({ code: code.toUpperCase() });
    if (existing) return res.status(400).json({ message: 'Promo code already exists' });

    const promo = new PromoCode({ code, discountPercent, expiryDate, usageLimit });
    await promo.save();
    res.json({ message: 'Promo created', promo });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getAllPromoCodes = async (req, res) => {
  try {
    const promos = await PromoCode.find().sort({ createdAt: -1 });
    res.json(promos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✔ Update promo code by ID
exports.updatePromoCode = async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;

    const promo = await PromoCode.findByIdAndUpdate(id, update, { new: true });
    if (!promo) return res.status(404).json({ message: 'Promo code not found' });

    res.json({ message: 'Promo updated', promo });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✔ Delete promo code by ID
exports.deletePromoCode = async (req, res) => {
  try {
    const { id } = req.params;

    const promo = await PromoCode.findByIdAndDelete(id);
    if (!promo) return res.status(404).json({ message: 'Promo code not found' });

    res.json({ message: 'Promo deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
};

exports.getUserBookingHistory = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    const tickets = await Ticket.find({ userId: id })
      .populate('busId', 'name route pickupTime dropTime busType') 
      .sort({ bookingTime: -1 });

    res.status(200).json({
      user,
      bookingHistory: tickets
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching booking history', error: err.message });
  }
};




exports.getRevenueStats = async (req, res) => {
  try {
    const today = moment().startOf('day');
    const weekStart = moment().startOf('week');
    const monthStart = moment().startOf('month');
    const yearStart = moment().startOf('year');

    const todayRevenue = await Ticket.aggregate([
      {
        $match: {
          bookingTime: { $gte: today.toDate() },
          status: 'booked'
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$totalFare" }
        }
      }
    ]);

    const weekRevenue = await Ticket.aggregate([
      {
        $match: {
          bookingTime: { $gte: weekStart.toDate() },
          status: 'booked'
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$totalFare" }
        }
      }
    ]);

    const monthRevenue = await Ticket.aggregate([
      {
        $match: {
          bookingTime: { $gte: monthStart.toDate() },
          status: 'booked'
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$totalFare" }
        }
      }
    ]);

    const yearRevenue = await Ticket.aggregate([
      {
        $match: {
          bookingTime: { $gte: yearStart.toDate() },
          status: 'booked'
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$totalFare" }
        }
      }
    ]);

    res.status(200).json({
      today: todayRevenue[0]?.total || 0,
      week: weekRevenue[0]?.total || 0,
      month: monthRevenue[0]?.total || 0,
      year: yearRevenue[0]?.total || 0
    });
  } catch (err) {
    res.status(500).json({ message: "Revenue fetch failed", error: err.message });
  }
};

exports.cancelAllBusBookings = async (req, res) => {
  try {
    const busId = req.params.busId;

    // 1. Find all booked tickets of that bus
    const tickets = await Ticket.find({ busId, status: 'booked' });

    if (tickets.length === 0) {
      return res.status(404).json({ message: 'No active bookings found for this bus.' });
    }

    let cancelledTickets = [];
    let refundDetails = [];

    for (let ticket of tickets) {
      // Cancel ticket
      ticket.status = 'cancelled';
      await ticket.save();

      // Refund fare to user
      const user = await User.findById(ticket.userId);
      if (user) {
        user.walletBalance += ticket.totalFare;
        await user.save();

        refundDetails.push({
          userId: user._id,
          refundedAmount: ticket.totalFare,
          ticketId: ticket._id
        });
      }

      // Update bus available seats
      const bus = await Bus.findById(ticket.busId);
      if (bus) {
        bus.availableSeats.push(...ticket.seatsBooked);
        bus.availableSeats = [...new Set(bus.availableSeats)].sort((a, b) => a - b);
        await bus.save();
      }

      cancelledTickets.push(ticket._id);
    }

    res.status(200).json({
      message: 'All bookings for the bus have been cancelled and fares refunded.',
      cancelledTicketIds: cancelledTickets,
      refunds: refundDetails
    });

  } catch (err) {
    res.status(500).json({ message: 'Mass cancellation failed', error: err.message });
  }
};


