import { useState } from "react"
import { movies } from "../data/movies"
import SelectedMovieDetails from "../components/SelectedMovieDetails"
import MovieList from "../components/MovieList"

function HomePage() {
    const [selectedMovie, setSelectedMovie] = useState(movies[0])

    return (
        <main className="page">
            <div
                className="background"
                style={{ backgroundImage: `url(${selectedMovie.poster})` }}
            />
            <div className="background-overlay" />

            <div className="top-section">
                <div className="top-badge">
                    <span className="badge-new">NEW</span>
                    <span className="badge-text">MOVIE</span>
                </div>
            </div>

            <div className="middle-content">
                <SelectedMovieDetails movie={selectedMovie} />
            </div>

            <MovieList
                movies={movies}
                selectedMovie={selectedMovie}
                onSelectMovie={setSelectedMovie}
            />
        </main>
    )
}

export default HomePage