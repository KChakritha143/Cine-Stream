function MovieCard({
  movie,
  toggleFavorite,
  isFavorite,
}) {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Poster";

  return (
    <div className="movie-card">
      <img
        src={imageUrl}
        alt={movie.title}
        loading="lazy"
      />

      <h3>{movie.title}</h3>

      <p>
        {movie.release_date
          ? movie.release_date.split("-")[0]
          : "N/A"}
      </p>

      <p>
        ⭐ {movie.vote_average?.toFixed(1) || "N/A"}
      </p>

      <button className="favorite-btn" onClick={() => toggleFavorite(movie)}>{isFavorite ? "❤️" : "🤍"}</button>
    </div>
  );
}

export default MovieCard;