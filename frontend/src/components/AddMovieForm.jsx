import { useState } from "react"

function AddMovieForm({ onAddMovie, addStatus, addError }) {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        year: "",
    })

    function handleChange(e) {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()

        const trimmedTitle = formData.title.trim()
        const trimmedDescription = formData.description.trim()
        const trimmedYear = formData.year.trim()

        onAddMovie({
            title: trimmedTitle,
            description: trimmedDescription,
            year: Number(trimmedYear),
        })

        if (addStatus !== "loading") {
            setFormData({
                title: "",
                description: "",
                year: "",
            })
        }
    }

    return (
        <section className="add-movie-section">
            <h2 className="add-movie-title">Add New Movie</h2>

            <form className="add-movie-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Movie title"
                    value={formData.title}
                    onChange={handleChange}
                    className="add-movie-input"
                    required
                />

                <textarea
                    name="description"
                    placeholder="Movie description"
                    value={formData.description}
                    onChange={handleChange}
                    className="add-movie-textarea"
                    required
                />

                <input
                    type="number"
                    name="year"
                    placeholder="Year"
                    value={formData.year}
                    onChange={handleChange}
                    className="add-movie-input"
                    required
                />

                <button
                    type="submit"
                    className="add-movie-button"
                    disabled={addStatus === "loading"}
                >
                    {addStatus === "loading" ? "Adding..." : "Add Movie"}
                </button>
            </form>

            {addStatus === "success" && (
                <p className="add-movie-feedback add-movie-feedback--success">
                    Movie added successfully.
                </p>
            )}

            {addStatus === "error" && (
                <p className="add-movie-feedback add-movie-feedback--error">
                    {addError || "Failed to add movie."}
                </p>
            )}
        </section>
    )
}

export default AddMovieForm