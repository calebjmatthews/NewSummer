import Field from '../models/field';

import {gainDollars} from './storehouse';

export const SET_FIELD = 'SET_FIELD';
export function ageSeed(field) {
  field.ageSeed();
	return {
    type: SET_FIELD,
    field: field
  };
};

export function harvestSeed(field, storehouse) {
  const dollars = field.harvestSeed();
  return function(dispatch) {
    dispatch(gainDollars(storehouse, dollars));
    return {
      type: SET_FIELD,
      field: field
    }
  }
}

export function plantSeed(field, seed) {
  field.plantSeed(seed);
  return {
    type: SET_FIELD,
    field: field
  }
}
