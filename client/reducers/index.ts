import { combineReducers } from 'redux';
import FieldsReducer from './fields';
import CardsReducer from './cards';
import ModalReducer from './modal';
import HomesteadReducer from './homestead';
import RecordBookReducer from './record_book';
import CastReducer from './cast';
import EconomyReducer from './economy';

const rootReducer = combineReducers({
  fields: FieldsReducer,
  cardState: CardsReducer,
  modals: ModalReducer,
  homestead: HomesteadReducer,
  recordBook: RecordBookReducer,
  cast: CastReducer,
  economy: EconomyReducer
});

export default rootReducer;
