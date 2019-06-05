import {
  SET_FIELDS
} from '../actions/field';
import Field from '../models/field';
import Cache from '../models/cache';

let fields = new Cache([
  new Field(0, 0, 'Stone Row', 2, 3, 6),
  new Field(1, 1, 'Dusty Corner', 3, 2, 5)
]);

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
