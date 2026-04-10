const url = require('url');
const express = require('express');
const router = express.Router();
const {
    getMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie,
} = require('../controllers/moviesController');
// GET /movies
router.get('/', getMovies);
router.get('/:id', getMovieById);
// POST /movies
router.post('/', createMovie);
// PATCH /movies/:id
router.patch('/:id', updateMovie);
const moviesRoute = (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const query = parsedUrl.query;
    const method = req.method;
    const idMatch = path.match(/^\/movies\/(\d+)/);
    const id = idMatch ? parseInt(idMatch[1]) : null;
    switch (true) {
        // DELETE /movies/:id
        case method === 'DELETE' && id !== null:
            return deleteMovie(req, res, id);
        default:
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Route not found' }));
    }
};

module.exports = router;