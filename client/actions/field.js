import Field from '../models/field';

import {gainDollars} from './storehouse';

export const SET_FIELDS = 'SET_FIELDS';
export function setFields(fields) {
  return {
    type: SET_FIELDS,
    fields: fields
  };
}

export function ageAllSeeds(fields) {
  fields.getAll().map((field) => {
    field.ageSeed();
  })
	return setFields(fields);
};

export function harvestSeed(fields, storehouse, fieldId) {
  const dollars = fields.getByProperty('id', fieldId).harvestSeed();
  return function(dispatch) {
    dispatch(gainDollars(storehouse, dollars));
    return setFields(fields);
  }
}

export function plantSeed(fields, fieldId, seed) {
  fields.getByProperty('id', fieldId).plantSeed(seed);
  return setFields(fields);
}

export function addField(fields, field) {
  fields.add(field);
  return setFields(fields);
}

export function gatherSeedFromEvent(fields, fieldId, seed) {
  let field = fields.getByProperty('id', fieldId);
  field.currentEvent.gatheredDict[seed.id] = true;
  if (field.currentEvent.eventCompleted()) {
    field.currentEvent = null;
  }
  console.log('field.currentEvent');
  console.log(field.currentEvent);
  return setFields(fields);
}
