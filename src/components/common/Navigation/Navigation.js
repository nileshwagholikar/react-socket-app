import React from 'react'
import styles from './Navigation.module.css';

const Navigation = function() {
    return(
        <nav>
            <ul className={styles.nav}>
                <li><a className={styles.active} href='/'>Dashboard</a></li>
                <li><a href='/'>Logout</a></li>
            </ul>
        </nav>
    );
}

export default Navigation;