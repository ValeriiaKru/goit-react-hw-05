import { useState, useEffect } from "react";
import {fetchTrendingMovies} from '../../fetchAPI'
import MovieList from "../../components/MovieList/MovieList";
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loader from '../../components/Loader/Loader';
import css from './HomePage.module.css';

const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        async function getAllMovies() {
            try {
                setIsLoading(false);
                setIsError(false);
                const data = await fetchTrendingMovies();
                setMovies(data.results);
            } catch (error) {
                setIsError(true);
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }
        getAllMovies();
    }, []);
    
    return (
        <div>
            {isError && <ErrorMessage />}
            <h1 className={css.textTitle}>Top picks</h1>
            {isLoading && <Loader />}
            <MovieList movies={movies} />
        </div>
    );
};

export default HomePage;