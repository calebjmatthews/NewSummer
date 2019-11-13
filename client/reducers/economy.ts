import {
  SET_ECONOMY
} from '../actions/economy';
import Economy from '../models/economy';

let startingEconomy = new Economy({intermediateSpend: null});

export default function
  (economy: Economy = startingEconomy,
    action = null) {
	switch(action.type) {
    case SET_ECONOMY:
      var newEconomy = new Economy(action.economy);
      return newEconomy;
		default:
			return economy;
	}
};
