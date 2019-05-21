import { SET_ID, IMPORT_AUTO_INCREMENT } from '../actions/auto_increment';

export default function
  (state = {},
    action = null) {
  let newState = {};
  switch(action.type) {
    case SET_ID:
      newState[action.fieldName] = action.newId;
      return Object.assign({}, state, newState);
      break;
    case IMPORT_AUTO_INCREMENT:
      Object.keys(action.autoIncrement).map((fieldName) => {
        newState[fieldName] = action.autoIncrement[fieldName];
      });
      return Object.assign({}, state, newState);
      break;
    default:
      return state;
  }
}
