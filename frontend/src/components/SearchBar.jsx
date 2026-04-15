import { useState } from "react"

function SearchBar({ onSearch }) {
    const [query, setQuery] = useState("")

    function handleKeyDown(e) {
        if (e.key !== "Enter") return

        const trimmedQuery = query.trim()
        onSearch(trimmedQuery)
    }

    function handleChange(e) {
        const val = e.target.value
        setQuery(val)
        if (val === "") onSearch("")
    }

    return (
        <div className="search-bar">
            <svg className="search-icon" viewBox="0 0 20 20" fill="none">
                <circle cx="9" cy="9" r="6" stroke="white" strokeWidth="1.5" />
                <line x1="13.5" y1="13.5" x2="18" y2="18" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
                className="search-input"
                type="text"
                placeholder="Search..."
                value={query}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
        </div>
    )
}

export default SearchBar