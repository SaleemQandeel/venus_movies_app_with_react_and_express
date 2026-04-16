import { useEffect, useRef, useState } from "react"
import SelectedMovieDetails from "../components/SelectedMovieDetails"
import MovieList from "../components/MovieList"
import SearchBar from "../components/SearchBar"
import AddMovieForm from "../components/AddMovieForm"
import EditMovieForm from "../components/EditMovieForm"

function mapMovie(movie) {
    let year = movie.year

    if (!year && movie.release_date) {
        const parsed = new Date(movie.release_date)
        year = Number.isNaN(parsed.getFullYear())
            ? movie.release_date.slice(0, 4)
            : parsed.getFullYear()
    }

    const genreValue = Array.isArray(movie.genre)
        ? movie.genre.join(", ")
        : Array.isArray(movie.genres)
            ? movie.genres.join(", ")
            : movie.genre ?? movie.genres ?? "Unknown"

    return {
        id: movie.id,
        title: movie.title,
        rating: movie.rating ?? movie.vote_average ?? 0,
        year,
        genre: genreValue,
        runtime: movie.runtime ?? 0,
        description: movie.description ?? movie.overview ?? "No description available.",
        poster:
            movie.poster
                ? movie.poster
                : movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "https://via.placeholder.com/300x450?text=No+Poster",
    }
}

