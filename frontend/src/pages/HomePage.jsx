import { movies } from "../data/movies";
import MovieList from "../components/MovieList";

function HomePage() {
    const selectedMovie = movies[0];

    return (
        <main className="home-page">
            <div className="page-header">
                <h1 className="page-title">Movie Browser</h1>
                <p className="page-subtitle">Static movie list using mock data</p>
            </div>

            <MovieList movies={movies} selectedMovie={selectedMovie} />
        </main>
    );
}

export default HomePage;