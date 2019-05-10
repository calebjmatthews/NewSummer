import {SET_CAST} from '../actions/cast';
import {cast} from '../instances/cast';

export default function
  (state = {
    cast: cast
  },
    action = null) {
  switch(action.type) {
    case SET_CAST:
      return Object.assign({}, state, { cast: action.cast });
    default:
      return state;
  }
}
