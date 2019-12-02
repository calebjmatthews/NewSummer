import Field from '../models/field';
import Seed from '../models/seed/seed';
import Homestead from '../models/homestead';
import Family from '../models/seed/family';
import RealValueReturn from '../models/seed/real_value_return';

import { gainDollars, addHarvestStack } from './homestead';

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
export function plantSeed(field: Field, seed: Seed, seedMap: { [id: number] : Seed }) {
  let newField = new Field(field);
  newField.plantSeed(seed, seedMap);
  return {
    type: SET_SEED_DATA,
    fieldId: newField.id,
    seedPlantedId: newField.seedPlantedId,
    lastSeedId: newField.seedPlantedId,
    seedsAge: 0,
    seedMature: false,
    seedsNameLabel: newField.seedsNameLabel,
    seedsAgeLabel: newField.seedsAgeLabel,
    spriteAddress: newField.spriteAddress,
    spriteStyle: newField.spriteStyle
  }
}

export const SET_SEEDS_AGE = 'SET_SEEDS_AGE';
export function ageAllSeeds(fields: { [id: number] : Field }, duration: number = null,
  seedMap: { [id: number] : Seed }) {
  let seedAges: { [id: number] : number } = {};
  let seedAgeLabels: { [id: number] : string } = {};
  let seedMatures: { [id: number] : string } = {};
  let spriteAddresses: { [id: number] : string } = {};
  let spriteStyles: { [id: number] : string } = {};
  Object.keys(fields).map((fieldId) => {
    let newField = new Field(fields[fieldId]);
    newField.ageSeed(duration, seedMap);
    seedAges[fieldId] = newField.seedsAge;
    seedAgeLabels[fieldId] = newField.seedsAgeLabel;
    seedMatures[fieldId] = newField.seedMature;
    spriteAddresses[fieldId] = newField.spriteAddress;
    spriteStyles[fieldId] = newField.spriteStyle;
  });
	return {
    type: SET_SEEDS_AGE,
    seedAges: seedAges,
    seedAgeLabels: seedAgeLabels,
    seedMatures: seedMatures,
    spriteAddresses: spriteAddresses,
    spriteStyles: spriteStyles
  };
}

export function harvestSeed(field: Field, homestead: Homestead,
  seedMap: { [id: number] : Seed }) {
  let newField = new Field(field);
  let harvestResult: RealValueReturn = newField.harvestSeed(seedMap);
  return function(dispatch: any) {
    dispatch(setField(newField));
  }
}

export function sellAllHarvest(field: Field, homestead: Homestead) {
  let newField = new Field(field);
  return function(dispatch: any) {
    dispatch(gainDollars(newField.harvestResult.value, homestead));
    newField.harvestResult = null;
    newField.harvestedSeedId = null;
    dispatch(setField(newField));
  }
}

export function sellHalfHarvest(field: Field, homestead: Homestead) {
  let newField = new Field(field);
  return function(dispatch: any) {
    let quantityToSell = Math.ceil(newField.harvestResult.harvestStack.quantity / 2);
    let valueOfSold = newField.harvestResult.harvestStack.totalValue *
      (quantityToSell / newField.harvestResult.harvestStack.quantity);
    newField.harvestResult.harvestStack.quantity -= quantityToSell;
    newField.harvestResult.harvestStack.totalValue -= valueOfSold;
    dispatch(gainDollars(valueOfSold, homestead));
    dispatch(addHarvestStack(homestead, newField.harvestResult.harvestStack));
    newField.harvestResult = null;
    newField.harvestedSeedId = null;
    dispatch(setField(newField));
  }
}

export function collectAllHarvest(field: Field, homestead: Homestead) {
  let newField = new Field(field);
  return function(dispatch: any) {
    dispatch(addHarvestStack(homestead, newField.harvestResult.harvestStack));
    newField.harvestResult = null;
    newField.harvestedSeedId = null;
    dispatch(setField(newField));
  }
}
