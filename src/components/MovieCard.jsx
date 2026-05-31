function MovieCard({
  movie,
  toggleFavorite,
  isFavorite,
}) {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750";

  return (
    <div className="movie-card">
      <img src={imageUrl} alt={movie.title}loading="lazy"/>
      <h3>{movie.title}</h3>
      <p> {movie.release_date?.split("-")[0]}</p>
      <p>⭐ {movie.vote_average}</p>
      <button onClick={() => toggleFavorite(movie) }> {isFavorite ? "❤️" : "🤍"} </button>
    </div>
  );
}
export default MovieCard;