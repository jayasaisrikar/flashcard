const express = require('express');
// const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1206',
  database: 'flashcards_db',
});

db.connect(err => {
  if (err) {
    console.error('error connecting to database:', err);
    return;
  }
  console.log('connected to database');
});

// Get all flashcards
app.get('/flashcards', (req, res) => {
  db.query('SELECT * FROM flashcards', (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// Add a new flashcard
app.post('/flashcards', (req, res) => {
  const { question, answer } = req.body;
  db.query('INSERT INTO flashcards (question, answer) VALUES (?, ?)', [question, answer], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).send('Flashcard added successfully');
  });
});

// Update a flashcard
app.put('/flashcards/:id', (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;
  db.query('UPDATE flashcards SET question = ?, answer = ? WHERE id = ?', [question, answer, id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send('Flashcard updated successfully');
  });
});

// Delete a flashcard
app.delete('/flashcards/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM flashcards WHERE id = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send('Flashcard deleted successfully');
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
