import {FC, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import {useAppDispatch, useAppSelector} from "../../hooks";
import {movieActions} from "../../redux";
import {imageURL} from "../../configs";
import {StarRating} from "../StarRating/StarRating";
import {Trailer} from "../Trailer/Trailer";
import styles from './movieInfo.module.css';

interface IProps {

}

const MovieInfo: FC<IProps> = () => {
    const {id: idStr} = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {movieById, selectedMovie} = useAppSelector(state => state.movies);
    const movieCard = selectedMovie || movieById;
    const id = idStr ? parseInt(idStr) : null;


    useEffect(() => {
        if (id) {
            dispatch(movieActions.getById({id}));
        }
    }, [dispatch, id])

    const [onVideo, setOnVideo] = useState(false);
    const [isZoomed, setIsZoomed] = useState(false);


    const playTrailer = () => {
        setOnVideo(true)
    }

    const closeTrailer = () => {
        setOnVideo(false)
    }

    const toggleZoom = () => {
        setIsZoomed(!isZoomed);
    };

    const searchClick = (idGenre: string, nameGenre: string): void => {
        navigate(`/search_movie_by_genre/${idGenre}/${nameGenre}?page=1`);
    }

    if (!movieCard) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.container}>
            {movieById &&
                <div className={isZoomed ? styles.cardZoom : styles.card}>

                    <img className={isZoomed ? styles.zoomed : styles.img_hide} src={imageURL + movieCard.backdrop_path}
                         alt={movieById.title} onClick={toggleZoom}></img>

                    <h1 className={`${styles.text} ${isZoomed ? styles.hide : ''}`}
                        id={styles.title}> {movieCard.title}</h1>

                    <div className={`${isZoomed ? styles.hide : styles.img_block}`}>

                        <img id={styles.img} src={imageURL + movieCard.backdrop_path} alt={movieById.title}
                             onClick={toggleZoom}></img>

                        <div className={styles.details}>
                            <div className={styles.badges}>
                                {movieById.genres.map(genre => <span id={styles.badge}
                                                                     className="badge rounded-pill badge bg-secondary text-dark"
                                                                     onClick={() => searchClick(`${genre.id}`, `${genre.name}`)}>{genre.name}</span>)}
                            </div>
                            <h6>Popularity: {movieById.popularity}</h6>
                            <h6> Release date: {movieById.release_date}</h6>
                            <h6>Budget: {movieById.budget}$</h6>
                            <h6>Runtime: {movieById.runtime}min</h6>
                            <StarRating key={id} vote_average={movieById.vote_average}/>
                        </div>

                    </div>

                    <div className={isZoomed ? styles.hide : styles.body_card}>
                        <h4 className={styles.text}>Overview</h4>
                        <p> {movieById.overview}</p>
                        <h4 className={styles.text}>Tagline</h4>
                        <p>{movieById.tagline}</p>
                    </div>

                    {!isZoomed && <>
                        <button id={styles.button_close} onClick={() => onVideo ? closeTrailer() : playTrailer()}>
                            <span></span> <span></span> <span></span> <span></span>
                            {onVideo ? <h5>Close player</h5> : <h5>Play trailer</h5>}</button>

                        {onVideo && <Trailer key={id} movie={movieById}/>}

                        <hr/>

                        <button className="btn btn-dark" id={styles.button} onClick={() => navigate(-1)}>
                            <span></span> <span></span> <span></span> <span></span> Back
                        </button>
                    </>
                    }

                </div>
            }
        </div>
    );
};

export {MovieInfo};