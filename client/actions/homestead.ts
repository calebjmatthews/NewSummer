import { setCard } from './card';

import Seed from '../models/seed/seed';
import Homestead from '../models/homestead';
import RecordBook from '../models/record_book';
import { recordSeed } from './record_book';
import { StatNames } from '../models/enums/stat_names';
import { CardTypes } from '../models/enums/card_types';
import { families } from '../instances/families';

export const ADD_SEED = 'ADD_SEED';
export function addAndRecordSeed(seed: Seed, homestead: Homestead,
  recordBook: RecordBook) {
  return function(dispatch: any) {
    dispatch(recordSeed(seed, recordBook));
    dispatch({
      type: ADD_SEED,
      seed: seed,
      homestead: homestead
    });
  }
}

export const GAIN_DOLLARS = 'GAIN_DOLLARS';
export function gainDollars(dollars: number, homestead: Homestead) {
  return {
    type: GAIN_DOLLARS,
    dollars: dollars,
    homestead: homestead
  }
}

export const SPEND_DOLLARS = 'SPEND_DOLLARS';
export function spendDollars(dollars: number, homestead: Homestead) {
  return {
    type: SPEND_DOLLARS,
    dollars: dollars,
    homestead: homestead
  }
}

export const SET_HOMESTEAD = 'SET_HOMESTEAD';
export function setHomestead(homestead: Homestead) {
  return {
    type: SET_HOMESTEAD,
    homestead: homestead
  }
}

export function startBreedingSeeds(homestead: Homestead, seedA: Seed, seedB: Seed) {
  return function(dispatch: any) {
    let newSeeds: Seed[] = [];
    let totalGrowingTime = 0;
    [...Array(homestead.experimentalGardenSize).keys()].map(() => {
      const newSeed = homestead.breedSeeds(seedA, seedB);
      newSeed.build(families);
      newSeed.id = Math.floor(Math.random() * 100000);
      totalGrowingTime += (newSeed.statMap.get(StatNames.GROWING_TIME).value);
      newSeeds.push(newSeed);
    });

    homestead.seedsBred = newSeeds;
    homestead.breedingTimeRemaining = (totalGrowingTime / newSeeds.length) * 2;
    homestead.breedingAgeLabel = homestead.getBreedingAgeLabel();

    return {
      type: SET_HOMESTEAD,
      homestead: homestead
    }
  }
}

export function ageBreeding(homestead: Homestead, duration = null) {
  homestead.ageBreeding(duration);
  return {
    type: SET_HOMESTEAD,
    homestead: homestead
  }
};

export function finishBreedingSeed(homestead: Homestead, recordBook: RecordBook,
  newSeed: Seed, spot: number) {
  return function(dispatch: any) {
    if (homestead.isCultivarFull(newSeed.cultivarName, recordBook.seedMap) == false) {
      dispatch(recordSeed(newSeed, recordBook));
      homestead.addSeed(newSeed);
      homestead.seedsBred = [];
      dispatch({
        type: SET_HOMESTEAD,
        homestead: homestead
      });
      dispatch(setCard(null, spot));
    }
    else {
      homestead.intermediateSeed = newSeed;
      dispatch({
        type: SET_HOMESTEAD,
        homestead: homestead
      });
      dispatch(setCard({type:CardTypes.SEED_REPLACE_BREED, spot: spot}, spot));
    }
  }
}

export function replaceSeed(homestead: Homestead, oldSeed: Seed, newSeed: Seed,
  recordBook: RecordBook, reason = null) {
  return function(dispatch: any) {
    dispatch(recordSeed(newSeed, recordBook));
    homestead.removeSeed(oldSeed);
    homestead.addSeed(newSeed);

    if (reason == 'breed') {
      homestead.seedsBred = [];
    }

    return {
      type: SET_HOMESTEAD,
      homestead: homestead
    }
  }
}
