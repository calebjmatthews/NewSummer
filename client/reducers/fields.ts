import {
  SET_FIELDS, SET_FIELD
} from '../actions/field';
import Field from '../models/field';

let startingFields: Map<number, Field> = new Map();
startingFields.set(0,
  new Field({id: 0, name: 'Stone Row', seedPlantedId: null,
    seedsNameLabel: 'Nothing planted', seedsAge: 0, seedMature: false, seedsAgeLabel: '',
    harvestResult: null, temperature: 2, moisture: 3, fertility: 6, pests: 0,
    disease: 2}));
startingFields.set(1,
  new Field({id: 1, name: 'Dusty Corner', seedPlantedId: null,
    seedsNameLabel: 'Nothing planted', seedsAge: 0, seedMature: false, seedsAgeLabel: '',
    harvestResult: null, temperature: 3, moisture: 2, fertility: 5, pests: 1,
    disease: 1}));

export default function
  (fields: Map<number, Field> = startingFields,
    action = null) {
	switch(action.type) {
    case SET_FIELDS:
      var newFields: Map<number, Field> = new Map();
      action.fields.forEach((field: Field) => {
        newFields.set(field.id, field);
      });
      return newFields;
    case SET_FIELD:
      var newFields: Map<number, Field> = new Map();
      fields.forEach((field: Field) => {
        if (field.id == action.field.id) {
          newFields.set(action.field.id, action.field);
        }
        else {
          newFields.set(field.id, field);
        }
      });
      return newFields;
		default:
			return fields;
	}
};
