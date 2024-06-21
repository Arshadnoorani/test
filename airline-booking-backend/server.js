require('dotenv').config();
const express = require('express');
const connection = require('./config/db')
const cors = require('cors');
const connectDb = require('./config/db');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/flights', require('./routes/flightRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));

// Default route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Start the server
const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
    connection.connect((err) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log('Connected to MySQL');
    });
});
