const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
  name: String,
  route: {
    from: String,
    to: String
  },
  pickupTime: String,
  dropTime: String,
  distance: Number,
  pricePerKm: {
    ac: Number,
    nonAc: Number,
    deluxe: Number,
    nonDeluxe: Number
  },
  busType: {
    type: String,
    enum: ['AC', 'Non-AC', 'Deluxe', 'Non-Deluxe']
  },
  seats: Number,
  availableSeats: [Number],
  timings: String
});

module.exports = mongoose.model('Bus', busSchema);
