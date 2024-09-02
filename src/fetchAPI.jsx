import axios from "axios";

const fetchApi = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMWZkNDQ3NTA4YjQ4YzcxMWNlNGFjNTRjNzRkZDZiNCIsIm5iZiI6MTcyNDk0NDY1My44ODc5NjcsInN1YiI6IjY2ZDA5MDEyMDNiMDFhNTRlMzA1NmI5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cfjTbjHV3JMg5ORzlJo692gGvzsQ-1-zEi9SItVqxdo",
  },
});

export async function fetchTrendingMovies() {
  const { data } = await fetchApi.get("trending/movie/week");
  return data;
}

export async function fetchMovieByQuery(query) {
  const params = {
    query,
  };
  const { data } = await fetchApi.get("search/movie", { params });
  return data;
}

export async function fetchMovieDetails(movie_id) {

  const { data } = await fetchApi.get(`movie/${movie_id}`);
  return data;
}

export async function fetchMovieCredits(movie_id) {

  const { data } = await fetchApi.get(`movie/${movie_id}/credits`);
  return data;
}

export async function fetchMovieReviews(movie_id) {

  const { data } = await fetchApi.get(`movie/${movie_id}/reviews`);
  return data;
}