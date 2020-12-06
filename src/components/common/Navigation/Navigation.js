import React from 'react';
import styles from './Navigation.module.css';
import { NavLink } from "react-router-dom";

const Navigation = function() {
    return(
        <nav>
            <ul>
                <li>
                    <NavLink to="/dashboard" exact={true} activeClassName={styles.active}>Dashboard</NavLink>
                </li>
                <li>
                    <NavLink to="/logout" exact={true} activeClassName={styles.active}>Logout</NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;