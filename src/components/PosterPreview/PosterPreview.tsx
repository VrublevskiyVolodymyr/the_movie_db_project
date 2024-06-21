import {FC} from 'react';
import {useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import {IMovie} from "../../interfaces";
import {useAppDispatch} from "../../hooks";
import {movieActions} from "../../redux";
import {imageURL} from "../../configs";
import styles from './posterPreview.module.css';

interface IProps {
    movie: IMovie;
    list: string;
}

const PosterPreview: FC<IProps> = ({movie, list}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {id, title, backdrop_path} = movie

    const handleClick = (movie: IMovie) => {
        dispatch(movieActions.setSelectedMovie(movie))
        navigate(`/home/${list}/${id}`)
    }

    return (

        <div className={styles.movie} onClick={() => handleClick(movie)}>

            <img className="img" src={imageURL + backdrop_path} alt={title}></img>

            <h5 className={styles.text}> {title}</h5>


        </div>
    );
};

export {PosterPreview};