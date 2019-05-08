import {
  SET_FIELDS
} from '../actions/field';
import Field from '../models/field';
import Cache from '../models/cache';
import {autoIncrement} from '../instances/auto_increment';

let fields = new Cache([
  new Field(autoIncrement.genId('field'), 0, 'Stone Row'),
  new Field(autoIncrement.genId('field'), 1, 'Dusty Corner')
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
