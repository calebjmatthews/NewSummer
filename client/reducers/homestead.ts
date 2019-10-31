import {
  ADD_SEED
} from '../actions/homestead';
import Homestead from '../models/homestead';

let startingHomestead: Homestead = new Homestead();

export default function
  (homestead: Homestead = startingHomestead,
    action = null) {
  console.log('action');
  console.log(action);
	switch(action.type) {
    case ADD_SEED:
      action.homestead.addSeed(action.seed);
      console.log('action.homestead');
      console.log(action.homestead);
      return action.homestead;
		default:
			return homestead;
	}
};
