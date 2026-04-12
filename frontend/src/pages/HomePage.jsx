import { useState } from "react"
import { movies } from "../data/movies"
import SelectedMovieDetails from "../components/SelectedMovieDetails"
import MovieList from "../components/MovieList"

function HomePage() {
    const [selectedMovie, setSelectedMovie] = useState(movies[0])
    const [hoveredMovie, setHoveredMovie] = useState(null)

    const displayedMovie = hoveredMovie || selectedMovie

    return (
        <main className="page">
            <div
                className="background"
                style={{ backgroundImage: `url(${displayedMovie.poster})` }}
            />
            <div className="background-overlay" />

            <div className="top-section">
                <div className="top-badge">
                    <span className="badge-new">NEW</span>
                    <span className="badge-text">MOVIE</span>
                </div>
            </div>

            <div className="middle-content">
                <SelectedMovieDetails movie={displayedMovie} />
            </div>

            <MovieList
                movies={movies}
                selectedMovie={selectedMovie}
                onSelectMovie={setSelectedMovie}
                onHoverMovie={setHoveredMovie}
            />
        </main>
    )
}

export default HomePage