import {FC} from 'react';

import tridentImage from "./../../images/ukrainian_trident.jpg";
import styles from './loader.module.css';

interface IProps {

}

const Loader: FC<IProps> = () => {
    return (
        <div className={styles.loader_container}>
            <div className={styles.loader}>
                <div className={styles.loaderInner}></div>
                <div className={styles.loaderImage}>
                    <img src={tridentImage} alt="Trident" className={styles.image}/>
                </div>
            </div>
        </div>
    );
};

export {Loader};