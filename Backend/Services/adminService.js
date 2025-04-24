const User = require('../models/user.modle');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerAdmin = async ({ name, email, phone, password }) => {
  const existingAdmin = await User.findOne({ role: 'admin' });
  if (existingAdmin) {
    throw new Error('Admin already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const admin = new User({ name, email, phone, password: hashedPassword, role: 'admin' });
  await admin.save();
  return { message: 'Admin registered successfully' };
};

exports.loginAdmin = async ({ email, password }) => {
  const admin = await User.findOne({ email, role: 'admin' });
  if (!admin) throw new Error('Admin not found');
  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) throw new Error('Invalid credentials');
  
  const token = jwt.sign({ userId: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
  return { token };
};
