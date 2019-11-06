import {
  ADD_SEED, GAIN_DOLLARS
} from '../actions/homestead';
import Homestead from '../models/homestead';

let startingHomestead: Homestead = new Homestead();

export default function
  (homestead: Homestead = startingHomestead,
    action = null) {
	switch(action.type) {
    case ADD_SEED:
      action.homestead.addSeed(action.seed);
      return action.homestead;
    case GAIN_DOLLARS:
      action.homestead.gainDollars(action.dollars);
      return action.homestead;
		default:
			return homestead;
	}
};
