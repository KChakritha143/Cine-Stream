
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
console.log("API KEY =", API_KEY);
const BASE_URL =
  "https://api.themoviedb.org/3";

export const getPopularMovies = async (
  page = 1
) => {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`
  );

  const data = await response.json();

  return data;
};

export const searchMovies = async (
  query,
  page = 1
) => {
  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`
  );

  return res.json();
};