const { readMovies, writeMovies } = require('../utils/fileHandler');
const url = require('url');
// GET /movies
const getMovies = async(req, res) => {
    try {
        const movies = await readMovies();
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(movies));
    } catch (error) {
        res.statusCode = 500;
        res.end(JSON.stringify({ error: 'Server error' }));
    }
};

// GET /movies/:id
const getMovieById = async(req, res, id) => {
    try {
        const movies = await readMovies();
        const movie = movies.find(m => Number(m.id) === id);
        if (!movie) {
            res.statusCode = 404;
            return res.end(JSON.stringify({ error: 'Movie not found' }));
        }

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(movie));

    } catch (error) {
        res.statusCode = 500;
        res.end(JSON.stringify({ error: 'Server error' }));
    }
};


// POST /movies
const createMovie = async(req, res) => {
    try {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', async() => {
            const data = JSON.parse(body);

            // Validation
            if (!data.title) {
                res.statusCode = 400;
                return res.end(JSON.stringify({ error: 'Title is required' }));
            }

            if (data.year && typeof data.year !== 'number') {
                res.statusCode = 400;
                return res.end(JSON.stringify({ error: 'Year must be a number' }));
            }

            const movies = await readMovies();

            const newMovie = {
                id: Date.now(),
                title: data.title,
                year: data.year || null,
                rating: data.rating || 0,
                description: data.description || ''
            };

            movies.push(newMovie);
            await writeMovies(movies);

            res.statusCode = 201;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(newMovie));
        });

    } catch (error) {
        res.statusCode = 500;
        res.end(JSON.stringify({ error: 'Server error' }));
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
const deleteMovie = async(req, res, id) => {
    try {
        const movies = await readMovies();

        const index = movies.findIndex(m => Number(m.id) === id);

        if (index === -1) {
            res.statusCode = 404;
            return res.end(JSON.stringify({ error: 'Movie not found' }));
        }

        const deleted = movies.splice(index, 1);

        await writeMovies(movies);

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(deleted[0]));

    } catch (error) {
        res.statusCode = 500;
        res.end(JSON.stringify({ error: 'Server error' }));
    }
};

module.exports = {
    getMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie,
};