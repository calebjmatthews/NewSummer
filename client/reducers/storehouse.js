import {GAIN_DOLLARS, gainDollars} from '../actions/storehouse';
import {storehouse} from '../instances/storehouse';

import {seedDemo1, seedDemo2} from '../instances/seeds';
storehouse.addSeed(seedDemo1);
storehouse.addSeed(seedDemo2)

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
