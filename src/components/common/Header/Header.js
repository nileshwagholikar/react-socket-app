import React from 'react';
import 'App.css';

const Navigation = React.lazy(() => import('../Navigation/Navigation'));

const Header = function() {
    return(
        <header>
            <div className="logo">Logo will come here..</div>
            <Navigation />
        </header>
    );
}

export default Header;