const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//examples:
// Existing route to fetch all stations
app.get('/api/station', (req, res) => {
    db.query('SELECT * FROM Station', (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// New route to fetch user by ID
app.get('/api/users/:id', (req, res) => {
    const userId = req.params.id;

    db.query('SELECT * FROM users WHERE userid = ?', [userId], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
