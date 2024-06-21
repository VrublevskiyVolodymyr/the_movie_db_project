import {FC, useEffect} from 'react';
import {useNavigate, useParams, useSearchParams} from "react-router-dom";

import {Loader} from "../Loader/Loader";
import {MoviesListCard} from "../MoviesListCard/MoviesListCard";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {movieActions} from "../../redux";
import {Pagination} from "../Pagination/Pagination";
import styles from './search.module.css';

interface IProps {

}

const Search: FC<IProps> = () => {
    const {title} = useParams<{ title: string }>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {searchMovie, total_pages, prev, next, loading} = useAppSelector(state => state.movies);
    const [query, setQuery] = useSearchParams({page: '1'});
    const page = query.get('page') || '1';
    const currentPage = query.get('page') ? parseInt(query.get('page') as string, 10) : 1;


    useEffect(() => {
        if (title) {
            dispatch(movieActions.searchMovie({title, page: Number(page)}))
        }
    }, [dispatch, query, title])

    const handlePageChange = (selectedPage: number) => {
        navigate(`/search_movie/${title}?page=${selectedPage}`)
    }

    return (
        <div className={styles.container}>

            <button className="btn btn-dark" id={styles.button} disabled={!prev}
                    onClick={() => setQuery(query => ({page: String(Number(query.get('page')) - 1)}))}>
                <span></span> <span></span> <span></span> <span></span>Prev
            </button>

            <div className={styles.moviesContainer}>

                <div className={styles.movies}>

                    {searchMovie.length > 0 ? searchMovie.map(movie => <MoviesListCard key={movie.id} movie={movie}/>) :
                        (<h2>Sorry !! No Movies Found</h2>)}
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

            <button className="btn btn-dark" id={styles.button} disabled={next === (total_pages || 0) + 1}
                    onClick={() => setQuery(query => ({page: String(Number(query.get('page')) + 1)}))}>
                <span></span> <span></span> <span></span> <span></span>Next
            </button>
        </div>
    );
};

export {Search};