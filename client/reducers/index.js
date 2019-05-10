import { combineReducers } from 'redux';

import fieldsReducer from './fields';
import storehouseReducer from './storehouse';
import economyReducer from './economy';
import recordBookReducer from './record_book';
import castReducer from './cast';
import cardNavReducer from './animation/card_nav';

const rootReducer = combineReducers({
  fieldsState: fieldsReducer,
  storehouseState: storehouseReducer,
  economyState: economyReducer,
  recordBookState: recordBookReducer,
  castState: castReducer,
  cardNavState: cardNavReducer
})

export default rootReducer;
