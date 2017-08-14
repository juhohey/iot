import React from 'react';

import style from './style.scss';

const Sidebar = () => (
    <aside className="sidebar">
       <div className="sidebar-head">Sidebar</div>
       <div className="sidebar-body">
            <nav className="sidebar-navigation">
                <div className="sidebar-navigation-item">
                    Thing 1
                </div>
                <div className="sidebar-navigation-item">
                    Thing 2
                </div>
            </nav>
       </div>
    </aside>
)
export default Sidebar; 