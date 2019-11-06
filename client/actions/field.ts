import Field from '../models/field';
import Seed from '../models/seed/seed';
import Homestead from '../models/homestead';
import Family from '../models/seed/family';
import RealValueReturn from '../models/seed/real_value_return';

import { gainDollars } from './homestead';

export const SET_FIELDS = 'SET_FIELDS';
export function setFields(fields: Map<number, Field>) {
  return {
    type: SET_FIELDS,
    fields: fields
  };
}

export const SET_FIELD = 'SET_FIELD';
export function setField(field: Field) {
  return {
    type: SET_FIELD,
    field: field
  };
}

export function plantSeed(field: Field, seed: Seed, seedMap: Map<number, Seed>) {
  field.plantSeed(seed, seedMap);
  return setField(field);
}

export function ageAllSeeds(fields: Map<number, Field>, duration = null,
  seedMap: Map<number, Seed>) {
  fields.forEach((field) => {
    field.ageSeed(duration, seedMap);
  })
	return setFields(fields);
}

export function harvestSeed(field: Field, homestead: Homestead,
  seedMap: Map<number, Seed>, families: Map<string, Family>) {
  let harvestResult: RealValueReturn = field.harvestSeed(seedMap, families);
  return function(dispatch: any) {
    dispatch(gainDollars(harvestResult.value, homestead));
    dispatch(setField(field));
  }
}
