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
      let newHomestead = new Homestead(action.homestead);
      newHomestead.gainDollars(action.dollars);
      return newHomestead;
		default:
			return homestead;
	}
};
