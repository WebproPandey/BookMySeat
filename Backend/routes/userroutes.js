const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getAvailableBuses, getTicketPDF, bookTicket, getAllPromos, getMyTickets, cancelTicket, deleteTicket } = require('../controllers/userController');
const { createOrder } = require('../controllers/paymentController');
const authMiddleware = require('../middlewares/authMiddleware');


router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/available-buses', authMiddleware ,getAvailableBuses);  

// Razorpay order creation

router.post("/payment/create-order", authMiddleware, createOrder); 
router.post("/tickets/book", authMiddleware, bookTicket);
            
router.get('/my-tickets', authMiddleware, getMyTickets);

router.get('/tickets/pdf/:ticketId',authMiddleware, getTicketPDF); 
router.patch('/tickets/cancel/:ticketId', authMiddleware, cancelTicket);
router.delete('/tickets/delete/:ticketId', authMiddleware, deleteTicket);

router.get('/promos',authMiddleware ,getAllPromos); 

module.exports = router;
