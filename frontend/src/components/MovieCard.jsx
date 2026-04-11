function MovieCard({ movie, isSelected }) {
    return (
        <article className={`movie-card ${isSelected ? "active" : ""}`}>
            <img src={movie.poster} alt={movie.title} />
        </article>
    )
}

export default MovieCard