const express = require('express');
const router = express.Router();
const adminAuth = require('../middlewares/adminAuthMiddleware');
const { registerAdmin, loginAdmin, addBus, getAllBuses, updateBus, deleteBus, PromoCode ,updatePromoCode,
    deletePromoCode, getAllPromoCodes ,  getAllUsers,getUserBookingHistory ,getRevenueStats ,cancelAllBusBookings } = require('../controllers/adminController');

router.post('/register', registerAdmin);
router.post('/login',  loginAdmin);

router.post('/add-bus',adminAuth,  addBus);
router.get('/buses',adminAuth, getAllBuses);
router.put('/bus/:id', adminAuth,updateBus);
router.delete('/bus/:id',adminAuth, deleteBus);

router.post('/promo', adminAuth,PromoCode);
router.put('/promo/:id', adminAuth, updatePromoCode);
router.delete('/promo/:id', adminAuth, deletePromoCode);
router.get('/promos', adminAuth, getAllPromoCodes);

router.get('/users', adminAuth, getAllUsers);
router.get('/user/:id/bookings', adminAuth, getUserBookingHistory);

router.get('/revenue', adminAuth, getRevenueStats);


router.put('/cancel-bus-bookings/:busId', adminAuth, cancelAllBusBookings);



module.exports = router;
