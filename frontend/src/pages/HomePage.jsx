import { useState, useRef } from "react"
import { movies as allMovies } from "../data/movies"
import SelectedMovieDetails from "../components/SelectedMovieDetails"
import MovieList from "../components/MovieList"
import SearchBar from "../components/SearchBar"

function HomePage() {
    const [selectedMovie, setSelectedMovie] = useState(allMovies[0])
    const [hoveredMovie, setHoveredMovie] = useState(null)
    const [movies, setMovies] = useState(allMovies)
    const [searchStatus, setSearchStatus] = useState("idle")
    const listRef = useRef(null)

    const displayedMovie = hoveredMovie || selectedMovie

    function scrollLeft() {
        listRef.current.scrollBy({ left: -400, behavior: "smooth" })
    }

    function scrollRight() {
        listRef.current.scrollBy({ left: 400, behavior: "smooth" })
    }

    function handleSearch(query) {
        if (query === "") {
            setMovies(allMovies)
            setSearchStatus("idle")
            setSelectedMovie(allMovies[0])
            setHoveredMovie(null)
            return
        }

        setSearchStatus("loading")

        setTimeout(() => {
            try {
                const results = allMovies.filter(m =>
                    m.title.toLowerCase().includes(query.toLowerCase())
                )
                if (results.length === 0) {
                    setSearchStatus("empty")
                    setMovies([])
                } else {
                    setSearchStatus("idle")
                    setMovies(results)
                    setSelectedMovie(results[0])
                    setHoveredMovie(null)
                }
            } catch {
                setSearchStatus("error")
            }
        }, 400)
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
                <SearchBar onSearch={handleSearch} />
            </div>

            <div className="middle-content">
                {searchStatus === "loading" && (
                    <div className="search-feedback">Searching...</div>
                )}
                {searchStatus === "error" && (
                    <div className="search-feedback search-feedback--error">
                        Something went wrong. Please try again.
                    </div>
                )}
                {searchStatus === "empty" && (
                    <div className="search-feedback search-feedback--empty">
                        No movies found.
                    </div>
                )}
                {searchStatus === "idle" && (
                    <SelectedMovieDetails movie={displayedMovie} />
                )}
            </div>

            {searchStatus !== "loading" && movies.length > 0 && (
                <MovieList
                    movies={movies}
                    selectedMovie={selectedMovie}
                    onSelectMovie={setSelectedMovie}
                    onHoverMovie={setHoveredMovie}
                    listRef={listRef}
                    onScrollLeft={scrollLeft}
                    onScrollRight={scrollRight}
                />
            )}
        </main>
    )
}

export default HomePage