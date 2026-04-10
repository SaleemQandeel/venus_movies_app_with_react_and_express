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
const updateMovie = async(req, res, id) => {
    try {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', async() => {
            const data = JSON.parse(body);
            const movies = await readMovies();

            const index = movies.findIndex(m => Number(m.id) === id);

            if (index === -1) {
                res.statusCode = 404;
                return res.end(JSON.stringify({ error: 'Movie not found' }));
            }

            const movie = movies[index];

            // update fields
            movie.title = data.title || movie.title;
            movie.year = data.year || movie.year;
            movie.rating = data.rating || movie.rating;
            movie.description = data.description || movie.description;

            movies[index] = movie;

            await writeMovies(movies);

            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(movie));
        });

    } catch (error) {
        res.statusCode = 500;
        res.end(JSON.stringify({ error: 'Server error' }));
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