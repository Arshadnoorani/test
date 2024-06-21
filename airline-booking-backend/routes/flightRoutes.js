const express = require('express');
const router = express.Router();
const { addFlight, updateFlight, deleteFlight, getFlights } = require('../controllers/flightController');
const auth = require('../middleware/authMiddleware');

router.post('/add-flight', auth, addFlight);
router.put('/update-flight/:id', auth, updateFlight);
router.delete('/delete-flight/:id', auth, deleteFlight);
router.get('/flights', getFlights);

module.exports = router;
