const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
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
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    default: 'admin'
  }
}, { timestamps: true });

adminSchema.pre('save', async function (next) {
  const Admin = mongoose.model('Admin');
  const existingAdmin = await Admin.findOne();
  if (existingAdmin) {
    throw new Error('Only one admin is allowed.');
  }
  next();
});

module.exports = mongoose.model('Admin', adminSchema);
