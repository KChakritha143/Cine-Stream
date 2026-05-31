function Favorites({ favorites }) {
  return (
    <div className="container">
      <h1>❤️ My Favorites</h1>
      <div className="movie-grid">
        {favorites.map((movie) => {
          const imageUrl = movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://via.placeholder.com/500x750";
          return (
            <div className="movie-card" key={movie.id} >
              <img src={imageUrl} alt={movie.title}/>
              <h3>{movie.title}</h3>
              <p> {movie.release_date?.split("-")[0]} </p>
              <p> ⭐ {movie.vote_average} </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Favorites;