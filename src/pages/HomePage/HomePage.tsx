import {FC} from 'react';

import {Home} from "../../components";
import styles from './homePage.module.css';

interface IProps {

}

const HomePage: FC<IProps> = () => {
    return (
        <div className={styles.container}>
            <Home/>
        </div>
    );
};

export {HomePage};