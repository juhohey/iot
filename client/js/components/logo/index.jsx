import React from 'react';
import {Link} from 'react-router-dom';
import style from './style.scss';

const Logo = () => (
    <div className="logo-box">
        <Link className="logo-link" to="/admin">
            <h4 className="logo">IoT API</h4>
        </Link>
    </div>
)
export default Logo;