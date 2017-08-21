import {SET_SIDEBAR} from '../actions/sidebar';

export default (store = [[]], action) =>{
    switch (action.type) {
        case SET_SIDEBAR:
            return store.concat(action.sidebarChildren);
        default:
            return store;
    }
} 