import { useParams, useLocation, Link, NavLink, Outlet } from "react-router-dom";
import { useRef, useEffect, useState, Suspense } from "react";
import { fetchMovieDetails } from '../../fetchAPI';
import clsx from "clsx";
import Loader from '../../components/Loader/Loader';
import css from './MovieDetailsPage.module.css';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};


const MovieDetailsPage = () => {
    const { movieId } = useParams();
    const location = useLocation();
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const backLinkHref = useRef(location.state?.from ?? "/");

    

      useEffect(() => {
    async function getMovieDetailsData() {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getMovieDetailsData();
  }, [movieId]);
    
  return (
    <main>
      <Link to={backLinkHref.current}>
        <button type="button" className={css.goBackBtn}>Go Back</button>
          </Link>
          {isError && <ErrorMessage />}
      {isLoading && <Loader />}
          <h2 className={css.movieTitle}>{movie.title}</h2>
          <div className={css.movieInfoContainer}>
        <img
          className={css.imgMovieInfo}
              src={movie.poster_path
    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                      : 'fallback-image-url'}
              alt={movie.title}/>
          
          <div className={css.movieInfoContainerText}>
              <h3 className={css.movieInfoTitle}>About {movie.title}</h3>
              <p>{movie.overview}</p>
              <h3 className={css.movieInfoTitle}>Genres</h3>
              <ul>
                  {movie?.genres?.map(({ id, name }) => (
                      <li key={id}>{name}, &nbsp;</li>
                  ))}
              </ul>
              <h3 className={css.movieInfoTitle}>User rating:{movie.vote_average} </h3>
              
          </div>
      </div>
          <ul>
              <li className={css.navLinkItem}>
                  <NavLink to='cast'>
                      Cast
                  </NavLink>
              </li>
              <li className={css.navLinkItem}>
                  <NavLink to='reviews'>
                      Reviews
                  </NavLink>
              </li>

          </ul>
          <Suspense fallback={<Loader />}>
              <Outlet/>
          </Suspense>
    </main>
  );
};

export default MovieDetailsPage;