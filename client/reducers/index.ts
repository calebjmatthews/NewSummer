import { combineReducers } from 'redux';
import FieldsReducer from './fields';
import CardsReducer from './cards';
import ModalReducer from './modal';

const rootReducer = combineReducers({
  fields: FieldsReducer,
  cardState: CardsReducer,
  modals: ModalReducer
});

export default rootReducer;
