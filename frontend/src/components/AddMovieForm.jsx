import { useEffect, useState } from "react"

function AddMovieForm({ onAddMovie, onCancel, addStatus, addError }) {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        year: "",
    })

    useEffect(() => {
        if (addStatus === "success") {
            setFormData({
                title: "",
                description: "",
                year: "",
            })
        }
    }, [addStatus])

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
        const trimmedYear = String(formData.year).trim()

        onAddMovie({
            title: trimmedTitle,
            description: trimmedDescription,
            year: Number(trimmedYear),
        })
    }

    return (
        <section className="action-panel">
            <div className="action-panel-card">
                <h2 className="action-panel-title">Add New Movie</h2>

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
                            className="action-submit action-submit--add"
                            disabled={addStatus === "loading"}
                        >
                            {addStatus === "loading" ? "Adding..." : "Add Movie"}
                        </button>

                        <button
                            type="button"
                            className="action-cancel"
                            onClick={onCancel}
                            disabled={addStatus === "loading"}
                        >
                            Cancel
                        </button>
                    </div>
                </form>

                {addStatus === "success" && (
                    <p className="action-feedback action-feedback--success">
                        Movie added successfully.
                    </p>
                )}

                {addStatus === "error" && (
                    <p className="action-feedback action-feedback--error">
                        {addError || "Failed to add movie."}
                    </p>
                )}
            </div>
        </section>
    )
}

export default AddMovieForm