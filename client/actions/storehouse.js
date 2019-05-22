import Storehouse from '../models/storehouse';
import { setRecordBook } from './record_book';
import { genId } from './auto_increment';

export const SET_STOREHOUSE = 'SET_STOREHOUSE';
export function setStorehouse(storehouse) {
  return {
    type: SET_STOREHOUSE,
    storehouse: storehouse
  }
}

export function gainDollars(storehouse, dollarsGained) {
  storehouse.gainDollars(dollarsGained);
  return {
    type: SET_STOREHOUSE,
    storehouse: storehouse
  }
}

export function spendDollars(storehouse, dollarsSpent) {
  storehouse.spendDollars(dollarsSpent);
  return {
    type: SET_STOREHOUSE,
    storehouse: storehouse
  }
}

export function breedSeeds(storehouse, autoIncrement, recordBook, seedA,
  seedB) {
  return function(dispatch) {
    let newSeedId = dispatch(genId(autoIncrement, 'seed'));
    const newSeed = storehouse.breedSeeds(seedA, seedB);
    newSeed.id = newSeedId.newId;
    if (storehouse.isCultivarFull(newSeed.cultivarName) == false) {
      recordBook.recordSeed(newSeed);
      dispatch(setRecordBook(recordBook));
      storehouse.addSeed(newSeed);
    }
    else {
      console.log('Cultivar storage full.');
      storehouse.intermediateSeed = newSeed;
    }

    return {
      type: SET_STOREHOUSE,
      storehouse: storehouse
    }
  }
}

export function ageBreeding(storehouse) {
  storehouse.ageBreeding();
  return {
    type: SET_STOREHOUSE,
    storehouse: storehouse
  }
};

export function addSeed(storehouse, recordBook, newSeed) {
  return function(dispatch) {
    recordBook.recordSeed(newSeed);
    dispatch(setRecordBook(recordBook));
    storehouse.addSeed(newSeed);
    return {
      type: SET_STOREHOUSE,
      storehouse: storehouse
    }
  }
}

export function replaceSeed(storehouse, oldSeed, newSeed) {
  storehouse.removeSeed(oldSeed);
  storehouse.addSeed(newSeed);
  return {
    type: SET_STOREHOUSE,
    storehouse: storehouse
  }
}
