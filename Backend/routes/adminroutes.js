const express = require('express');
const router = express.Router();
const adminAuth = require('../middlewares/adminAuthMiddleware');
const { registerAdmin, loginAdmin, addBus, getAllBuses, updateBus, deleteBus } = require('../controllers/adminController');

router.post('/register', registerAdmin);
router.post('/login', adminAuth, loginAdmin);

router.post('/add-bus', adminAuth, addBus);
router.get('/buses',adminAuth , getAllBuses);
router.put('/bus/:id',adminAuth, updateBus);
router.delete('/bus/:id',adminAuth, deleteBus);


module.exports = router;
