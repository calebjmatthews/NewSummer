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

export function ageVisit(cast: Cast, duration = null) {
  if (cast.currentlyVisiting != null && cast.saidHello == true) {
    cast.ageVisit(duration);
    return setCast(cast);
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
      let offers = cast.members.get(travelerRole).genOffers(cultivarsUnlocked);
      
      cast.members.get(travelerRole).currentOffers = offers;
    }

    return setCast(cast);
  }
}

export function sayHello(cast: Cast) {
  if (cast.saidHello == false) {
    cast.saidHello = true;
    return setCast(cast);
  }
  return {
    type: null
  }
}
