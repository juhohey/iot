import {SET_READINGS} from '../actions/readings';

export default (store = [], action) => {
  switch (action.type) {
    case SET_READINGS:
      return store.concat(action.readings);
    default:
      return store;
  }
}