const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");
const dotenv = require("dotenv");
dotenv.config();
const { authenticate, authorizeAdmin } = require("../middleware/auth")




const router = express.Router();

router.post("/register", async (req, res) => {
    const { name, email, password, phone, company } = req.body;

    if (!name || !email || !password || !phone || !company) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const hashPassword = await bcrypt.hash(password, 10);
        const query = `INSERT INTO company_employee (name, email, password, phone, company) VALUES (?, ?, ?, ?, ?)`;
        const [result] = await pool.query(query, [name, email, hashPassword, phone, company]);
        res.status(201).json({ message: "User Registered", userId: result.insertId });

    } catch (err) {
        res.status(500).json({ message: "Error occured", error: err })
    }

});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {

        console.log("Email:", email);

        const [rows] = await pool.query('SELECT * FROM company_employee WHERE email = ?', [email]);

        const user = rows[0];

        console.log("User found:", user);

        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (err) {
        console.error("Error logging in:", err);
        res.status(500).json({ message: 'Error logging in', error: err });
    }
});


router.get("/get-user", authenticate, authorizeAdmin, async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT id, name, email, phone FROM company_employee');
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching users', error: err });
    }
});

router.delete("/delete-user/:id", authenticate, authorizeAdmin, async (req, res) => {
    const { id } = req.params;

    try {
        const query = `DELETE FROM company_employee WHERE id = ?`;
        const [result] = await pool.query(query, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting user", error: err });
    }
});

router.put("/update-user", authenticate, authorizeAdmin, async (req, res) => {
    const { id, name, email, phone, company } = req.body;

    if (!id || !name || !email || !phone || !company) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const query = `
            UPDATE company_employee 
            SET name = ?, email = ?, phone = ?, company = ? 
            WHERE id = ?`;

        const [result] = await pool.query(query, [name, email, phone, company, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error updating user', error: err });
    }
});

router.get("/search-user", authenticate, authorizeAdmin, async (req, res) => {
    const { name, email, phone, company } = req.query;

    let query = 'SELECT * FROM company_employee WHERE 1=1';
    let queryParams = [];


    if (name) {
        query += ' AND name LIKE ?';
        queryParams.push(`%${name}%`);
    }
    if (email) {
        query += ' AND email LIKE ?';
        queryParams.push(`%${email}%`);
    }
    if (phone) {
        query += ' AND phone LIKE ?';
        queryParams.push(`%${phone}%`);
    }

    if (company) {
        query += ' AND company = ?';
        queryParams.push(company);
    }

    try {
        const [rows] = await pool.query(query, queryParams);
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching customers', error: err });
    }
});


module.exports = router;

