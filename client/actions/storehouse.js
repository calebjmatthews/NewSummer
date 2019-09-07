import Storehouse from '../models/storehouse';
import { setRecordBook } from './record_book';
import { genId } from './auto_increment';
import { GROWING_TIME } from '../instances/stats';
import { setCard } from './card';

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
}``
export function startBreedingSeeds(storehouse, autoIncrement, recordBook,
  seedA, seedB) {
  return function(dispatch) {
    let newSeeds = [];
    let totalGrowingTime = 0;
    [...Array(storehouse.experimentalGardenSize).keys()].map(() => {
      let newSeedId = dispatch(genId(autoIncrement, 'seed'));
      const newSeed = storehouse.breedSeeds(seedA, seedB);
      newSeed.id = newSeedId.newId;
      totalGrowingTime += (newSeed.stats[GROWING_TIME].value);
      newSeeds.push(newSeed);
    });

    storehouse.seedsBred = newSeeds;
    storehouse.breedingTimeRemaining =
      (totalGrowingTime / newSeeds.length) * 2;
    storehouse.breedingAgeLabel = storehouse.getBreedingAgeLabel();

    return {
      type: SET_STOREHOUSE,
      storehouse: storehouse
    }
  }
}

export function ageBreeding(storehouse, duration = null) {
  storehouse.ageBreeding(duration);
  return {
    type: SET_STOREHOUSE,
    storehouse: storehouse
  }
};

export function finishBreedingSeed(storehouse, recordBook, newSeed, spot) {
  return function(dispatch) {
    if (storehouse.isCultivarFull(newSeed.cultivarName) == false) {
      recordBook.recordSeed(newSeed);
      dispatch(setRecordBook(recordBook));
      storehouse.addSeed(newSeed);
      storehouse.seedsBred = [];
      dispatch(setCard({type:null}, spot));
    }
    else {
      storehouse.intermediateSeed = newSeed;
      dispatch(setStorehouse(storehouse));
      dispatch(setCard({type:"seedReplaceBreed"}, spot));
    }
    return {
      type: SET_STOREHOUSE,
      storehouse: storehouse
    }
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

export function replaceSeed(storehouse, oldSeed, newSeed, reason = null) {
  storehouse.removeSeed(oldSeed);
  storehouse.addSeed(newSeed);

  if (reason == 'breed') {
    storehouse.seedsBred = [];
  }

  return {
    type: SET_STOREHOUSE,
    storehouse: storehouse
  }
}
