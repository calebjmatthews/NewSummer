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
export function startBreedingSeeds(storehouse, autoIncrement, recordBook,
  seedA, seedB) {
  return function(dispatch) {
    let newSeeds = [];
    [...Array(storehouse.experimentalGardenSize).keys()].map(() => {
      let newSeedId = dispatch(genId(autoIncrement, 'seed'));
      const newSeed = storehouse.breedSeeds(seedA, seedB);
      newSeed.id = newSeedId.newId;
      newSeeds.push(newSeed);
    });

    storehouse.seedsBred = newSeeds;
    storehouse.breedingTimeRemaining = 100;
    storehouse.breedingAgeLabel = storehouse.getBreedingAgeLabel();

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

export function finishBreedingSeed(storehouse, recordBook, newSeed) {
  if (storehouse.isCultivarFull(newSeed.cultivarName) == false) {
    recordBook.recordSeed(newSeed);
    dispatch(setRecordBook(recordBook));
    storehouse.addSeed(newSeed);
    storehouse.seedsBred = [];
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
