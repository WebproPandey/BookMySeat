const express = require('express');
const router = express.Router();

const { registerAdmin, loginAdmin, addBus, getAllBuses, updateBus, deleteBus, PromoCode ,updatePromoCode,
    deletePromoCode, getAllPromoCodes ,  getAllUsers,getUserBookingHistory ,getRevenueStats ,cancelAllBusBookings, 
    getCurrentAdmin} = require('../controllers/adminController');
const upload = require('../config/multerConfig');
const adminAuthMiddleware = require('../middlewares/adminAuthMiddleware');

router.post('/register', registerAdmin);
router.post('/login',  loginAdmin);
router.get('/me', adminAuthMiddleware, getCurrentAdmin);


router.post('/add-bus', adminAuthMiddleware, upload.single('busImage'), addBus);
router.get('/buses',adminAuthMiddleware, getAllBuses);
router.put("/bus/:id", adminAuthMiddleware, upload.single("busImage"), updateBus); 
router.delete('/bus/:id',adminAuthMiddleware, deleteBus);

router.post('/promo', adminAuthMiddleware,PromoCode);
router.put('/promo/:id', adminAuthMiddleware, updatePromoCode);
router.delete('/promo/:id', adminAuthMiddleware, deletePromoCode);
router.get('/promos', adminAuthMiddleware, getAllPromoCodes);

router.get('/users', adminAuthMiddleware, getAllUsers);
router.get('/user/:id/bookings', adminAuthMiddleware, getUserBookingHistory);


router.get('/revenue', adminAuthMiddleware, getRevenueStats);
router.put('/cancel-bus-bookings/:busId', adminAuthMiddleware, cancelAllBusBookings);



module.exports = router;