function HomePage() {
    const [movies, setMovies] = useState([])
    const [selectedMovie, setSelectedMovie] = useState(null)
    const [hoveredMovie, setHoveredMovie] = useState(null)

    const [pageStatus, setPageStatus] = useState("loading")
    const [searchStatus, setSearchStatus] = useState("idle")

    const [activeForm, setActiveForm] = useState(null)

    const [addStatus, setAddStatus] = useState("idle")
    const [addError, setAddError] = useState("")

    const [updateStatus, setUpdateStatus] = useState("idle")
    const [updateError, setUpdateError] = useState("")

    const listRef = useRef(null)

    const displayedMovie = hoveredMovie || selectedMovie

    function scrollLeft() {
        if (!listRef.current) return
        listRef.current.scrollBy({ left: -400, behavior: "smooth" })
    }

    function scrollRight() {
        if (!listRef.current) return
        listRef.current.scrollBy({ left: 400, behavior: "smooth" })
    }

    async function loadMovies(query = "") {
        const url = query.trim()
            ? `/movies?search=${encodeURIComponent(query)}`
            : "/movies"

        const response = await fetch(url)

        if (!response.ok) {
            throw new Error("Failed to fetch")
        }

        const result = await response.json()
        return (result.data || []).map(mapMovie)
    }

    async function handleAddMovie(newMovieData) {
        setAddStatus("loading")
        setAddError("")

        try {
            const response = await fetch("/movies", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newMovieData),
            })

            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.error || "Failed to add movie")
            }

            const mappedMovie = mapMovie(result)

            setMovies((prev) => [mappedMovie, ...prev])
            setSelectedMovie(mappedMovie)
            setHoveredMovie(null)
            setAddStatus("success")

            setTimeout(() => {
                setActiveForm(null)
                setAddStatus("idle")
            }, 2000)
        } catch (error) {
            setAddStatus("error")
            setAddError(error.message)
        }
    }

    async function handleUpdateMovie(movieId, updatedMovieData) {
        setUpdateStatus("loading")
        setUpdateError("")

        try {
            const response = await fetch(`/movies/${movieId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedMovieData),
            })

            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.error || "Failed to update movie")
            }

            const mappedMovie = mapMovie(result)

            setMovies((prev) =>
                prev.map((movie) => (movie.id === movieId ? mappedMovie : movie))
            )

            setSelectedMovie(mappedMovie)

            if (hoveredMovie && hoveredMovie.id === movieId) {
                setHoveredMovie(mappedMovie)
            }

            setUpdateStatus("success")

            setTimeout(() => {
                setActiveForm(null)
                setUpdateStatus("idle")
            }, 2000)
        } catch (error) {
            setUpdateStatus("error")
            setUpdateError(error.message)
        }
    }

    useEffect(() => {
        setPageStatus("loading")

        loadMovies()
            .then((list) => {
                setMovies(list)
                setSelectedMovie(list[0] || null)
                setPageStatus("idle")
            })
            .catch(() => {
                setPageStatus("error")
            })
    }, [])

    function handleSearch(query) {
        if (query === "") {
            setSearchStatus("loading")

            loadMovies()
                .then((list) => {
                    setMovies(list)
                    setSelectedMovie(list[0] || null)
                    setHoveredMovie(null)
                    setSearchStatus("idle")
                })
                .catch(() => setSearchStatus("error"))

            return
        }

        setSearchStatus("loading")

        loadMovies(query)
            .then((list) => {
                if (list.length === 0) {
                    setMovies([])
                    setSelectedMovie(null)
                    setHoveredMovie(null)
                    setSearchStatus("empty")
                } else {
                    setMovies(list)
                    setSelectedMovie(list[0])
                    setHoveredMovie(null)
                    setSearchStatus("idle")
                }
            })
            .catch(() => setSearchStatus("error"))
    }

    function toggleAddForm() {
        setAddStatus("idle")
        setAddError("")
        setUpdateStatus("idle")
        setUpdateError("")
        setActiveForm((prev) => (prev === "add" ? null : "add"))
    }

    function toggleEditForm() {
        if (!selectedMovie) return

        setUpdateStatus("idle")
        setUpdateError("")
        setAddStatus("idle")
        setAddError("")
        setActiveForm((prev) => (prev === "edit" ? null : "edit"))
    }

    if (pageStatus === "loading") {
        return (
            <main className="page">
                <div className="page-feedback">Loading movies...</div>
            </main>
        )
    }

    if (pageStatus === "error") {
        return (
            <main className="page">
                <div className="page-feedback page-feedback--error">
                    Failed to load movies. Make sure the backend is running.
                </div>
            </main>
        )
    }

    return (
        <main className="page">
            <div
                className="background"
                style={{
                    backgroundImage: displayedMovie
                        ? `url(${displayedMovie.poster})`
                        : "none",
                }}
            />
            <div className="background-overlay" />

            <div className="top-section">
                <div className="top-badge">
                    <span className="badge-new">NEW</span>
                    <span className="badge-text">MOVIE</span>
                </div>

                <div className="top-actions">
                    <SearchBar onSearch={handleSearch} />

                    <button
                        type="button"
                        className={`top-action-button ${activeForm === "add" ? "top-action-button--active" : ""}`}
                        onClick={toggleAddForm}
                    >
                        {activeForm === "add" ? "Close Add" : "Add Movie"}
                    </button>
                </div>
            </div>

            <div className="middle-content">
                <div className="hero-block">
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

                    {searchStatus === "idle" && displayedMovie && (
                        <>
                            <SelectedMovieDetails movie={displayedMovie} />

                            <div className="details-actions">
                                <button
                                    type="button"
                                    className={`details-action-button ${activeForm === "edit" ? "details-action-button--active" : ""}`}
                                    onClick={toggleEditForm}
                                    disabled={!selectedMovie}
                                >
                                    {activeForm === "edit" ? "Close Edit" : "Edit Movie"}
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {activeForm === "add" && (
                <AddMovieForm
                    onAddMovie={handleAddMovie}
                    addStatus={addStatus}
                    addError={addError}
                />
            )}

            {activeForm === "edit" && selectedMovie && (
                <EditMovieForm
                    movie={selectedMovie}
                    onUpdateMovie={handleUpdateMovie}
                    updateStatus={updateStatus}
                    updateError={updateError}
                />
            )}

            {searchStatus !== "loading" && movies.length > 0 && selectedMovie && (
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