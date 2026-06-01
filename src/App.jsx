import { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { FaHome, FaHeart } from "react-icons/fa";

import MovieCard from "./components/MovieCard";
import SearchBar from "./components/SearchBar";
import Favorites from "./pages/Favorites";

import {
  getPopularMovies,
  searchMovies,
} from "./services/tmdb";

import useDebounce from "./hooks/useDebounce";

function App() {
  const [movies, setMovies] = useState([]);

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const [searchTerm, setSearchTerm] =
    useState("");

  const debouncedSearch =
    useDebounce(searchTerm, 500);

  const [page, setPage] = useState(1);

  const [loading, setLoading] =
    useState(false);

  const [isSearching, setIsSearching] =
    useState(false);

  const observerRef = useRef(null);

  const loadMovies = async () => {
  try {
    setLoading(true);

    const data = await getPopularMovies();

    console.log("Movies received:", data);

    setMovies(data);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    localStorage.setItem(
      "favorites",
      JSON.stringify(favorites)
    );
  }, [favorites]);

  useEffect(() => {
    if (isSearching) return;

    loadMovies(page);
  }, [page, isSearching]);

  useEffect(() => {
    const fetchSearch = async () => {
      if (!debouncedSearch.trim()) {
        setMovies([]);
        setPage(1);
        setIsSearching(false);
        return;
      }

      try {
        setIsSearching(true);

        const data =
          await searchMovies(
            debouncedSearch
          );

        setMovies(data.results || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSearch();
  }, [debouncedSearch]);

  useEffect(() => {
    const observer =
      new IntersectionObserver(
        (entries) => {
          if (
            entries[0].isIntersecting &&
            !loading &&
            !isSearching &&
            movies.length > 0
          ) {
            setPage((prev) => prev + 1);
          }
        },
        {
          threshold: 0.1,
        }
      );

    const current = observerRef.current;

    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [loading, isSearching, movies]);

  const toggleFavorite = (movie) => {
    const exists = favorites.some(
      (fav) => fav.id === movie.id
    );

    if (exists) {
      setFavorites((prev) =>
        prev.filter(
          (fav) => fav.id !== movie.id
        )
      );
    } else {
      setFavorites((prev) => [
        ...prev,
        movie,
      ]);
    }
  };

  return (
    <BrowserRouter>
      <div className="container">
        <nav className="navbar">
          <div className="nav-links">
            <Link to="/">
              <FaHome />
              Home
            </Link>

            <Link to="/favorites">
              <FaHeart />
              Favorites (
              {favorites.length})
            </Link>
          </div>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1 className="app-title">
                  🎬 CineStream
                </h1>

                <SearchBar
                  searchTerm={searchTerm}
                  setSearchTerm={
                    setSearchTerm
                  }
                />

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

                {loading && (
                  <h3
                    style={{
                      textAlign: "center",
                    }}
                  >
                    Loading...
                  </h3>
                )}

                {!isSearching && (
                  <div
                    ref={observerRef}
                    style={{
                      height: "50px",
                    }}
                  />
                )}
              </>
            }
          />

          <Route
            path="/favorites"
            element={
              <Favorites
                favorites={favorites}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;