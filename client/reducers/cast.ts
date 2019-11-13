import {
  SET_CAST, SET_VISIT_AGE, SET_VISITING, SAID_HELLO
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
    case SET_VISIT_AGE:
      return Object.assign(new Cast(), cast, {
        visitRemaining: action.visitRemaining
      })
    case SET_VISITING:
      return Object.assign(new Cast(), cast, {
        visitRemaining: action.visitRemaining,
        currentlyVisiting: action.currentlyVisiting
      });
    case SAID_HELLO:
      return Object.assign(new Cast(), cast, {
        saidHello: true
      });
    case SET_CAST:
      return new Cast(action.cast);
		default:
			return cast;
	}
};
