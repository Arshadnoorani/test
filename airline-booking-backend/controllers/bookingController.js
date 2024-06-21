const pool = require('../config/db');

exports.bookFlight = async (req, res) => {
    const { email, beginning,destination,Journey_date,seat_type} = req.body;

    try {
        const newBooking = await pool.query(
            'INSERT INTO bookings (email, beginning, destination,Journey_date,seat_type) VALUES (?, ?, ?, ?, ?)',
            [email, beginning,destination,Journey_date,seat_type]
        );

        res.json(newBooking.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
};
