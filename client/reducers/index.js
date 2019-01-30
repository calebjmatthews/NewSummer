import { combineReducers } from 'redux';

import fieldReducer from './field';
import storehouseReducer from './storehouse';
import economyReducer from './economy';

const rootReducer = combineReducers({
  fieldState: fieldReducer,
  storehouseState: storehouseReducer,
  economyState: economyReducer
})

export default rootReducer;
