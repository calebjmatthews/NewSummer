import { combineReducers } from 'redux';

import fieldReducer from './field';

const rootReducer = combineReducers({
  fieldState: fieldReducer
})

export default rootReducer;
