const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Ganti dengan nama pengguna MySQL Anda
  password: '', // Ganti dengan kata sandi MySQL Anda
  database: 'instagram'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Serve the login.html file at the root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Handle Register Request
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  console.log('Received data:', { username, password });

  const query = `
    INSERT INTO users (username, password)
    VALUES (?, ?)
  `;

  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Error inserting user into database:', err);
      return res.status(500).send('Error inserting user into database');
    }

    res.send('User registered successfully');
  });
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
