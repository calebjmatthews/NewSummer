import { combineReducers } from 'redux';
import FieldsReducer from './fields';

const rootReducer = combineReducers({
  fields: FieldsReducer
});

export default rootReducer;
