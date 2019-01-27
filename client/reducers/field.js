import {
  AGE_SEED
} from '../actions/field';
import Field from '../models/field';
import {seedDemo} from '../instances/seeds';

const FIELD_DEMO_ID = 0;
let fieldDemo = new Field(FIELD_DEMO_ID, 'Stone Row');
fieldDemo.plantSeed(seedDemo);

export default function
  (state = {
    field: fieldDemo
  },
    action = null) {
	switch(action.type) {
    case AGE_SEED:
      return Object.assign(
        {}, state, { field: action.field });
		default:
			return state;
	}
};
