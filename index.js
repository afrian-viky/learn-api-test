const express = require('express');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const pool = require('./db');

const app = express();

// Gunakan port yang diberikan oleh Vercel, atau fallback ke 3000 (saat development lokal)
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running!');
});

app.use('/users', userRoutes);

// Test DB connection (gunakan hanya saat development lokal)
if (process.env.NODE_ENV !== 'production') {
  pool.connect()
    .then(() => {
      console.log('Connected to PostgreSQL!');
      app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
    })
    .catch((err) => {
      console.error('Database connection failed', err);
    });
}

module.exports = app; // Vercel pakai ini
