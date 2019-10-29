import { combineReducers } from 'redux';
import FieldsReducer from './fields';
import CardsReducer from './cards';
import ModalReducer from './modal';
import HomesteadReducer from './homestead';

const rootReducer = combineReducers({
  fields: FieldsReducer,
  cardState: CardsReducer,
  modals: ModalReducer,
  homestead: HomesteadReducer
});

export default rootReducer;
