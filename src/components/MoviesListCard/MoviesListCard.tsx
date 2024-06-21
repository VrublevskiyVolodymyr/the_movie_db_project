import React, {FC} from 'react';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import {IMovie} from "../../interfaces";
import {useAppDispatch} from "../../hooks";
import {movieActions} from "../../redux";
import {imageURL} from "../../configs";
import {StarRating} from "../StarRating/StarRating";
import styles from './moviesListCard.module.css';

interface IProps {
    movie: IMovie;
}


type IPropsType = IProps & { children?: React.ReactNode };

const MoviesListCard: FC<IPropsType> = ({movie}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { idGenre, nameGenre } = useParams<Record<string, string>>();

    const {id, title, backdrop_path, vote_average} = movie
    const isGenreSearch = location.pathname.includes('search_movie_by_genre');
    const isTV = location.pathname.includes('tv');


    const handleClick = (movie: IMovie) => {
        dispatch(movieActions.setSelectedMovie(movie))
        if(isGenreSearch){
            navigate(`/search_movie_by_genre/${idGenre}/${nameGenre}/${id}`)
        } else if(isTV){
            navigate(`/tv/${id}`)
        } else
        navigate(`/movies/${id}`)
    }

    return (

        <div className={styles.movie}>

            <img className="card-img-top" src={imageURL + backdrop_path} alt={title}></img>

            <h5 className={styles.text}> {title}</h5>

            {id && <StarRating key={id} vote_average={vote_average}/>}

            <button id={styles.button} className="btn btn-dark" onClick={() => handleClick(movie)}>
                <span></span> <span></span> <span></span> <span></span> Vive more
            </button>

        </div>
    );
};

export {MoviesListCard};