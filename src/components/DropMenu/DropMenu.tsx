import {FC, useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";

import styles from './dropMenu.module.css';

interface IProps {
    setActiveGenre: (active: boolean) => void;
    isActive: boolean;
}

const DropMenu: FC<IProps> = ({setActiveGenre, isActive}) => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        timerRef.current = setTimeout(() => {
            setIsOpen(false);
        }, 200);
    };

    const searchClick = (idGenre:number, nameGenre:string) => {
        setActiveGenre(true);
        navigate(`/search_movie_by_genre/${idGenre}/${nameGenre}?page=1`);
    }

    return (

        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={styles.container}>

            <span className={`${styles.genres} ${isActive ? styles.active : ''}`}>Genre</span>

            {isOpen && (
                <ul className={styles.menu}>

                    <li className={styles.genre} onClick={() => searchClick(28, 'action')}></li>
                    <li className={styles.genre} onClick={() => searchClick(12, 'adventure')}>Adventure</li>
                    <li className={styles.genre} onClick={() => searchClick(16, 'animation')}>Animation</li>
                    <li className={styles.genre} onClick={() => searchClick(35, 'comedy')}>Comedy</li>
                    <li className={styles.genre} onClick={() => searchClick(80, 'crime')}>Crime</li>
                    <li className={styles.genre} onClick={() => searchClick(99, 'documentary')}>Documentary</li>
                    <li className={styles.genre} onClick={() => searchClick(18, 'drama')}>Drama</li>
                    <li className={styles.genre} onClick={() => searchClick(10751, 'family')}>Family</li>
                    <li className={styles.genre} onClick={() => searchClick(14, 'fantasy')}>Fantasy</li>
                    <li className={styles.genre} onClick={() => searchClick(36, 'history')}>History</li>
                    <li className={styles.genre} onClick={() => searchClick(27, 'horror')}>Horror</li>
                    <li className={styles.genre} onClick={() => searchClick(10402, 'music')}>Music</li>
                    <li className={styles.genre} onClick={() => searchClick(9648, 'mystery')}>Mystery</li>
                    <li className={styles.genre} onClick={() => searchClick(10749, 'romance')}>Romance</li>
                    <li className={styles.genre} onClick={() => searchClick(878, 'science fiction')}>Science Fiction</li>
                    <li className={styles.genre} onClick={() => searchClick(10770, 'tv movie')}>TV Movie</li>
                    <li className={styles.genre} onClick={() => searchClick(53, 'thriller')}>Thriller</li>
                    <li className={styles.genre} onClick={() => searchClick(10752, 'war')}>War</li>
                    <li className={styles.genre} onClick={() => searchClick(37, 'western')}>Western</li>

                </ul>

            )}
        </div>
    );
};

export { DropMenu };
