import {
  AGE_CROP
} from '../actions/field';
import Field from '../models/field';

export default function
  (state = {
    field: new Field()
  },
    action = null) {
	switch(action.type) {
    case AGE_CROP:
      return Object.assign(
        {}, state, { field: action.field });
		default:
			return state;
	}
};
