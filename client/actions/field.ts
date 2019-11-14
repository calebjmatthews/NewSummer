import Field from '../models/field';
import Seed from '../models/seed/seed';
import Homestead from '../models/homestead';
import Family from '../models/seed/family';
import RealValueReturn from '../models/seed/real_value_return';

import { gainDollars } from './homestead';

export const SET_FIELDS = 'SET_FIELDS';
export function setFields(fields: { [id: number] : Field }) {
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

export const SET_SEED_DATA = 'SET_SEED_DATA';
export function plantSeed(field: Field, seed: Seed, seedMap: Map<number, Seed>) {
  let newField = new Field(field);
  newField.plantSeed(seed, seedMap);
  return {
    type: SET_SEED_DATA,
    fieldId: newField.id,
    seedPlantedId: newField.seedPlantedId,
    seedsAge: 0,
    seedMature: false,
    seedsNameLabel: newField.seedsNameLabel,
    seedsAgeLabel: newField.seedsAgeLabel
  }
}

export const SET_SEEDS_AGE = 'SET_SEEDS_AGE';
export function ageAllSeeds(fields: { [id: number] : Field }, duration = null,
  seedMap: Map<number, Seed>) {
  let seedAges: { [id: number] : number } = {};
  let seedAgeLabels: { [id: number] : string } = {};
  let seedMatures: { [id: number] : string } = {};
  Object.keys(fields).map((fieldId) => {
    let newField = new Field(fields[fieldId]);
    newField.ageSeed(duration, seedMap);
    seedAges[fieldId] = newField.seedsAge;
    seedAgeLabels[fieldId] = newField.seedsAgeLabel;
    seedMatures[fieldId] = newField.seedMature;
  });
	return {
    type: SET_SEEDS_AGE,
    seedAges: seedAges,
    seedAgeLabels: seedAgeLabels,
    seedMatures: seedMatures
  };
}

export function harvestSeed(field: Field, homestead: Homestead,
  seedMap: Map<number, Seed>, families: Map<string, Family>) {
  let newField = new Field(field);
  let harvestResult: RealValueReturn = newField.harvestSeed(seedMap, families);
  return function(dispatch: any) {
    dispatch(gainDollars(harvestResult.value, homestead));
    dispatch(setField(newField));
  }
}

export const CLEAR_HARVEST_RESULT = 'CLEAR_HARVEST_RESULT';
export function clearHarvestResult(field: Field) {
  return {
    type: CLEAR_HARVEST_RESULT,
    fieldId: field.id
  }
}
