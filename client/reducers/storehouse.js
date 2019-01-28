import {GAIN_DOLLARS, gainDollars} from '../actions/storehouse';
import {storehouse} from '../instances/storehouse';

export default function
  (state = {
    storehouse: storehouse
  },
    action = null) {
  switch(action.type) {
    case GAIN_DOLLARS:
      return Object.assign({}, state, { storehouse: action.storehouse });
    default:
      return state;
  }
}
