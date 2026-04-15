const express = require("express");
const router = express.Router();
const {
    getMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie,
} = require('../controllers/moviesController');
// GET /movies or  GET /movies?search=keyword or GET /movies?limit=number
router.get('/', getMovies);
// GET /movies/:id
router.get('/:id', getMovieById);
// POST /movies
router.post('/', createMovie);
// PATCH /movies/:id
router.patch('/:id', updateMovie);
// DELETE /movies/:id
router.delete('/:id', deleteMovie);
module.exports = router