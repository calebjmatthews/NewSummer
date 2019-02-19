import {
  SET_FIELDS
} from '../actions/field';
import Field from '../models/field';
import Cache from '../models/cache';

const FIELD_DEMO_ID1 = Math.floor(Math.random() * 10000);
const FIELD_DEMO_ID2 = Math.floor(Math.random() * 10000);
let fields = new Cache([
  new Field(FIELD_DEMO_ID1, 0, 'Stone Row'),
  new Field(FIELD_DEMO_ID2, 1, 'Dusty Corner')
])

export default function
  (state = {
    fields: fields
  },
    action = null) {
	switch(action.type) {
    case SET_FIELDS:
      return Object.assign(
        {}, state, { fields: action.fields });
		default:
			return state;
	}
};
