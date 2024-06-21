const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// exports.signup = async (req, res) => {
//     const { name, email, password } = req.body;

//     try {
//         // Check if the user already exists
//         // const [existingUser] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
//         // if (existingUser.length > 0) {
//         //     return res.status(400).json({ msg: 'User already exists' });
//         // }

//         // Hash the password
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         // Insert the new user into the database
//         const result= await pool.query(
//             'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
//             [name, email, hashedPassword]
//         );

//         // Get the new user's ID
//         const newUserId = result.insertId;

//         // Create the payload and sign the JWT
//         const payload = { user: { id: newUserId } };
//         jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
//             if (err) throw err;
//             res.json({ token });
//         });

//     } catch (err) {
//         console.error(err.message);
//         res.status(500).json({ error: 'Server error' });

//     }
// };


exports.signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert the new user into the database
        const result = await pool.query(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, hashedPassword]
        );

        console.log('Insert result:', result);

        // Ensure result.insertId is available and valid
        // if (!result.insertId) {
        //     throw new Error('Failed to retrieve insert ID');
        // }

        // Get the new user's ID
        const newUserId = result.insertId;

        // Create the payload and sign the JWT
        const payload = { user: { id: newUserId } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });

    } catch (err) {
        console.error('Signup error:', err.message);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (rows.length === 0) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const payload = { user: { id: user.id } };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
};