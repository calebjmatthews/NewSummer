import Storehouse from '../models/storehouse';
import {recordBook} from '../instances/record_book';

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

export function breedSeeds(storehouse, seedA, seedB) {
  const newSeed = storehouse.breedSeeds(seedA, seedB);
  if (storehouse.isCultivarFull(newSeed.cultivarName) == false) {
    recordBook.recordSeed(newSeed);
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

export function addSeed(storehouse, newSeed) {
  recordBook.recordSeed(newSeed);
  storehouse.addSeed(newSeed);
  return {
    type: SET_STOREHOUSE,
    storehouse: storehouse
  }
}
