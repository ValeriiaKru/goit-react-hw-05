import css from './Loader.module.css';
import { Watch } from 'react-loader-spinner';

const Loader = () => {
    return (
        <div className={css.containerLoader}>
            <Watch
            visible={true}
            height="50"
            width="50"
            radius="48"
            color="#F289ED"
            ariaLabel="watch-loading"
            wrapperStyle={{}}
            wrapperClass=""
        />
        </div>

    );
};

export default Loader;