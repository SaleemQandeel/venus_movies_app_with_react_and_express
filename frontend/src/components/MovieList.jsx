import MovieCard from "./MovieCard";

function MovieList({ movies, selectedMovie }) {
    return (
        <section className="movie-list-section">
            <div className="movie-list">
                {movies.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                        isSelected={movie.id === selectedMovie.id}
                    />
                ))}
            </div>
        </section>
    );
}

export default MovieList;