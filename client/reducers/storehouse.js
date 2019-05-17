import {SET_STOREHOUSE} from '../actions/storehouse';
import {storehouse} from '../instances/storehouse';

export default function
  (state = {
    storehouse: storehouse
  },
    action = null) {
  switch(action.type) {
    case SET_STOREHOUSE:
      return Object.assign({}, state, { storehouse: action.storehouse });
    default:
      return state;
  }
}
