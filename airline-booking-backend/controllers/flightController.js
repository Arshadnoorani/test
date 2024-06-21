const pool = require('../config/db');

exports.addFlight = async (req, res) => {
    const { airlinesName, airlinesNo, fromCity, departureTime, toCity, arrivalTime, travelTime, totalDistance } = req.body;

    try {
        const newFlight = await pool.query(
            'INSERT INTO flights (airlines_name, airlines_no, from_city, departure_time, to_city, arrival_time, travel_time, total_distance) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [airlinesName, airlinesNo, fromCity, departureTime, toCity, arrivalTime, travelTime, totalDistance]
        );

        res.json(newFlight.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.updateFlight = async (req, res) => {
    const { airlinesName, airlinesNo, fromCity, departureTime, toCity, arrivalTime, travelTime, totalDistance } = req.body;

    try {
        const updatedFlight = await pool.query(
            'UPDATE flights SET airlines_name = $1, airlines_no = $2, from_city = $3, departure_time = $4, to_city = $5, arrival_time = $6, travel_time = $7, total_distance = $8 WHERE id = $9 RETURNING *',
            [airlinesName, airlinesNo, fromCity, departureTime, toCity, arrivalTime, travelTime, totalDistance, req.params.id]
        );

        if (updatedFlight.rows.length === 0) {
            return res.status(404).json({ msg: 'Flight not found' });
        }

        res.json(updatedFlight.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.deleteFlight = async (req, res) => {
    try {
        const deletedFlight = await pool.query('DELETE FROM flights WHERE id = $1 RETURNING *', [req.params.id]);

        if (deletedFlight.rows.length === 0) {
            return res.status(404).json({ msg: 'Flight not found' });
        }

        res.json({ msg: 'Flight removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getFlights = async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM flights');
        res.json(rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
