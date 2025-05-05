const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getAvailableBuses, getTicketPDF, bookTicket, getAllPromos, getMyTickets, cancelTicket, deleteTicket } = require('../controllers/userController');
const userAuth = require('../middlewares/authMiddleware');


router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/available-buses', getAvailableBuses);    
router.post('/tickets/book',userAuth, bookTicket);                      
router.get('/tickets/pdf/:ticketId',userAuth, getTicketPDF); 
router.get('/my-tickets', userAuth, getMyTickets);
router.patch('/tickets/cancel/:ticketId', userAuth, cancelTicket);
router.delete('/tickets/delete/:ticketId', userAuth, deleteTicket);
router.get('/promos', getAllPromos); 

module.exports = router;
