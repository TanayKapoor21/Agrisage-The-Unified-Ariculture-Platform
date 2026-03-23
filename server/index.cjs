
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const app = express();
app.use(cors());
app.use(express.json());

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '2130',
    database: process.env.DB_NAME || 'agrisage',
};

// Test DB Connection
const pool = mysql.createPool(dbConfig);

app.post('/api/register', async (req, res) => {
    const { name, email, password, location, farmSize, primaryCrops } = req.body;
    try {
        const [existing] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (existing.length > 0) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        const cropsStr = Array.isArray(primaryCrops) ? primaryCrops.join(',') : '';
        const [result] = await pool.execute(
            'INSERT INTO users (name, email, password, location, farmSize, primaryCrops) VALUES (?, ?, ?, ?, ?, ?)',
            [name, email, password, location, farmSize, cropsStr]
        );

        const newUser = { id: result.insertId, name, email, location, farmSize, primaryCrops };
        res.json({ success: true, user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Database error' });
    }
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const [rows] = await pool.execute('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
        if (rows.length === 0) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
        
        const user = rows[0];
        const formattedUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            location: user.location,
            farmSize: user.farmSize,
            primaryCrops: user.primaryCrops ? user.primaryCrops.split(',') : []
        };
        
        res.json({ success: true, user: formattedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Database error' });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
