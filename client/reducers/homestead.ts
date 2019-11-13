import {
  ADD_SEED, GAIN_DOLLARS, SET_HOMESTEAD, SPEND_DOLLARS
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
      var newHomestead = new Homestead(action.homestead);
      newHomestead.gainDollars(action.dollars);
      return newHomestead;
    case SPEND_DOLLARS:
      var newHomestead = new Homestead(action.homestead);
      newHomestead.spendDollarsIfPossible(action.dollars);
      return newHomestead;
    case SET_HOMESTEAD:
      var newHomestead = new Homestead(action.homestead);
      return newHomestead;
		default:
			return homestead;
	}
};
