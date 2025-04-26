const adminService = require('../Services/adminService');
const Bus = require('../models/bus.model');
const PromoCode = require('../models/promoCode.modle');



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
      pricePerKm, busType, seats
    } = req.body;

    const availableSeats = Array.from({ length: seats }, (_, i) => i + 1);

    const bus = new Bus({
      name,
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


