import {FC} from 'react';

import {PopularMoviesList} from "../PopularMoviesList/PopularMoviesList";
import {TopRatedList} from "../TopRatedList/TopRatedList";
import {NowPlayingList} from "../NowPlayingList/NowPlayingList";
import {UpcomingList} from "../UpcomingList/UpcomingList";
import {useAppSelector} from "../../hooks";
import {Loader} from "../Loader/Loader";
import styles from './home.module.css';

interface IProps {

}

const Home: FC<IProps> = () => {
    const {top_rated, now_playing, upcoming, popular} = useAppSelector(state => state.movieLists)

    if (top_rated && now_playing && upcoming && popular) {

        return (
            <div className={styles.container}>
                <PopularMoviesList/>
                <TopRatedList/>
                <NowPlayingList/>
                <UpcomingList/>
            </div>
        );
    } else
        return (
            <div className={styles.container}>
                <Loader/>
            </div>
        );
};

export {Home};