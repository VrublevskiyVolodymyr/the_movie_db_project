import {FC, useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {joiResolver} from "@hookform/resolvers/joi";
import {useForm} from "react-hook-form";

import {Themes} from "../Themes/Themes";
import {DropMenu} from "../DropMenu/DropMenu";
import {titleValidator} from "../../validators";
import styles from './header.module.css';

interface IProps {
}

const Header: FC<IProps> = () => {
    const navigate = useNavigate();
    const [activeGenre, setActiveGenre] = useState<boolean>(false);

    const {register, handleSubmit, reset, formState: {isValid}} = useForm<{ title: string }>({
        mode: 'all',
        resolver: joiResolver(titleValidator)
    })

    const searchClick = async (title: string) => {
        setActiveGenre(false);
        navigate(`/search_movie/${title}?page=1`)
        reset()
    }

    const handleNavLinkClick = () => {
        setActiveGenre(false);
    }

    return (
        <div className={styles.header}>
            <div className={styles.logo} onClick={() => navigate('/home')}>MovieUA</div>

            <nav className={styles.nav}>
                <NavLink to="/home"
                         className={({isActive}) => isActive ? `${styles.navLink} ${styles.active} ${styles.movies}` : `${styles.navLink} ${styles.movies}`}
                         onClick={handleNavLinkClick}>Home</NavLink>
                <NavLink to="/movies?page=1"
                         className={({isActive}) => isActive ? `${styles.navLink} ${styles.active} ${styles.movies}` : `${styles.navLink} ${styles.movies}`}
                         onClick={handleNavLinkClick}>Movies</NavLink>
                <NavLink to="/tv?page=1"
                         className={({isActive}) => isActive ? `${styles.navLink} ${styles.active} ${styles.movies}` : `${styles.navLink} ${styles.movies}`}
                         onClick={handleNavLinkClick}>TV</NavLink>
                <DropMenu setActiveGenre={setActiveGenre} isActive={activeGenre}/>
            </nav>

            <div className={styles.form}>
                <form className="d-flex" onSubmit={handleSubmit(({title}) => searchClick(title))}>
                    <input className={styles.input} type="text" placeholder="Movie search" {...register('title')} />
                    <button className="btn btn-dark" id={styles.button} disabled={!isValid}>
                        <span></span> <span></span> <span></span> <span></span>Search
                    </button>
                </form>

                <Themes/>

                <div className={styles.user}>User</div>
            </div>
        </div>
    );
};

export {Header};