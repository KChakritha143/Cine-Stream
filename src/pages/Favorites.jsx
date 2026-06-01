import MovieCard from "../components/MovieCard";

function Favorites({ favorites }) {
  return (
    <>
      <h1 className="app-title">
        ❤️ My Favorites
      </h1>

      <div className="movie-grid">
        {favorites.length === 0 ? (
          <h2>No favorite movies yet</h2>
        ) : (
          favorites.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isFavorite={true}
              toggleFavorite={() => {}}
            />
          ))
        )}
      </div>
    </>
  );
}

export default Favorites;