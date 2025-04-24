const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minlength: [2, "Name must be at least 2 characters long"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/.+\@.+\..+/, "Please enter a valid email address"]
  },
  phone: {
    type: String,
    trim: true,
    match: [/^\d{10}$/, "Phone number must be 10 digits"]
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"]
  },
  walletBalance: {
    type: Number,
    default: 0,
    min: [0, "Wallet balance cannot be negative"]
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
}, { timestamps: true }); 


userSchema.pre('save', async function (next) {
  if (this.role === 'admin') {
    const existingAdmin = await this.constructor.findOne({ role: 'admin' });
    if (existingAdmin) {
      throw new Error('Admin already exists');
    }
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
