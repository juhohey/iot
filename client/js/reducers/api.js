import {API_ERROR} from '../actions/api.js';

export default (state = [], action) => {
  switch (action.type) {
    case API_ERROR:
      return state.concat([{time:new Date(), error:action.error}]);
    default:
      return state
  }
}