import Field from '../models/field';

import { gainDollars } from './storehouse';
import { genIdBatch } from './auto_increment';
import { eventFactoryDict } from '../instances/field_event_factories';

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
  let field = fields.getByProperty('id', fieldId);
  field.harvestSeed();
  const dollars = field.harvestResult.value;
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

export function startFieldEvent(fields, autoIncrement, fieldId,
  fieldEventName) {
  return function(dispatch) {
    let newEvent = eventFactoryDict[fieldEventName].genFieldEvent();
    let newSeedIds = dispatch(genIdBatch(autoIncrement, 'seed',
      newEvent.seeds.length));
    newEvent.setSeedIds(newSeedIds.newIds);
    fields.getByProperty('id', fieldId).currentEvent = newEvent;
    return setFields(fields);
  }
}

export function gatherSeedFromEvent(fields, fieldId, seed) {
  let field = fields.getByProperty('id', fieldId);
  field.currentEvent.gatheredDict[seed.id] = true;
  if (field.currentEvent.eventCompleted()) {
    field.currentEvent = null;
  }
  return setFields(fields);
}

export function clearHarvestResult(fields, fieldId) {
  let field = fields.getByProperty('id', fieldId);
  field.harvestResult = null;
  return setFields(fields);
}
