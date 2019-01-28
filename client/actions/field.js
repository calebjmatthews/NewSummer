import Field from '../models/field';

import {gainDollars} from './storehouse';

export const AGE_SEED = 'AGE_SEED';
export function ageSeed(field) {
  field.ageSeed();
	return {
    type: AGE_SEED,
    field: field
  };
};

export const HARVEST_SEED = 'HARVEST_SEED';
export function harvestSeed(field, storehouse) {
  const dollars = field.harvestSeed();
  return function(dispatch) {
    dispatch(gainDollars(storehouse, dollars));
    return {
      type: HARVEST_SEED,
      field: field
    }
  }
}
