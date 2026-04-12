import MovieCard from "./MovieCard"

function MovieList({ movies, selectedMovie, onSelectMovie }) {
    return (
        <section className="carousel-wrapper">
            <div className="movie-list">
                {movies.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                        isSelected={movie.id === selectedMovie.id}
                        onSelect={onSelectMovie}
                    />
                ))}
            </div>
        </section>
    )
}

export default MovieList