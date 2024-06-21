import {FC} from 'react';

import styles from './footer.module.css';

interface IProps {

}

const Footer: FC<IProps> = () => {
    return (
        <div className={styles.footerContainer}>
            <div className={styles.footerText}>© 2024 MovieUA</div>
            <div className={styles.footerLinks}>
                <a href="https://www.themoviedb.org/privacy-policy" className={styles.footerLink}>Privacy Policy</a>
                <a href="https://www.themoviedb.org/api-terms-of-use" className={styles.footerLink}>API Terms of Use</a>
                <a href="https://owu.com.ua/kontakty" className={styles.footerLink}>Contact Us</a>
            </div>
        </div>
    );
};

export {Footer};