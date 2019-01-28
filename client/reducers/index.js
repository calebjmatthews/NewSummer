import { combineReducers } from 'redux';

import fieldReducer from './field';
import storehouseReducer from './storehouse';

const rootReducer = combineReducers({
  fieldState: fieldReducer,
  storehouseState: storehouseReducer
})

export default rootReducer;
