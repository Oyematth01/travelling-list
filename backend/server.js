const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  const query = `INSERT INTO users (username, password) VALUES (?, ?)`;
  db.run(query, [username, password], function (err) {
    if (err) {
      return res.status(400).send('Username already exists');
    }
    res.status(201).send('User signed up successfully');
  });
});

app.post('/signin', (req, res) => {
  const { username, password } = req.body;
  const query = `SELECT * FROM users WHERE username = ? AND password = ?`;
  db.get(query, [username, password], (err, user) => {
    if (err || !user) {
      return res.status(400).send('Invalid username or password');
    }
    res.status(200).send('User signed in successfully');
  });
});

app.post('/items', (req, res) => {
  const { description, quantity, userId } = req.body;
  const query = `INSERT INTO items (description, quantity, packed, userId) VALUES (?, ?, ?, ?)`;
  db.run(query, [description, quantity, false, userId], function (err) {
    if (err) {
      return res.status(400).send(err.message);
    }
    res.status(201).send({ id: this.lastID, description, quantity, packed: false, userId });
  });
});

app.get('/items/:userId', (req, res) => {
  const { userId } = req.params;
  const query = `SELECT * FROM items WHERE userId = ?`;
  db.all(query, [userId], (err, items) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.status(200).json(items);
  });
});

app.delete('/items/:id', (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM items WHERE id = ?`;
  db.run(query, [id], function (err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.status(200).send('Item deleted successfully');
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});