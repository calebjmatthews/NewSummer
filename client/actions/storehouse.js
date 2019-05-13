import Storehouse from '../models/storehouse';

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
  storehouse.addSeed(newSeed);
  return {
    type: SET_STOREHOUSE,
    storehouse: storehouse
  }
}

export function gainSeed(storehouse, seed) {
  storehouse.addSeed(seed);
  return {
    type: SET_STOREHOUSE,
    storehouse: storehouse
  }
}
