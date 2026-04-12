import MovieCard from "./MovieCard"

function MovieList({
    movies,
    selectedMovie,
    onSelectMovie,
    onHoverMovie,
    listRef,
    onScrollLeft,
    onScrollRight,
}) {
    return (
        <section className="carousel-wrapper">
            <div className="carousel-controls">
                <button className="carousel-btn" onClick={onScrollLeft}>
                    &#8249;
                </button>
                <button className="carousel-btn" onClick={onScrollRight}>
                    &#8250;
                </button>
            </div>

            <div className="movie-list" ref={listRef}>
                {movies.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                        isSelected={movie.id === selectedMovie.id}
                        onSelect={onSelectMovie}
                        onHover={onHoverMovie}
                    />
                ))}
            </div>
        </section>
    )
}

export default MovieList