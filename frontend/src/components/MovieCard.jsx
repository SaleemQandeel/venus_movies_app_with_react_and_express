function MovieCard({ movie, isSelected }) {
    return (
        <div className={`movie-card ${isSelected ? "selected" : ""}`}>
            <img src={movie.poster} alt={movie.title} className="movie-poster" />

            <div className="movie-info">
                <h3 className="movie-title">{movie.title}</h3>
                <p className="movie-meta">
                    {movie.year} • {movie.genre}
                </p>
            </div>
        </div>
    );
}

export default MovieCard;