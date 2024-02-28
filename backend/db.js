const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD
  });

const sql = async (options) => {
    const [rows] = await pool.query(options.query, options.values);
    return rows;
};

module.exports = {sql};