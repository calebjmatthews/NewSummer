import { combineReducers } from 'redux';
import FieldsReducer from './fields';
import CardsReducer from './cards';

const rootReducer = combineReducers({
  fields: FieldsReducer,
  cardState: CardsReducer
});

export default rootReducer;
