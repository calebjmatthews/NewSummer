import { combineReducers } from 'redux';

import fieldsReducer from './fields';
import storehouseReducer from './storehouse';
import economyReducer from './economy';

const rootReducer = combineReducers({
  fieldsState: fieldsReducer,
  storehouseState: storehouseReducer,
  economyState: economyReducer
})

export default rootReducer;
