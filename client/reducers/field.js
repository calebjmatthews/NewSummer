import {
  SET_FIELD
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
    case SET_FIELD:
      return Object.assign(
        {}, state, { field: action.field });
		default:
			return state;
	}
};
