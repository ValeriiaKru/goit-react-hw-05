import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../../fetchAPI';
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import css from './MovieReviews.module.css';

const MovieReviews = () => {
    const { movieId } = useParams();
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        async function getMovieReviewsData() {
            try {
                setIsError(false);
                setIsLoading(true);
                const data = await fetchMovieReviews(movieId);
                setReviews(data.results);
            } catch (error) {
                setIsError(true);
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }
        getMovieReviewsData();
    }, [movieId]);

    return (
        <>
            {isError && <ErrorMessage />}
            {isLoading && <Loader />}
            {reviews.length > 0 ? (
                <ul className={css.reviewList}>
                    {reviews.map((review) => {
                        return (
                            <li key={review.id} className={css.reviewListItem}>
                                <img className={css.reviewImg}
                                    src={review.author_details.avatar_path 
    ? `https://image.tmdb.org/t/p/w200${review.author_details.avatar_path}`
    : 'fallback-image-url'}
                                    alt={review.author}
                                />
                                <div className={css.infoContainer}>
                                    <p className={css.reviewAuthor}>
                                        {review.author}&nbsp;
                                        <span>
                                            (user rating:&nbsp;
                                            {review.author_details.rating ? review.author_details.rating : 'unrated'})

                                        </span>
                                    </p>
                                </div>
                            </li>
                        );
                    })}
                </ul>) : (
                <p className={css.reviewAuthor}>There no results</p>
            )}
        </>
    );
};

export default MovieReviews;