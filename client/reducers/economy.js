import {
  BUY_SUCCESS,
  BUY_INSUFFICIENT_FUNDS,
  ECONOMY_MESSAGE_CLEAR
} from '../actions/economy';
import Economy from '../models/economy';

let economy = new Economy();

export default function
  (state = {
    economy: economy,
    message: null
  },
    action = null) {
	switch(action.type) {
    case BUY_SUCCESS:
      return Object.assign(
        {}, state, { economy: action.economy });
    case BUY_INSUFFICIENT_FUNDS:
      return Object.assign(
        {}, state, { message: action.message });
    case ECONOMY_MESSAGE_CLEAR:
      return Object.assign(
        {}, state, { message: null });                
		default:
			return state;
	}
};
