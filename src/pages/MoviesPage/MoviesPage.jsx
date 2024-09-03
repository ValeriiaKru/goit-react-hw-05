import { fetchMovieByQuery } from '../../fetchAPI';
import { useEffect, useState } from 'react';
import toast, { Toaster } from "react-hot-toast";
import { useSearchParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import MovieList from '../../components/MovieList/MovieList';
import css from './MoviesPage.module.css';

const MoviesPage = () => {
    const [foundMovies, setFoundMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("query") ?? "";



    useEffect(() => {
        if (query === '') return;
    async function fetchMovieByQueryData() {
            try {
                setIsError(false);
                setIsLoading(true);
                const data = await fetchMovieByQuery(query);
                if (data.results.length === 0) {
                    toast('Nothing found');
                    return;
                }
                setFoundMovies(data.results);
            } catch (error) {

                setIsError(true);
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchMovieByQueryData();

    }, [query]);


const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const queryValue = form.elements.query.value.trim();
    if (queryValue) {
        setSearchParams({ query: queryValue });
    } else {
        toast('Please enter a search query');
    }
    }


return (
    <div>
            <form onSubmit={handleSubmit} className={css.movieForm}>
                <input className={css.movieFormInput} name="query" type="text" defaultValue={query} placeholder="Search movies..." />
                <button type="submit" className={css.searchButton}>Search</button>
            </form>
            {isError && <ErrorMessage />}
            {isLoading && <Loader />}
            <MovieList movies={foundMovies} />
            <Toaster />
        </div>

);
};


export default MoviesPage;