function DeleteMovieDialog({
    movie,
    onDeleteMovie,
    onCancel,
    deleteStatus,
    deleteError,
}) {
    if (!movie) return null

    function handleDelete() {
        onDeleteMovie(movie.id)
    }

    return (
        <section className="action-panel">
            <div className="action-panel-card action-panel-card--danger">
                <h2 className="action-panel-title">Delete Movie</h2>

                <p className="delete-message">
                    Are you sure you want to delete
                    <span className="delete-movie-name"> {movie.title} </span>?
                </p>

                <div className="action-buttons">
                    <button
                        type="button"
                        className="action-submit action-submit--delete"
                        onClick={handleDelete}
                        disabled={deleteStatus === "loading"}
                    >
                        {deleteStatus === "loading" ? "Deleting..." : "Delete Movie"}
                    </button>

                    <button
                        type="button"
                        className="action-cancel"
                        onClick={onCancel}
                        disabled={deleteStatus === "loading"}
                    >
                        Cancel
                    </button>
                </div>

                {deleteStatus === "success" && (
                    <p className="action-feedback action-feedback--success">
                        Movie deleted successfully.
                    </p>
                )}

                {deleteStatus === "error" && (
                    <p className="action-feedback action-feedback--error">
                        {deleteError || "Failed to delete movie."}
                    </p>
                )}
            </div>
        </section>
    )
}

export default DeleteMovieDialog