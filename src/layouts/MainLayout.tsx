import {FC} from 'react';
import {Outlet} from "react-router-dom";

import {Footer, Header} from "../components";
import styles from './mainLayout.module.css';

interface IProps {

}

const MainLayout: FC<IProps> = () => {
    return (
        <div className={styles.container}>
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export {MainLayout};