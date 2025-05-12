const Admin = require('../models/admin.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerAdmin = async ({ name, email, phone, password }) => {
  const existingAdmin = await Admin.findOne({ role: 'admin' });
  if (existingAdmin) {
    throw new Error('Admin already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const admin = new Admin({ name, email, phone, password: hashedPassword, role: 'admin' });
  await admin.save();
  return { message: 'Admin registered successfully' };
};

 exports.loginAdmin = async ({ email, password }) => {
  const admin = await Admin.findOne({ email, role: 'admin' });
  if (!admin) throw new Error('Admin not found');

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) throw new Error('Invalid credentials');

  const token = jwt.sign(
    { AdminId: admin._id, role: 'admin' }, 
    process.env.JWT_SECRET,
    { expiresIn: '3d' }
  );

  return { token, admin }; // ✅ return both
};



exports.findById = async (adminId) => {
  try {
    const admin = await Admin.findById(adminId).select("-password");

    if (!admin) {
      throw new Error("Admin not found");
    }

    return admin;
  } catch (error) {
    throw new Error(error.message); 
  }
};


