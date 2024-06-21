import {FC} from 'react';

import styles from './starRating.module.css';

interface IProps {
    vote_average: number;
}

const StarRating: FC<IProps> = ({vote_average}) => {
    const setWidth = (d: number): { width: number } => {
        return {width: d * 16.5}
    }
    return (
        <div className={styles.rating}>

            <div className={styles.rating_body}>

                <div className={styles.rating_active} style={setWidth(vote_average)}></div>

                <div className={styles.rating_items}>
                    <input type={'radio'} className={styles.rating_item} value={'1'} name={'rating'}></input>
                    <input type={'radio'} className={styles.rating_item} value={'2'} name={'rating'}></input>
                    <input type={'radio'} className={styles.rating_item} value={'3'} name={'rating'}></input>
                    <input type={'radio'} className={styles.rating_item} value={'4'} name={'rating'}></input>
                    <input type={'radio'} className={styles.rating_item} value={'5'} name={'rating'}></input>
                    <input type={'radio'} className={styles.rating_item} value={'6'} name={'rating'}></input>
                    <input type={'radio'} className={styles.rating_item} value={'7'} name={'rating'}></input>
                    <input type={'radio'} className={styles.rating_item} value={'8'} name={'rating'}></input>
                    <input type={'radio'} className={styles.rating_item} value={'9'} name={'rating'}></input>
                    <input type={'radio'} className={styles.rating_item} value={'10'} name={'rating'}></input>
                </div>

            </div>

            <div className={'rating_value'}>{vote_average}</div>

        </div>

    );
};

export {StarRating};