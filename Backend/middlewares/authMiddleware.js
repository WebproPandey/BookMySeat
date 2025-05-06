const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  console.log("Authorization Header:", req.headers.authorization);
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: 'No token' });
  }

  const token = authHeader.split(" ")[1]; // Extract the token
  if (!token) return res.status(401).json({ message: 'No token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    req.user = decoded; // Attach the decoded user to the request
    next();
  } catch (err) {
    console.log("message:", err.message);
    return res.status(401).json({ message: 'Invalid token' });
  }
};