import React from 'react';
import {Link} from  'react-router-dom';
import style from './style.scss';
import Inkd from '../inkd.jsx';

const list = (props = {list:[]}) => (
    <ul className="list">
        {props.items.map( (child,i)=>{
            return <li key={i} className="list-item">
                    <Link to={child.link ? child.link : '#!'} className="list-item-link">
                        <span className="list-name">                
                            {child.name}
                        </span>
                        <span className="list-description">
                            {child.description}
                        </span>
                    </Link>
                </li>
        })}
    </ul>
)
export default list; 