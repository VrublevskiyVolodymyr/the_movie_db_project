import {FC, useEffect, useState} from 'react';
import ReactPlayer from "react-player";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {movieActions} from "../../redux";
import {Loader} from "../Loader/Loader";
import {IMovieDetails} from "../../interfaces";
import styles from './trailer.module.css';

interface IProps {
movie:IMovieDetails;
}

const Trailer: FC<IProps> = ({movie}) => {
    const [videoUrl, setVideoUrl] = useState('');
    const [noTrailer, setNoTrailer] = useState(true);
    const dispatch = useAppDispatch();
    const {trailer, loading} = useAppSelector(state => state.movies);
    const id = movie.id

    useEffect(() => {
        dispatch(movieActions.getTrailer({id}))
    }, [dispatch, id])

    useEffect(() => {
        if (trailer&&trailer.results.length>0) {
            const videoUrl = `https://www.youtube.com/watch?v=${trailer.results[0].key}`;
            setVideoUrl(videoUrl);
            setNoTrailer(true)
        } else setNoTrailer(false)
    }, [trailer])

    return (

        <div className="player-wrapper">

            {loading && <Loader/>}

            {(videoUrl && noTrailer) && (
                <ReactPlayer
                    url={videoUrl}
                    className="react-player"
                    playing
                    controls
                    width="100%"
                    height="400px"
                />
            )}

            {!noTrailer && <h4 className={styles.noTrailer}>Sorry, no trailer available!</h4>}

        </div>
    );
};


export {Trailer};