const Razorpay = require("razorpay");

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    // Ensure amount is formatted to 2 decimal places for display
    const formattedAmount = parseFloat(amount).toFixed(2);

    // Convert amount to paise for Razorpay
    const amountInPaise = Math.round(formattedAmount * 100);

    const options = {
      amount: amountInPaise,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpayInstance.orders.create(options);

    // Send the formatted amount back for display purposes
    res.status(201).json({ ...order, formattedAmount });
  } catch (error) {
    console.error("Error creating Razorpay order:", error.message);
    res.status(500).json({ error: "Failed to create Razorpay order" });
  }
};