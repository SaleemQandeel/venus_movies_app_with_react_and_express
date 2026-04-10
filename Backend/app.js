const express = require('express');
const app = express();
const moviesRoutes = require('./routes/movies');
app.use(express.json());
app.use('/movies', moviesRoutes);
module.exports = app;