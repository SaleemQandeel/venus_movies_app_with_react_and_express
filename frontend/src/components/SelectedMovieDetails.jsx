function SelectedMovieDetails({ movie }) {
    if (!movie) return null

    const runtime = Number(movie.runtime) || 0
    const hours = Math.floor(runtime / 60)
    const minutes = runtime % 60

    let duration = "Unknown duration"

    if (runtime > 0) {
        const hourLabel = hours === 1 ? "hour" : "hours"
        const minuteLabel = minutes === 1 ? "minute" : "minutes"
        duration = `${hours} ${hourLabel} ${minutes} ${minuteLabel}`
    }

    return (
        <div className="hero-content">
            <h1 className="movie-title">{movie.title}</h1>

            <div className="movie-meta">
                <span className="imdb-badge">IMDb</span>
                <span className="meta-rating">{movie.rating}</span>
                <span className="meta-dot">•</span>
                <span className="meta-muted">{movie.year}</span>
                <span className="meta-dot">|</span>
                <span className="meta-muted">{duration}</span>
                <span className="meta-dot">|</span>
                <span className="meta-muted">{movie.genre}</span>
            </div>

            <p className="movie-description">{movie.description}</p>
        </div>
    )
}

export default SelectedMovieDetails