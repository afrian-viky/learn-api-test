const express = require('express');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const pool = require('./db');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running!');
});

app.use('/users', userRoutes);

// Test DB connection
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

  module.exports = app;