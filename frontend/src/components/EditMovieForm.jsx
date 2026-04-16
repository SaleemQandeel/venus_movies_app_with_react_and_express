import { useEffect, useState } from "react"

function EditMovieForm({ movie, onUpdateMovie, updateStatus, updateError }) {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        year: "",
    })

    useEffect(() => {
        if (!movie) return

        setFormData({
            title: movie.title || "",
            description: movie.description || "",
            year: movie.year || "",
        })
    }, [movie])

    function handleChange(e) {
        const { name, value } = e.target

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()

        if (!movie) return

        const trimmedTitle = formData.title.trim()
        const trimmedDescription = formData.description.trim()
        const trimmedYear = String(formData.year).trim()

        onUpdateMovie(movie.id, {
            title: trimmedTitle,
            description: trimmedDescription,
            year: Number(trimmedYear),
        })
    }

    if (!movie) return null

    return (
        <section className="movie-form-section">
            <h2 className="movie-form-title">Edit Selected Movie</h2>

            <form className="movie-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Movie title"
                    value={formData.title}
                    onChange={handleChange}
                    className="movie-form-input"
                    required
                />

                <textarea
                    name="description"
                    placeholder="Movie description"
                    value={formData.description}
                    onChange={handleChange}
                    className="movie-form-textarea"
                    required
                />

                <input
                    type="number"
                    name="year"
                    placeholder="Year"
                    value={formData.year}
                    onChange={handleChange}
                    className="movie-form-input"
                    required
                />

                <button
                    type="submit"
                    className="movie-form-submit movie-form-submit--edit"
                    disabled={updateStatus === "loading"}
                >
                    {updateStatus === "loading" ? "Updating..." : "Update Movie"}
                </button>
            </form>

            {updateStatus === "success" && (
                <p className="movie-form-feedback movie-form-feedback--success">
                    Movie updated successfully.
                </p>
            )}

            {updateStatus === "error" && (
                <p className="movie-form-feedback movie-form-feedback--error">
                    {updateError || "Failed to update movie."}
                </p>
            )}
        </section>
    )
}

export default EditMovieForm