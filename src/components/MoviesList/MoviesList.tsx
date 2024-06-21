import {FC, useEffect} from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {movieActions} from "../../redux";
import {Loader} from "../Loader/Loader";
import {MoviesListCard} from "../MoviesListCard/MoviesListCard";
import {Pagination} from "../Pagination/Pagination";
import styles from './moviesList.module.css';

interface IProps {

}

const MoviesList: FC<IProps> = () => {
    const {movies, total_pages, prev, next, loading} = useAppSelector(state => state.movies);


    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [query, setQuery] = useSearchParams({page: '1'});
    const currentPage = query.get('page') ? parseInt(query.get('page') as string, 10) : 1;


    useEffect(() => {
        const page = query.get('page') || '1';
        dispatch(movieActions.getAll({page: Number(page)}))
    }, [dispatch, query])

    useEffect(() => {
        dispatch(movieActions.getGenres())
    }, [dispatch])

    const handlePageChange = (selectedPage: number) => {
        navigate(`/movies?page=${selectedPage}`)
    }

    return (
        <div className={styles.container}>

            <button className="btn btn-dark" id={styles.button} disabled={!prev}
                    onClick={() => setQuery(query => ({page: String(Number(query.get('page') || '1') - 1)}))}>
                <span></span> <span></span> <span></span> <span></span>Prev
            </button>

            <div className={styles.moviesContainer}>
                <div className={styles.movies}>
                    {movies.map(movie => <MoviesListCard key={movie.id} movie={movie}/>)}
                </div>

                    {loading && <Loader/>}

                <div>
                    {total_pages !== null && total_pages > 1 && (

                        <Pagination
                            pageCount={total_pages || 1}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                            isFirstPage={currentPage === 1}
                            isLastPage={currentPage === total_pages}
                        />)}
                </div>

            </div>

            <button
                className="btn btn-dark" id={styles.button} disabled={next === (total_pages || 0) + 1}
                onClick={() => setQuery(query => ({page: String(Number(query.get('page') || '1') + 1)}))}>
                <span></span> <span></span> <span></span> <span></span>Next
            </button>

        </div>
    );
};

export {MoviesList};