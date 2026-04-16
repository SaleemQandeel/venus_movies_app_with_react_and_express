# 🎬 Movie Browser Web App

A full-stack web application for browsing, searching, and managing movies with full CRUD operations.

---

##  Team Members

| Name | Role |
|------|------|
| Maha Humaid | Frontend Developer |
| Saleem Qandeel | Backend Developer |

---

## 📌 Project Overview

Built with **React** (Frontend) and **Express.js** (Backend), this application allows users to browse a movie carousel, view details, search, add, edit, and delete movies — with automatic poster fetching.

---

## ✨ Features

- 🎠 Browse movies in a horizontal carousel
- 🔍 Search movies by title
- 📄 View detailed movie info with dynamic background
- ➕ Add new movies
- ✏️ Edit existing movies
- 🗑️ Delete movies
- 🖼️ Automatically fetch poster images via IMDb ID

---

## ⚙️ Getting Started

### Backend

```bash
cd Backend
npm install
npm start
```
> Backend runs at: `http://localhost:3000`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

> Frontend runs at: `http://localhost:3001`

---

##  API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/movies` | Get all movies |
| `GET` | `/movies?search=batman` | Search movies by title |
| `GET` | `/movies?limit=10` | Limit number of results |
| `GET` | `/movies/:id` | Get movie by ID |
| `POST` | `/movies` | Add a new movie |
| `PATCH` | `/movies/:id` | Update a movie |
| `DELETE` | `/movies` | Delete a movie |

---

##  Issues & Responsibilities

### Frontend — Maha Humaid

| Issue | Description |
|-------|-------------|
| #1 | Setup React App |
| #10 | Build Movie List (Static) |
| #11 | Selected Movie Details & Background |
| #12 | Dynamic Hover & Click Behavior |
| #13 | Carousel Scrolling |
| #14 | Search UI |

### Backend — Saleem Qandeel

| Issue | Description |
|-------|-------------|
| #2 | Setup Express Server |
| #3 | GET /movies |
| #4 | GET /movies/:id |
| #5 | POST /movies |
| #6 | PATCH /movies/:id |
| #7 | DELETE /movies/:id |
| #8 | Search API |
| #9 | Limit Results |

### Shared — Both

| Issue | Description |
|-------|-------------|
| #15 | Connect Frontend to Backend |
| #16 | Add Movie (Full Flow) |
| #17 | Update Movie (Full Flow) |
| #18 | Delete Movie (Full Flow) |
| #19 | Poster Images Integration |

---

##  Development Stages

1. Backend server setup
2. Backend API implementation
3. Frontend UI implementation
4. UI interaction features
5. Frontend–backend integration
6. CRUD operations
7. Poster enrichment feature

Each issue was developed in its own branch and merged via Pull Request.

---

##  Assumptions

- Each movie is uniquely identified by its `id`
- Poster images may not exist initially and can be fetched later using the movie's IMDb ID
- The frontend handles most user interactions; the backend focuses on data operations

---

##  Known Limitations

- Movie data is stored in a **JSON file**, not a database
- No concurrency protection — simultaneous edits may overwrite each other
- Poster fetching depends on an external API and may fail if unavailable
- Designed for **development use only**, not production scale

---

##  UI Highlights

- Dark cinematic theme
- Horizontal carousel movie browsing
- Interactive hover and click behaviors
- Modal dialogs for Add, Edit, and Delete
- Smooth loading and error state feedback

---

##  Challenges

### Frontend
- Managing hover and selected movie states
- Synchronizing UI with backend API responses
- Handling loading, success, and error states

### Backend
- Implementing JSON file persistence
- Designing API validation logic
- Integrating poster fetching from an external movie API

### Team
- Coordinating frontend–backend integration
- Managing Git branches and pull requests
- Ensuring consistent API response format
###  📸 Screenshots
<img width="975" height="524" alt="image" src="https://github.com/user-attachments/assets/93f1ecef-ef3b-423d-9865-ed217f2228ec" />
<img width="975" height="524" alt="image" src="https://github.com/user-attachments/assets/918bcdf7-607a-4659-a856-cdd9e4577f09" />
<img width="975" height="524" alt="image" src="https://github.com/user-attachments/assets/786c8656-0494-4fd7-a672-096e331bf295" />
<img width="1365" height="737" alt="image" src="https://github.com/user-attachments/assets/dd61c4ef-38cf-4191-8bfb-7a211bf1cd3a" />
<img width="1365" height="731" alt="image" src="https://github.com/user-attachments/assets/362708ca-5739-4053-8ad9-d2c10344ba16" />


