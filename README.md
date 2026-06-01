# CineStream

CineStream is a modern movie discovery web application built with React and Vite. It allows users to browse popular movies, search for movies, save favorites, and experience seamless infinite scrolling powered by The Movie Database (TMDB) API.

---

## Features

### Phase 1 Features

* Browse Popular Movies from TMDB API
* Search Movies by Title
* Responsive Movie Grid Layout
* Movie Posters, Ratings, and Release Years
* Modern and Responsive UI

### Phase 2 Features

* Infinite Scroll using Intersection Observer API
* Debounced Search (500ms delay)
* Add/Remove Favorites
* Favorites Persistence using Local Storage
* Dedicated Favorites Page
* Lazy Loading Images for Performance Optimization

---

## Tech Stack

### Frontend

* React
* Vite
* React Router DOM
* React Icons

### API

* TMDB (The Movie Database) API

### Browser APIs

* Intersection Observer API
* Local Storage API

---

## Project Structure

```text
cine-stream/
│
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── MovieCard.jsx
│   │   ├── SearchBar.jsx
│   │   └── Loader.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   └── Favorites.jsx
│   │
│   ├── services/
│   │   └── tmdb.js
│   │
│   ├── hooks/
│   │   └── useDebounce.js
│   │
│   ├── context/
│   │   └── FavoritesContext.jsx
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── .env
├── README.md
└── Prompts.md
```

---

## Installation

### Clone Repository

```bash
git clone <your-repository-url>
cd cine-stream
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file in the root directory:

```env
VITE_TMDB_API_KEY=YOUR_TMDB_API_KEY
```

### Start Development Server

```bash
npm run dev
```

---

## TMDB API Setup

1. Create a TMDB account.
2. Generate an API Key.
3. Add the key to the `.env` file.
4. Restart the development server.

---

## Performance Optimizations

### Infinite Scroll

Implemented using the native Intersection Observer API to dynamically load additional movie pages when the user reaches the bottom of the page.

### Debounced Search

Search requests are delayed by 500 milliseconds to prevent excessive API calls while typing.

### Lazy Loading

Movie poster images use native browser lazy loading to improve page performance and reduce bandwidth consumption.

---

## Favorites System

Users can:

* Add movies to favorites
* Remove movies from favorites
* Persist favorites across page refreshes
* Access favorites through a dedicated Favorites page

Favorites are stored using Local Storage.

---

## Screenshots

### Home Page
<img width="1919" height="1132" alt="Screenshot 2026-05-31 194928" src="https://github.com/user-attachments/assets/e0af30d1-450f-4bbe-9e37-0cb415771dcd" />

### Search Functionality
<img width="1919" height="1026" alt="Screenshot 2026-06-01 131536" src="https://github.com/user-attachments/assets/70d8da7a-5846-4e62-a75e-8f82f6523053" />

### Favorites Page
<img width="1918" height="1117" alt="Screenshot 2026-05-31 195149" src="https://github.com/user-attachments/assets/95b38331-603f-409c-8f4f-aa508997add2" />

### Infinite loop
<img width="1919" height="1130" alt="Screenshot 2026-05-31 195637" src="https://github.com/user-attachments/assets/be76b307-343d-4495-96de-8742712a48fd" />

---

## Live URL
https://cine-stream-seven-gold.vercel.app/

## Future Improvements

* AI Mood-Based Movie Recommendations
* Movie Details Page
* Genre Filtering
* Dark/Light Theme Toggle
* Watchlist Feature
* User Authentication

---

