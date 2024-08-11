const db = require('../config/db');

// exports.getBanner = (req, res) => {
//   db.query('SELECT * FROM banner LIMIT 1', (err, result) => {
//     if (err) throw err;
//     res.send(result[0]);
//   });
// };
// Example: Node.js with Express
// app.get('/api/banner', (req, res) => {
exports.getBanner = (req, res) => {
    db.query('SELECT * FROM banner', (err, results) => {
      if (err) {
        return res.status(500).send('Database error');
      }
      if (results.length === 0) {
        // Return an empty object or default data
        return res.json({ description: '', timer: 0, link: '', isVisible: false });
      }
      res.json(results[0]);
    });
  };
  

exports.updateBanner = (req, res) => {
  const { description, timer, link, isVisible } = req.body;
  db.query(
    'UPDATE banner SET description = ?, timer = ?, link = ?, isVisible = ? WHERE id = 1',
    [description, timer, link, isVisible],
    (err, result) => {
      if (err) throw err;
      res.send('Banner updated successfully');
    }
  );
};
