const { readMovies, writeMovies } = require('../utils/fileHandler');
const url = require('url');
// GET /movies
const getMovies = async(req, res) => {
    try {
        const movies = await readMovies();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};


// GET /movies/:id
const getMovieById = async(req, res) => {
    try {
        const id = parseInt(req.params.id);
        const movies = await readMovies();

        const movie = movies.find(m => Number(m.id) === id);

        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        res.json(movie);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
// post /movies
const createMovie = async(req, res) => {
    try {
        const data = req.body;

        // Validation
        if (!data.title) {
            return res.status(400).json({ error: 'Title is required' });
        } else if (!data.description) {
            return res.status(400).json({ error: 'Description is required' });
        } else if (!data.year) {
            return res.status(400).json({ error: 'Year is required' });
        } else if (typeof data.year !== 'number') {
            return res.status(400).json({ error: 'Year must be a number' });
        }

        const movies = await readMovies();

        // Check if movie exists
        const exists = movies.find(m => m.title === data.title);
        if (exists) {
            return res.status(409).json({ error: 'Movie already exists' });
        }

        const newMovie = {
            id: Date.now(),
            title: data.title,
            year: data.year,
            rating: data.rating || 0,
            description: data.description
        };

        movies.push(newMovie);
        await writeMovies(movies);

        res.status(201).json(newMovie);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
// PATCH /movies/:id
const updateMovie = async(req, res) => {
    try {
        const id = parseInt(req.params.id);
        const data = req.body;

        const movies = await readMovies();

        const index = movies.findIndex(m => Number(m.id) === id);

        if (index === -1) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        // Validation
        if (data.title !== undefined && !data.title) {
            return res.status(400).json({ error: 'Title must not be empty' });
        }
        if (data.description !== undefined && !data.description) {
            return res.status(400).json({ error: 'Description must not be empty' });
        }
        if (data.year !== undefined && typeof data.year !== 'number') {
            return res.status(400).json({ error: 'Year must be a number' });
        }

        const movie = movies[index];

        // Update only sent fields
        if (data.title !== undefined) movie.title = data.title;
        if (data.year !== undefined) movie.year = data.year;
        if (data.rating !== undefined) movie.rating = data.rating;
        if (data.description !== undefined) movie.description = data.description;

        movies[index] = movie;

        await writeMovies(movies);

        res.json(movie);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
// DELETE /movies/:id
const deleteMovie = async(req, res) => {
    try {
        const id = parseInt(req.params.id);

        const movies = await readMovies();

        const index = movies.findIndex(m => Number(m.id) === id);

        if (index === -1) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        const deleted = movies.splice(index, 1);

        await writeMovies(movies);

        res.json(deleted[0]);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
module.exports = {
    getMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie,
};