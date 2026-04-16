import { useEffect, useState } from "react"

function EditMovieForm({ movie, onUpdateMovie, onCancel, updateStatus, updateError }) {
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
        <section className="action-panel">
            <div className="action-panel-card">
                <h2 className="action-panel-title">Edit Selected Movie</h2>

                <form className="action-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="title"
                        placeholder="Movie title"
                        value={formData.title}
                        onChange={handleChange}
                        className="action-input"
                        required
                    />

                    <textarea
                        name="description"
                        placeholder="Movie description"
                        value={formData.description}
                        onChange={handleChange}
                        className="action-textarea"
                        required
                    />

                    <input
                        type="number"
                        name="year"
                        placeholder="Year"
                        value={formData.year}
                        onChange={handleChange}
                        className="action-input"
                        required
                    />

                    <div className="action-buttons">
                        <button
                            type="submit"
                            className="action-submit action-submit--edit"
                            disabled={updateStatus === "loading"}
                        >
                            {updateStatus === "loading" ? "Updating..." : "Update Movie"}
                        </button>

                        <button
                            type="button"
                            className="action-cancel"
                            onClick={onCancel}
                            disabled={updateStatus === "loading"}
                        >
                            Cancel
                        </button>
                    </div>
                </form>

                {updateStatus === "success" && (
                    <p className="action-feedback action-feedback--success">
                        Movie updated successfully.
                    </p>
                )}

                {updateStatus === "error" && (
                    <p className="action-feedback action-feedback--error">
                        {updateError || "Failed to update movie."}
                    </p>
                )}
            </div>
        </section>
    )
}

export default EditMovieForm