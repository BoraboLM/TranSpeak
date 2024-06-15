'use client';

import styles from './style.module.css';
import { useEffect, useState } from 'react';

export default function StreamHeader() {
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={`${styles.container} ${isSticky ? styles.sticky : ''}`}>
            <div className={styles.text}>FILIPINO</div>
            <div className={styles.text}>ENGLISH</div>
            <div className={styles.text}>PANGASINAN</div>
            <div className={styles.text}>ILOCANO</div>
        </div>
    );
}
