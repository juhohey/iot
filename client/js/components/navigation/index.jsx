import React from 'react';
import {Link} from 'react-router-dom';
import style from './style.scss';
import Inkd from '../inkd.jsx';

const Navigation = () => (
    <nav className="navigation">
       <Link to="/admin/" className="navigation-item">Dashboard<Inkd/></Link>
       <Link to="/admin/devices" className="navigation-item">Devices<Inkd/></Link>
    </nav>
)

export default Navigation;  