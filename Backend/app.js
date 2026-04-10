const express = require('express');
const app = express();
const moviesRoutes = require('./routes/movies');
app.use('/movies', moviesRoutes);
module.exports = app;