const fs = require("fs").promises;
const path = require("path");

const FILE = path.join(__dirname, "..", "movies-db.json");

const readMovies = async () => {
    const data = await fs.readFile(FILE, "utf-8");
    return JSON.parse(data || "[]");
};

const writeMovies = async (movies) => {
    await fs.writeFile(FILE, JSON.stringify(movies, null, 2), "utf-8");
};

module.exports = {
    readMovies,
    writeMovies,
};