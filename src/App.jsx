import { useEffect, useState, useRef } from "react";
import {BrowserRouter, Routes, Route, Link,} from "react-router-dom";
import MovieCard from "./components/MovieCard";
import SearchBar from "./components/SearchBar";
import Favorites from "./pages/Favorites";
import { getPopularMovies, searchMovies,} from "./services/tmdb";
import { FaHome, FaHeart } from "react-icons/fa";
function App() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const observerRef = useRef();
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });
  const loadMovies = async (pageNumber) => {
    try {
      const data = await getPopularMovies(pageNumber);
      setMovies((prev) => [
        ...prev,
        ...data.results,
      ]);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    loadMovies(page);
  }, [page]);
  useEffect(() => {
    localStorage.setItem(
      "favorites",
      JSON.stringify(favorites)
    );
  }, [favorites]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      {
        threshold: 1,
      }
    );
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
    return () => observer.disconnect();
  }, []);
  const handleSearch = async (query) => {
    if (!query.trim()) return;
    try {
      const data = await searchMovies(query);
      setMovies(data.results);
    } catch (error) {
      console.error(error);
    }
  };
  const toggleFavorite = (movie) => {
    const exists = favorites.find(
      (fav) => fav.id === movie.id
    );
    if (exists) {
      setFavorites(
        favorites.filter(
          (fav) => fav.id !== movie.id
        )
      );
    } else {
      setFavorites([...favorites, movie]);
    }
  };
  return (
    <BrowserRouter>
      <div className="container">
        <nav className="navbar">
          <div className="nav-left">
            <Link to="/"><FaHome /> Home</Link>
            <Link to="/favorites"><FaHeart />Favorites ({favorites.length})</Link>
          </div>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1>🎬 CineStream</h1>
                <SearchBar onSearch={handleSearch}/>
                <div className="movie-grid">
                  {movies.map((movie) => (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      toggleFavorite={
                        toggleFavorite
                      }
                      isFavorite={favorites.some(
                        (fav) =>
                          fav.id === movie.id
                      )}
                    />
                  ))}
                </div>
                <div ref={observerRef} style={{ height: "20px", }}></div>
              </>
            }
          />
          <Route
            path="/favorites"
            element={
              <Favorites favorites={favorites} />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;