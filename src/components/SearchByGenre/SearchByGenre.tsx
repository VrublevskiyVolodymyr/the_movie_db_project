import {FC, useEffect} from 'react';
import {useNavigate, useParams, useSearchParams} from "react-router-dom";

import {genreActions} from "../../redux";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {MoviesListCard} from "../MoviesListCard/MoviesListCard";
import {Loader} from "../Loader/Loader";
import {Pagination} from "../Pagination/Pagination";
import styles from './searchByGenre.module.css';

interface IProps {

}

const SearchByGenre: FC<IProps> = () => {
    const {idGenre} = useParams<{ idGenre: string }>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {genresById, total_pages, prev, next, loading} = useAppSelector(state => state.genres);
    const [query, setQuery] = useSearchParams({page: '1'});
    const {nameGenre} = useParams();
    const id = idGenre ? parseInt(idGenre) : null;
    const page = query.get('page') || '1';
    const currentPage = query.get('page') ? parseInt(query.get('page') as string, 10) : 1;


    useEffect(() => {
        if (id) {
            dispatch(genreActions.getAllByGenres({id, page: Number(page)}))
        }
    }, [dispatch, query, idGenre])

    const handlePageChange = (selectedPage: number) => {
        navigate(`/search_movie_by_genre/${idGenre}/${nameGenre}?page=${selectedPage}`)
    }


    return (
        <div className={styles.container}>

            <button className="btn btn-dark" id={styles.button} disabled={!prev}
                    onClick={() => setQuery(query => ({page: String(Number(query.get('page') || '1') - 1)}))}>
                <span></span> <span></span> <span></span> <span></span>Prev
            </button>

            <div className={styles.moviesContainer}>

                <div className={styles.movies}>
                    {genresById.map(movie => <MoviesListCard key={movie.id} movie={movie}/>)}
                    {loading && <Loader/>}
                </div>
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
                    onClick={() => setQuery(query => ({page: String(Number(query.get('page') || '1') + 1)}))}>
                <span></span> <span></span> <span></span> <span></span>Next
            </button>

        </div>
    );
};

export {SearchByGenre};