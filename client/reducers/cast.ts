import {
  SET_CAST
} from '../actions/cast';
import Cast from '../models/traveler/cast';
import { startingSeedTrader } from '../instances/travelers/seed_trader';
import { TravelerRoles } from '../models/enums/traveler_roles';

let startingMembers: Map<string, any> = new Map();
startingMembers.set(TravelerRoles.SEED_TRADER, startingSeedTrader);

let startingCast: Cast = new Cast({
  members: startingMembers,
  currentlyVisiting: null,
  visitRemaining: null,
  saidHello: false
});

export default function
  (cast: Cast = startingCast,
    action = null) {
	switch(action.type) {
    case SET_CAST:
      var newCast = new Cast(action.cast);
      return newCast;
		default:
			return cast;
	}
};
