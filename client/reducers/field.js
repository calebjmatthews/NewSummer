import {
  AGE_SEED, HARVEST_SEED, PLANT_SEED
} from '../actions/field';
import Field from '../models/field';

const FIELD_DEMO_ID = 0;
let fieldDemo = new Field(FIELD_DEMO_ID, 'Stone Row');

export default function
  (state = {
    field: fieldDemo
  },
    action = null) {
	switch(action.type) {
    case AGE_SEED:
      return Object.assign(
        {}, state, { field: action.field });
    case HARVEST_SEED:
      return Object.assign(
        {}, state, { field: action.field });
    case PLANT_SEED:
      return Object.assign(
        {}, state, { field: action.field });
		default:
			return state;
	}
};
