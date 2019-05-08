import {SET_RECORD_BOOK} from '../actions/record_book';
import {recordBook} from '../instances/record_book';

export default function
  (state = {
    recordBook: recordBook
  },
    action = null) {
  switch(action.type) {
    case SET_RECORD_BOOK:
      return Object.assign({}, state, { recordBook: action.recordBook });
    default:
      return state;
  }
}
