const Razorpay = require("razorpay");

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    // Convert amount to paise
    const amountInPaise = Math.round(amount * 100);

    const options = {
      amount: amountInPaise, 
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpayInstance.orders.create(options);
    res.status(201).json(order);
  } catch (error) {
    console.error("Error creating Razorpay order:", error.message);
    res.status(500).json({ error: "Failed to create Razorpay order" });
  }
};