import {
  ADD_SEED
} from '../actions/homestead';
import Homestead from '../models/homestead';

let startingHomestead: Homestead = new Homestead();

export default function
  (homestead: Homestead = startingHomestead,
    action = null) {
	switch(action.type) {
    case ADD_SEED:
      homestead.addSeed(action.seed);
      return homestead;
		default:
			return homestead;
	}
};
