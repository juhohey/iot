import React from 'react';

import Logo from '../logo/index.jsx';
import Navigation from '../navigation/index.jsx';
import UserMenu from '../user-menu/index.jsx';

import style from './style.scss';

const Header = () => (
    <header className="header">
        <div className="header-contain">
            <Logo />
            <Navigation/>
            <UserMenu/>
        </div>
    </header>
)
export default Header; 