// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  phone: {
    type: String,
    match: [/^\d{10}$/, "Phone number must be 10 digits"]
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  // walletBalance: {
  //   type: Number,
  //   default: 1000,
  //   min: 0
  // },
  role: {
    type: String,
    default: 'user'
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
