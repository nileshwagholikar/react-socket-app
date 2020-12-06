import React from 'react';
import styles from './Footer.module.css';

const Footer = function() {
    return(
        <footer>
            <p className={styles.copyrightText}>Copyright &copy; 2017 All Rights Reserved by&nbsp;
                <a href="https://www.zeiss.com/" rel="noreferrer" target="_blank" title="Zeiss">Zeiss</a>.
            </p>

            <ul className={styles.socialIcons}>
                <li><a className={styles.facebook} href="/" title="FaceBook"><i className={styles.iconFacebook} /></a></li>
                <li><a className={styles.twitter} href="/" title="Twitter"><i className={styles.iconTwitter} /></a></li>
                <li><a className={styles.dribbble} href="/" title="Dribbble"><i className={styles.iconDribbble} /></a></li>
                <li><a className={styles.linkedin} href="/"  title="Linkedin"><i className={styles.iconLinkedin} /></a></li>
            </ul>
        </footer>
    );
};

export default Footer;