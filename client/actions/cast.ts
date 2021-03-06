import Cast from '../models/traveler/cast';
import RecordBook from '../models/record_book';
import Offer from '../models/traveler/offer';
import { TravelerRoles } from '../models/enums/traveler_roles';
import { FamilyNames } from '../models/enums/family_names';

export const SET_CAST = 'SET_CAST';
export function setCast(cast: Cast) {
  return {
    type: SET_CAST,
    cast: cast
  }
}

export const SET_VISIT_AGE = 'SET_VISIT_AGE';
export const SET_VISITING = 'SET_VISITING';
export function ageVisit(cast: Cast, duration: number = null) {
  if (cast.currentlyVisiting != null && cast.saidHello == true) {
    cast.ageVisit(duration);
    if (cast.currentlyVisiting != null) {
      return {
        type: SET_VISIT_AGE,
        visitRemaining: cast.visitRemaining
      }
    }
    else {
      return {
        type: SET_VISITING,
        visitRemaining: null,
        currentlyVisiting: null
      }
    }
  }
  return {
    type: null
  }
}

export function checkForVisitStart(cast: Cast, recordBook: RecordBook) {
  let travelerName = cast.checkForVisitStart();

  if (travelerName != null) {
    return startVisit(travelerName, cast, recordBook);
  }

  return {
    type: null
  }
}

export function startVisit(travelerRole: string, cast: Cast, recordBook: RecordBook) {
  return function(dispatch: any) {
    cast.startVisit(travelerRole);

    if (travelerRole == TravelerRoles.SEED_TRADER) {
      let cultivarsUnlocked = recordBook.getCultivarNames(FamilyNames.POACEAE);
      let offers = cast.members[travelerRole].genOffers(cultivarsUnlocked);

      cast.members[travelerRole].currentOffers = offers;
    }

    return setCast(cast);
  }
}

export const SAID_HELLO = 'SAID_HELLO';
export function sayHello(cast: Cast) {
  if (cast.saidHello == false) {
    return {
      type: SAID_HELLO
    }
  }
  return {
    type: null
  }
}
