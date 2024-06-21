import React from 'react';
import {HiMoon} from 'react-icons/hi';
import {FaSun} from 'react-icons/fa';
import {useTheme} from '../../hooks';

import styles from './themes.module.css';

const Themes = () => {
    const {theme, setTheme} = useTheme();

    const handleThemeToggle = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <div className="p-3 d-flex justify-content-end">
            <label className={`switch ${styles.switch}`}>
                <input
                    type="checkbox"
                    onClick={handleThemeToggle}
                    checked={theme === 'dark'}
                    readOnly
                />
                <span className={`${styles.slider} ${styles.round}`}>
                    <HiMoon className={`${styles.icon} ${theme === 'dark' ? styles.show : ''}`}/>
                    <FaSun className={`${styles.icon} ${theme === 'light' ? styles.show : ''}`}/>
                </span>
            </label>
        </div>
    );
};

export {Themes};
