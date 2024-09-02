import { Link, useLocation } from 'react-router-dom';
import css from './MovieCard.module.css';

const MovieCard = ({ movie }) => {
  const location = useLocation();

  if (!movie) {
    return <div>No movie data available</div>;
  }

  return (
    <Link
      className={css.movieCard}
      to={`/movies/${movie.id}`}
      state={{ from: location }}
    >
      <div className={css.imgContainer}>
        <img
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          alt={movie.title}
        />
      </div>
      <h3 className={css.title}>{movie.title}</h3>
    </Link>
  );
};

export default MovieCard;