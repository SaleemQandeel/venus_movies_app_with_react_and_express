const express = require('express');
const app = express();
// Test route
app.get('/test', (req, res) => {
    res.send("Server is working");
});
module.exports = app;