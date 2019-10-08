import {
  SET_FIELDS
} from '../actions/field';
import Field from '../models/field';

let startingFields: Map<number, Field> = new Map();
startingFields.set(0,
  new Field({id: 0, name: 'Stone Row', seedPlanted: null,
    seedsNameLabel: 'Nothing planted', seedsAge: 0, seedsAgeLabel: '',
    seedsGrowthStage: 0}));
startingFields.set(1,
  new Field({id: 1, name: 'Dusty Corner', seedPlanted: null,
    seedsNameLabel: 'Nothing planted', seedsAge: 0, seedsAgeLabel: '',
    seedsGrowthStage: 0}));

export default function
  (fields: Map<number, Field> = startingFields,
    action = null) {
	switch(action.type) {
    case SET_FIELDS:
      return Object.assign(
        {}, fields, action.fields);
		default:
			return fields;
	}
};
