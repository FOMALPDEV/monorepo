const express = require('express');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Route per ottenere utenti dal database
app.get('/users', (req, res) => {
    db.query('SELECT id, name, email FROM users', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Route di registrazione utente
app.post('/auth/register', async (req, res) => {
    const { name, email, password } = req.body;

    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (results.length > 0) {
            return res.status(400).json({ error: 'Email già registrata!' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword], (err) => {
            if (err) return res.status(500).json({ error: 'Errore durante la registrazione' });
            res.status(201).json({ message: 'Registrazione completata!' });
        });
    });
});

// Route di login utente
app.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (results.length === 0) {
            return res.status(400).json({ error: 'Email non trovata!' });
        }

        const user = results[0];
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ error: 'Password errata!' });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, 'secretkey', { expiresIn: '1h' });
        res.json({ message: 'Login effettuato!', token });
    });
});

// Servire il frontend su 127.0.0.1
app.use('/frontend', express.static(path.join(__dirname, '../frontend')));

// Servire il backend su 127.0.0.1
app.use('/backend', express.static(path.join(__dirname, '../backend')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

app.get('/backend', (req, res) => {
    res.sendFile(path.join(__dirname, '../backend', 'index_backend.html'));
});

// Avviare il server su 127.0.0.1
const PORT = 3000;
app.listen(PORT, '127.0.0.1', () => {
    console.log(`✅ Server avviato su http://127.0.0.1:${PORT}`);
});