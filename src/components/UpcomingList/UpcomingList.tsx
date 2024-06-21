import {FC, useEffect} from "react";
import Slider from 'react-slick';
import {useNavigate, useSearchParams} from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {movieActions, moviesListActions} from "../../redux";
import {Loader} from "../Loader/Loader";
import {Pagination} from "../Pagination/Pagination";
import {PosterPreview} from "../PosterPreview/PosterPreview";
import styles from './upcomingList.module.css';

interface IProps {
}

const UpcomingList: FC<IProps> = () => {
    const {upcoming, total_pages, loading} = useAppSelector(state => state.movieLists);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [query, setQuery] = useSearchParams({page: '1'});
    const currentPage = query.get('page') ? parseInt(query.get('page') as string, 10) : 1;
    const list = 'upcoming';

    useEffect(() => {
        const page = query.get('page') || '1';
        dispatch(moviesListActions.getAllUpcoming({page: Number(page)}));
    }, [dispatch, query]);

    useEffect(() => {
        dispatch(movieActions.getGenres());
    }, [dispatch]);

    const handlePageChange = (selectedPage: number) => {
        navigate(`/home/?page=${selectedPage}`);
    };

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
    };

    return (
        <div className={styles.container}>

            <div className={styles.moviesContainer}>
                <h2 className={styles.title}>Upcoming movies</h2>
                <Slider {...sliderSettings}>
                    {upcoming.map(movie => (
                        <div key={movie.id} className={styles.movie}>
                            <PosterPreview movie={movie} list={list}/>
                        </div>
                    ))}
                </Slider>

                {loading && <Loader/>}

            </div>
            <div className={styles.pagination}>
                {total_pages !== null && total_pages > 1 && (
                    <Pagination
                        pageCount={total_pages || 1}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                        isFirstPage={currentPage === 1}
                        isLastPage={currentPage === total_pages}
                    />
                )}
            </div>

        </div>
    );
};

export {UpcomingList};