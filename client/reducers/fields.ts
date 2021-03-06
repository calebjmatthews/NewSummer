import {
  SET_FIELDS, SET_FIELD, SET_SEED_DATA, SET_SEEDS_AGE
} from '../actions/field';
import Field from '../models/field';

let startingFields: { [id: number] : Field } = {};
startingFields[0] =
  new Field({id: 0, name: 'Stone Row', seedPlantedId: null, lastSeedId: null,
    seedsNameLabel: 'Nothing planted', seedsAge: 0, seedMature: false, seedsAgeLabel: '',
    spriteAddress: null, spriteStyle: null, harvestResult: null, harvestedSeedId: null,
    temperature: 2, moisture: 3, fertility: 6, pests: 0, disease: 2});
startingFields[1] =
  new Field({id: 1, name: 'Dusty Corner', seedPlantedId: null, lastSeedId: null,
    seedsNameLabel: 'Nothing planted', seedsAge: 0, seedMature: false, seedsAgeLabel: '',
    spriteAddress: null, spriteStyle: null, harvestResult: null, harvestedSeedId: null,
    temperature: 3, moisture: 2, fertility: 5, pests: 1, disease: 1});

export default function
  (fields: { [id: number] : Field } = startingFields,
    action = null) {
	switch(action.type) {
    case SET_SEED_DATA:
      var field = fields[action.fieldId];
      return {...fields,
        [action.fieldId]: {
          ...field,
          seedPlantedId: action.seedPlantedId,
          lastSeedId: action.lastSeedId,
          seedsAge: action.seedsAge,
          seedMature: action.seedMature,
          seedsNameLabel: action.seedsNameLabel,
          seedsAgeLabel: action.seedsAgeLabel,
          spriteAddress: action.spriteAddress,
          spriteStyle: action.spriteStyle
        }
      }
    case SET_SEEDS_AGE:
      var newFields: { [id: number] : Field } = {
        ...Object.keys(fields).map((fieldId) => {
          return {
            ...fields[fieldId],
            seedsAge: action.seedAges[fieldId],
            seedsAgeLabel: action.seedAgeLabels[fieldId],
            seedMature: action.seedMatures[fieldId],
            spriteAddress: action.spriteAddresses[fieldId],
            spriteStyle: action.spriteStyles[fieldId]
          }
        })
      }
      return newFields;
    case SET_FIELDS:
      var newFields: { [id: number] : Field } = {};
      Object.keys(action.fields).map((fieldId) => {
        newFields[fieldId] = action.fields[fieldId];
      });
      return newFields;
    case SET_FIELD:
      var singleField: { [id: number] : Field } = {};
      singleField[action.field.id] = action.field;
      return Object.assign({}, fields, singleField);
		default:
			return fields;
	}
};
