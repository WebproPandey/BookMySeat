const User = require('../models/user.modle');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.registerUser = async ({ name, email, phone, password }) => {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ name, email, phone, password: hashedPassword });
      await user.save();
      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
      return { message: 'User registered successfully', token };
    } catch (err) {
      console.error("Error in userService.registerUser:", err.message);
      throw new Error("User registration failed");
    }
  };
  

exports.loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('User not found');
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');
  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
  return { token };
};

exports.getUserByEmail = async (email) => {
  return await User.findOne({ email });
};
