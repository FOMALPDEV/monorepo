const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: "Benvenuto nel backend!" });
});

module.exports = router;
