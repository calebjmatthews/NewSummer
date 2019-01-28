import Storehouse from '../models/storehouse';

export const GAIN_DOLLARS = 'GAIN_DOLLARS';
export function gainDollars(storehouse, dollarsGained) {
  storehouse.gainDollars(dollarsGained);
  return {
    type: GAIN_DOLLARS,
    storehouse: storehouse
  }
}
