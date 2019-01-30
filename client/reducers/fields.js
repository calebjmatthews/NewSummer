import {
  SET_FIELDS
} from '../actions/field';
import Field from '../models/field';
import Cache from '../models/cache';

const FIELD_DEMO_ID = Math.floor(Math.random() * 10000);
let fields = new Cache([
  new Field(FIELD_DEMO_ID, 0, 'Stone Row')
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
