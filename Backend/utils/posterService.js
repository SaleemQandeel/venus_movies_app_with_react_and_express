const https = require("https");

const OMDB_API_KEY = process.env.OMDB_API_KEY || "trilogy";

const fetchPoster = (imdbId) => {
    return new Promise((resolve) => {
        const url = `https://www.omdbapi.com/?i=${imdbId}&apikey=${OMDB_API_KEY}`;

        https
            .get(url, (res) => {
                let raw = "";

                res.on("data", (chunk) => {
                    raw += chunk;
                });

                res.on("end", () => {
                    try {
                        const parsed = JSON.parse(raw);

                        if (
                            parsed.Response === "True" &&
                            parsed.Poster &&
                            parsed.Poster !== "N/A"
                        ) {
                            resolve(parsed.Poster);
                        } else {
                            resolve(null);
                        }
                    } catch {
                        resolve(null);
                    }
                });
            })
            .on("error", () => {
                resolve(null);
            });
    });
};

module.exports = { fetchPoster };