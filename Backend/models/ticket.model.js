const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  
    required: true
  },
  busId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bus', 
    required: true
  },
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  distance: {
    type: Number,
    required: true
  },
  seatsBooked: {
    type: [Number], 
    required: true
  },
  totalFare: {
    type: Number,
    required: true
  },
  ticketId: {
    type: String,
    unique: true,  
    required: true
  },
  bookingTime: {
    type: Date,
    default: Date.now 
  },
  qrCodeUrl: {
    type: String,  
    required: true
  },
  promoCode: {  
    type: String,
    required: false  
  },
  discountApplied: { 
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['booked', 'cancelled'],  
    default: 'booked'
  }
});

module.exports = mongoose.model('Ticket', ticketSchema);
