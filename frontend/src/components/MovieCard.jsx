function MovieCard({ movie, isSelected, onSelect, onHover }) {
    return (
        <article
            className={`movie-card ${isSelected ? "active" : ""}`}
            onClick={() => onSelect(movie)}
            onMouseEnter={() => onHover(movie)}
            onMouseLeave={() => onHover(null)}
        >
            <img src={movie.poster} alt={movie.title} />
        </article>
    )
}

export default MovieCard