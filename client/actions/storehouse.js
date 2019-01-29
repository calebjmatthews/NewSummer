import Storehouse from '../models/storehouse';

export const SET_STOREHOUSE = 'SET_STOREHOUSE';
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
