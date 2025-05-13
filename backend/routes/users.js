app.get('/users', (req, res) => {
    db.query('SELECT id, name, email, created_at FROM users', (err, results) => {
        if (err) {
            return res.status(500).json({ error: '❌ Errore nel recupero utenti', details: err.message });
        }
        res.json(results);
    });
});
