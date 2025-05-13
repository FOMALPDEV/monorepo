const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../db');

const router = express.Router();

// Registrazione utente
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Controlla se l'utente esiste già
  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (results.length > 0) {
      return res.status(400).json({ error: 'Email già registrata!' });
    }

    // Hash della password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Inserisce il nuovo utente nel database
    db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword], (err) => {
      if (err) return res.status(500).json({ error: 'Errore durante la registrazione' });
      res.status(201).json({ message: 'Registrazione completata!' });
    });
  });
});

module.exports = router;
