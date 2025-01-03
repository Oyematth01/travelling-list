const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

const dataFilePath = path.join(__dirname, 'data.json');

// Helper functions to read and write data
function readData() {
  if (!fs.existsSync(dataFilePath)) {
    return { users: [], items: [] };
  }
  const data = fs.readFileSync(dataFilePath);
  return JSON.parse(data);
}

function writeData(data) {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}

// Routes
app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  const data = readData();
  if (data.users.find(user => user.username === username)) {
    return res.status(400).send('Username already exists');
  }
  data.users.push({ username, password });
  writeData(data);
  res.status(201).send('User signed up successfully');
});

app.post('/signin', (req, res) => {
  const { username, password } = req.body;
  const data = readData();
  const user = data.users.find(user => user.username === username && user.password === password);
  if (user) {
    res.status(200).send('User signed in successfully');
  } else {
    res.status(400).send('Invalid username or password');
  }
});

app.post('/items', (req, res) => {
  const { description, quantity, userId } = req.body;
  const data = readData();
  const item = { id: Date.now().toString(), description, quantity, packed: false, userId };
  data.items.push(item);
  writeData(data);
  res.status(201).send(item);
});

app.get('/items/:userId', (req, res) => {
  const { userId } = req.params;
  const data = readData();
  const items = data.items.filter(item => item.userId === userId);
  res.status(200).json(items);
});

app.delete('/items/:id', (req, res) => {
  const { id } = req.params;
  const data = readData();
  data.items = data.items.filter(item => item.id !== id);
  writeData(data);
  res.status(200).send('Item deleted successfully');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});