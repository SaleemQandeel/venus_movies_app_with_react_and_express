const fs = require('fs').promises; // Import fs module with Promise support to use async/await instead of callbacks
const FILE = './movies-db.json';

const readMovies = async() => {
    const data = await fs.readFile(FILE, 'utf-8');
    return JSON.parse(data || '[]');
};

const writeMovies = async(movies) => {
    await fs.writeFile(FILE, JSON.stringify(movies, null, 2));
};

module.exports = {
    readMovies,
    writeMovies
};