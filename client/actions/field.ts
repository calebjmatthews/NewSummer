import Field from '../models/field';
import Seed from '../models/seed';

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
