const mysql = require("mysql2/promise");
const dotenv = require("dotenv")

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

const createTable = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS company_employee (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                phone BIGINT NOT NULL,
                role ENUM("user","admin") DEFAULT "user",
                company VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
        `);
    } catch (error) {
        console.error('Error creating table:', error);
    }
};

createTable();



module.exports = pool;