import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

const Header = () => {
    return (
        <div className="header row">
            <Link to="/" className="header__logo">MovieApp</Link>
        </div>
    );
};

export default Header;