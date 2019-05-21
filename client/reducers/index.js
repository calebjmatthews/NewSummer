import { combineReducers } from 'redux';

import fieldsReducer from './fields';
import storehouseReducer from './storehouse';
import economyReducer from './economy';
import recordBookReducer from './record_book';
import castReducer from './cast';
import cardReducer from './card';
import cardNavReducer from './animation/card_nav';
import autoIncrementReducer from './auto_increment';

const rootReducer = combineReducers({
  fieldsState: fieldsReducer,
  storehouseState: storehouseReducer,
  economyState: economyReducer,
  recordBookState: recordBookReducer,
  castState: castReducer,
  cardState: cardReducer,
  cardNavState: cardNavReducer,
  autoIncrementState: autoIncrementReducer
})

export default rootReducer;
