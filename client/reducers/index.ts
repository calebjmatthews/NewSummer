import { combineReducers } from 'redux';
import FieldsReducer from './fields';
import CardsReducer from './cards';
import ModalReducer from './modal';
import HomesteadReducer from './homestead';
import RecordBookReducer from './record_book';
import CastReducer from './cast';

const rootReducer = combineReducers({
  fields: FieldsReducer,
  cardState: CardsReducer,
  modals: ModalReducer,
  homestead: HomesteadReducer,
  recordBook: RecordBookReducer,
  cast: CastReducer
});

export default rootReducer;
