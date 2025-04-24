const userService = require('../Services/userService');

exports.registerUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    const existingUser = await userService.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    const result = await userService.registerUser({ name, email, phone, password });
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await userService.loginUser({ email, password });
    res.cookie('token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
    });
    res.status(200).json({ message: 'Login successful', token: result.token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
