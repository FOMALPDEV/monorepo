const jwt = require('jsonwebtoken');

// Login utente
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (results.length === 0) {
      return res.status(400).json({ error: 'Email non trovata!' });
    }

    const user = results[0];

    // Verifica la password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: 'Password errata!' });
    }

    // Genera un token JWT
    const token = jwt.sign({ id: user.id, email: user.email }, 'secretkey', { expiresIn: '1h' });

    res.json({ message: 'Login effettuato!', token });
  });
});
