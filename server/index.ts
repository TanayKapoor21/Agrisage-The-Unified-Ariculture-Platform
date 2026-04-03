
import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Database connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Middleware to check DB connection
app.get('/api/health', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    connection.release();
    res.json({ status: 'OK', message: 'Connected to MySQL' });
  } catch (error) {
    console.error('DB Health Check Error:', error);
    res.status(500).json({ status: 'ERROR', message: 'Database connection failed' });
  }
});

// --- USER ROUTES ---

// Register
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password, location } = req.body;
  try {
    const [result]: any = await pool.execute(
      'INSERT INTO users (name, email, password, location) VALUES (?, ?, ?, ?)',
      [name, email, password, location] // Note: Should hash in production
    );
    res.status(201).json({ id: result.insertId, name, email, location });
  } catch (error: any) {
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ message: 'User already exists' });
    } else {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows]: any = await pool.execute(
      'SELECT id, name, email, location FROM users WHERE email = ? AND password = ?',
      [email, password]
    );
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// --- DIAGNOSTICS ROUTES ---

app.post('/api/diagnostics', async (req, res) => {
  const { user_id, crop_name, health_status, infection_stage, pathogen_category, analysis_details } = req.body;
  try {
    const [result]: any = await pool.execute(
      'INSERT INTO diagnostics (user_id, crop_name, health_status, infection_stage, pathogen_category, analysis_details) VALUES (?, ?, ?, ?, ?, ?)',
      [user_id, crop_name, health_status, infection_stage, pathogen_category, analysis_details]
    );
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/diagnostics/:user_id', async (req, res) => {
  try {
    const [rows]: any = await pool.execute(
      'SELECT * FROM diagnostics WHERE user_id = ? ORDER BY created_at DESC',
      [req.params.user_id]
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// --- CARBON CREDITS ---

app.get('/api/carbon/:user_id', async (req, res) => {
  try {
    const [rows]: any = await pool.execute(
      'SELECT * FROM carbon_credits WHERE user_id = ?',
      [req.params.user_id]
    );
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      // Create record if not exists
      await pool.execute('INSERT INTO carbon_credits (user_id) VALUES (?)', [req.params.user_id]);
      res.json({ total_credits: 0, credits_earned_today: 0, residue_monetized_tonnes: 0 });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`AgriSage Server running on port ${PORT}`);
});
