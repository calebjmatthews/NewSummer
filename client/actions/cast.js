import { genIdBatch } from './auto_increment';
import { POACEAE } from '../instances/families';

export const SET_CAST = 'SET_CAST';
export function setCast(cast) {
  return {
    type: SET_CAST,
    cast: cast
  }
}

export function ageVisit(cast) {
  if (cast.currentlyVisiting != null && cast.saidHello == true) {
    cast.ageVisit();
    return setCast(cast);
  }
  return {
    type: null
  }
}

export function checkForVisitStart(cast, recordBook, autoIncrement) {
  let travelerName = cast.checkForVisitStart();

  if (recordBook.getCultivarsUnlocked(POACEAE).length > 0
    && cast.everVisited == false) {
    return startVisit('Susanna Pol', cast, recordBook, autoIncrement);
  }
  if (travelerName != false) {
    return startVisit(travelerName, cast, recordBook, autoIncrement);
  }

  return {
    type: null
  }
}

export function startVisit(travelerName, cast, recordBook, autoIncrement) {
  return function(dispatch) {
    cast.startVisit(travelerName);

    if (travelerName == 'Susanna Pol') {
      let cultivarsUnlocked = recordBook.getCultivarsUnlocked(POACEAE);
      let offers = cast.getByProperty('name', travelerName)
        .genOffers(cultivarsUnlocked);
      let offerIdRes = dispatch(genIdBatch
        (autoIncrement, 'offer', offers.length));
      let newOfferIds = offerIdRes.newIds;
      let seedIdRes = dispatch(genIdBatch
        (autoIncrement, 'seed', offers.length));
      let newSeedIds = seedIdRes.newIds;

      offers.map((offer, index) => {
        offer.id = newOfferIds[index];
        offer.item.id = newSeedIds[index];
      });
      cast.getByProperty('name', travelerName)
        .currentOffers = offers;
    }

    return setCast(cast);
  }
}

export function sayHello(cast) {
  if (cast.saidHello == false) {
    cast.saidHello = true;
    return setCast(cast);
  }
  return {
    type: null
  }
}
