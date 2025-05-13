const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Accesso negato!' });
  }

  jwt.verify(token, 'secretkey', (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Token non valido!' });
    }
    
    req.user = decoded;
    next();
  });
};

// Esempio di route protetta
app.get('/profile', authenticate, (req, res) => {
  res.json({ message: `Benvenuto, utente ${req.user.email}!` });
});
