const mongoose = require('mongoose');
ticketSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    busId: mongoose.Schema.Types.ObjectId,
    from: String,
    to: String,
    distance: Number,
    seatsBooked: [Number],
    totalFare: Number,
    ticketId: String,
    bookingTime: Date,
    qrCodeUrl: String
  });
  
  module.exports = mongoose.model('Ticket', ticketSchema);