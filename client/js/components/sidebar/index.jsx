import React from 'react';

import style from './style.scss';

/**
 * @store sidebar,
 * expect items
 */

class Sidebar extends React.Component{
    
    componentWillMount(){

        this.state = {
            items:[]    
        };

        this.props.store.subscribe(()=> {
            const state = this.props.store.getState();
            this.setState({items:state.items.slice(0,1)});
        });
    }

    render(){
        return (
            <aside className="sidebar">
                <div className="sidebar-head">Sidebar</div>
                <div className="sidebar-body">
                        <nav className="sidebar-navigation">
                           {this.state.items.map( item=>{
                               return  <div className="sidebar-navigation-item">
                                    Thing 1
                                </div>  
                           })}
                           
                    q    </nav>
                </div>
            </aside>
        )
    }
}

const stateHelper = {
    /**
     * Relieve wathing / slicing to a helper
     * 
     * @param {String} storeKey 
     * @param {Function} setter 
     */
    listenForMostRecent(storeKey, setter){
        return store.subscribe(()=>{
            const items = store.getState()[storeKey];
            setter(items.slice(items.length-1, items.length));
        });
    }
}


export default Sidebar; 