// controllers/bannerController.js
const db = require('../config/db');

// Get banner data
exports.getBanner = (req, res) => {
  db.query('SELECT * FROM banner ORDER BY id DESC LIMIT 1', (err, results) => {
    if (err) return res.status(500).send('Database error');
    res.json(results[0] || {});
  });
};

// Update or insert banner data
exports.updateBanner = (req, res) => {
  const { description, timer, link, isVisible } = req.body;
  const query = 'REPLACE INTO banner (id, description, timer, link, isVisible) VALUES (1, ?, ?, ?, ?)';
  db.query(query, [description, timer, link, isVisible], (err) => {
    if (err) return res.status(500).send('Database error');
    res.send('Banner updated successfully!');
  });
};
