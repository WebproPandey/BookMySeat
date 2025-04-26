const express = require('express');
const router = express.Router();
const adminAuth = require('../middlewares/adminAuthMiddleware');
const { registerAdmin, loginAdmin, addBus, getAllBuses, updateBus, deleteBus, PromoCode } = require('../controllers/adminController');

router.post('/register', registerAdmin);
router.post('/login',  loginAdmin);

router.post('/add-bus',adminAuth,  addBus);
router.post('/promo', adminAuth,PromoCode);
router.get('/buses',adminAuth, getAllBuses);
router.put('/bus/:id', adminAuth,updateBus);
router.delete('/bus/:id',adminAuth, deleteBus);


module.exports = router;
