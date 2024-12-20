const express = require('express');
const routes = require('./routes');
const app = express();

// Middleware untuk parsing JSON
app.use(express.json());

// Middleware untuk parsing x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use('/api', routes); // Base route for API

app.use((err, req, res, next) => {
    console.error(err.stack); // Log error ke console
    res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});


module.exports = app;
