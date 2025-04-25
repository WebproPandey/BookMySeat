const express = require('express');
const router = express.Router();
// const adminAuth = require('../middlewares/adminAuthMiddleware');
const { registerAdmin, loginAdmin, addBus, getAllBuses, updateBus, deleteBus } = require('../controllers/adminController');

router.post('/register', registerAdmin);
router.post('/login',  loginAdmin);

router.post('/add-bus',  addBus);
router.get('/buses', getAllBuses);
router.put('/bus/:id', updateBus);
router.delete('/bus/:id', deleteBus);


module.exports = router;
