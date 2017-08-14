import {SET_DEVICES} from '../actions/devices';

export default (store = [], action) =>{
    switch (action.type) {
        case SET_DEVICES:
            return store.concat(action.devices);
        default:
            return store;
    }
} 