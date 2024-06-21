import {FC} from 'react';

import {MovieInfo} from "../../components";
import styles from "./moviesCardPage.module.css";

interface IProps {

}

const MovieCardPage: FC<IProps> = () => {
    return (
        <div className={styles.container}>
            <MovieInfo/>
        </div>
    );
};

export {MovieCardPage};