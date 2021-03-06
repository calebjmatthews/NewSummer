import { setCard } from './card';

import Seed from '../models/seed/seed';
import Homestead from '../models/homestead';
import RecordBook from '../models/record_book';
import HarvestStack from '../models/seed/harvest_stack';
import { recordSeed } from './record_book';
import { StatNames } from '../models/enums/stat_names';
import { CardTypes } from '../models/enums/card_types';
import { families } from '../instances/families';

export const ADD_SEED = 'ADD_SEED';
export function addAndRecordSeed(seed: Seed, recordBook: RecordBook) {
  return function(dispatch: any) {
    dispatch(recordSeed(seed, recordBook));
    dispatch({
      type: ADD_SEED,
      seed: seed
    });
  }
}

export const SET_DOLLARS = 'SET_DOLLARS';
export function gainDollars(dollars: number, homestead: Homestead) {
  homestead.gainDollars(dollars);
  return {
    type: SET_DOLLARS,
    dollars: homestead.dollars
  }
}

export function spendDollars(dollars: number, homestead: Homestead) {
  homestead.spendDollars(dollars);
  return {
    type: SET_DOLLARS,
    dollars: homestead.dollars
  }
}

export const SET_HOMESTEAD = 'SET_HOMESTEAD';
export function setHomestead(homestead: Homestead) {
  return {
    type: SET_HOMESTEAD,
    homestead: homestead
  }
}

export const SET_BREEDING = 'SET_BREEDING';
export function startBreedingSeeds(homestead: Homestead, seedA: Seed, seedB: Seed) {
  let newSeeds: Seed[] = [];
  let totalGrowingTime = 0;
  [...Array(homestead.experimentalGardenSize).keys()].map(() => {
    const newSeed = homestead.breedSeeds(seedA, seedB);
    newSeed.id = Math.floor(Math.random() * 100000);
    totalGrowingTime += (newSeed.statMap[StatNames.GROWING_TIME].value);
    newSeeds.push(newSeed);
  });

  return {
    type: SET_BREEDING,
    seedsBred: newSeeds,
    breedingTimeRemaining: ((totalGrowingTime / newSeeds.length) * 2),
    breedingAgeLabel: homestead.getBreedingAgeLabel()
  }
}

export const SET_BREEDING_AGE = 'SET_BREEDING_AGE';
export function ageBreeding(homestead: Homestead, duration: number = null) {
  homestead.ageBreeding(duration);
  return {
    type: SET_BREEDING_AGE,
    breedingTimeRemaining: homestead.breedingTimeRemaining,
    breedingAgeLabel: homestead.breedingAgeLabel
  }
};

export const SET_INTER_SEED = 'SET_INTER_SEED';
export function finishBreedingSeed(homestead: Homestead, recordBook: RecordBook,
  newSeed: Seed, spot: number) {
  return function(dispatch: any) {
    if (homestead.isCultivarFull(newSeed.cultivarName, recordBook.seedMap) == false) {
      dispatch(addAndRecordSeed(newSeed, recordBook));
      dispatch({
        type: SET_BREEDING,
        seedsBred: [],
        breedingTimeRemaining: null,
        breedingAgeLabel: homestead.getBreedingAgeLabel()
      });
      dispatch(setCard(null, spot));
    }
    else {
      dispatch({
        type: SET_INTER_SEED,
        intermediateSeed: newSeed
      });
      dispatch(setCard({type:CardTypes.SEED_REPLACE_BREED, spot: spot}, spot));
    }
  }
}

export const REMOVE_SEED = 'REMOVE_SEED';
export function replaceSeed(homestead: Homestead, oldSeed: Seed, newSeed: Seed,
  recordBook: RecordBook, reason: string = null) {
  return function(dispatch: any) {
    dispatch({
      type: REMOVE_SEED,
      seed: oldSeed
    });
    dispatch(addAndRecordSeed(newSeed, recordBook));

    if (reason == 'breed') {
      dispatch({
        type: SET_BREEDING,
        seedsBred: [],
        breedingTimeRemaining: null,
        breedingAgeLabel: homestead.getBreedingAgeLabel()
      });
    }
  }
}

export const SET_HARVEST_STACK_MAP = 'SET_HARVEST_STACK_MAP';
export function addHarvestStack(homestead: Homestead, harvestStack: HarvestStack) {
  homestead.addHarvestStack(harvestStack);
  return {
    type: SET_HARVEST_STACK_MAP,
    harvestStackMap: homestead.harvestStackMap
  }
}

export const TOGGLE_AUTO_ACTIONS = 'TOGGLE_AUTO_ACTIONS';
export function toggleAutoActions() {
  return {
    type: TOGGLE_AUTO_ACTIONS
  }
}
