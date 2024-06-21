const express = require('express');
const router = express.Router();
const { bookFlight } = require('../controllers/bookingController');
const auth = require('../middleware/authMiddleware');

router.post('/book-flight', auth, bookFlight);

module.exports = router;
