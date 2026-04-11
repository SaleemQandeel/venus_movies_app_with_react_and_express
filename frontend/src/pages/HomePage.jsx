import { movies } from "../data/movies"
import MovieList from "../components/MovieList"

function HomePage() {
    const selectedMovie = movies[0]

    return (
        <main className="home-page">
            <div className="movie-strip-wrapper">
                <MovieList movies={movies} selectedMovie={selectedMovie} />
            </div>
        </main>
    )
}

export default HomePage