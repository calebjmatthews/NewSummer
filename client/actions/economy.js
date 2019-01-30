import Economy from '../models/economy';

import {spendDollars} from './storehouse';

export const BUY_SUCCESS = 'BUY_SUCCESS';
export const BUY_INSUFFICIENT_FUNDS = 'BUY_INSUFFICIENT_FUNDS';
export function buyFieldAttempt(economy, storehouse) {
  const fieldCost = economy.getFieldPrice();
  if (storehouse.dollars >= fieldCost) {
    return function(dispatch) {
      economy.recordBoughtField();
      dispatch(spendDollars(storehouse, fieldCost));
      return {
        type: BUY_SUCCESS,
        economy: economy
      };
    }
  }
  else {
    return {
      type: BUY_INSUFFICIENT_FUNDS,
      message: 'You don\'t have enough money to affort a field right now.'
    };
  }
};

export const ECONOMY_MESSAGE_CLEAR = 'ECONOMY_MESSAGE_CLEAR';
