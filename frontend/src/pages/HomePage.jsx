import { useState, useRef } from "react"
import { movies } from "../data/movies"
import SelectedMovieDetails from "../components/SelectedMovieDetails"
import MovieList from "../components/MovieList"

function HomePage() {
    const [selectedMovie, setSelectedMovie] = useState(movies[0])
    const [hoveredMovie, setHoveredMovie] = useState(null)
    const listRef = useRef(null)

    const displayedMovie = hoveredMovie || selectedMovie

    function scrollLeft() {
        listRef.current.scrollBy({ left: -400, behavior: "smooth" })
    }

    function scrollRight() {
        listRef.current.scrollBy({ left: 400, behavior: "smooth" })
    }

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
                listRef={listRef}
                onScrollLeft={scrollLeft}
                onScrollRight={scrollRight}
            />
        </main>
    )
}

export default HomePage