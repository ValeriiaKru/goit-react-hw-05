import css from './ErrorMessage.module.css';

const ErrorMessage = () => {
    return (
        <p className={css.errorMessage}>Something went wrong. Please try later!</p>
    );
};

export default ErrorMessage;