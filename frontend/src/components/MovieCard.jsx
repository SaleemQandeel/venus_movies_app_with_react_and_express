function MovieCard({ movie, isSelected, onSelect }) {
    return (
        <article
            className={`movie-card ${isSelected ? "active" : ""}`}
            onClick={() => onSelect(movie)}
        >
            <img src={movie.poster} alt={movie.title} />
        </article>
    )
}

export default MovieCard