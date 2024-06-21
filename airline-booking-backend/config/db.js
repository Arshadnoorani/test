// const{createPool} = require('mysql');

// const pool = createPool({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: "frist.sql",
//     connectionLimit: 10
// });

// pool.query('SELECT 1 + 1 AS solution', (err, result,fields) => {
//     if(err) throw err;
//     return console.log(result);
// });
// const { Pool } = require('pg');
// require('dotenv').config();

// const pool = new Pool({
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     database: process.env.DB_NAME,
//     password: process.env.DB_PASSWORD,
//     // port: process.env.DB_PORT,
// });

// module.exports = pool;
// const { Pool } = require('pg');
// require('dotenv').config();

// const pool = new Pool({
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     database: process.env.DB_NAME,
//     password: process.env.DB_PASSWORD,
//     port: process.env.DB_PORT,
// });

// const connectDB = async () => {
//     try {
//         await pool.connect();
//         console.log('PostgreSQL connected...');
//     } catch (err) {
//         console.error('Error connecting to PostgreSQL:', err.message);
//         process.exit(1);
//     }
// };

// module.exports = {
//     connectDB,
//     pool
// };

var mysql = require('mysql')

var connectDb = mysql.createConnection({
    host: "localhost",
    database:"airline_management",
    user: "root",
    password:"pw4dummy"
})


module.exports = connectDb