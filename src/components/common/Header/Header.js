import React from 'react';
import logo from 'assets/logo.png'
import styles from './Header.module.scss';
import {NavLink} from "react-router-dom";

const Navigation = React.lazy(() => import('../Navigation/Navigation'));

const Header = function() {
    return(
        <header>
            <NavLink to="/dashboard" className={styles.logo}>
                <img src={logo} alt="logo" />Dashboard
            </NavLink>
            <Navigation />
        </header>
    );
};

export default Header;