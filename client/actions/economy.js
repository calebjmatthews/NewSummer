import Economy from '../models/economy';
import Field from '../models/field';

import {spendDollars} from './storehouse';
import {addField} from './field';

export const BUY_SUCCESS = 'BUY_SUCCESS';
export const BUY_INSUFFICIENT_FUNDS = 'BUY_INSUFFICIENT_FUNDS';
export function buyFieldAttempt(economy, storehouse, fields) {
  const fieldCost = economy.getFieldPrice();
  if (storehouse.dollars >= fieldCost) {
    return function(dispatch) {
      economy.recordBoughtField();
      let newField = new Field(Math.floor(Math.random() * 10000),
        (fields.getLength()+1), ('Field #' + fields.getLength()));

      dispatch(spendDollars(storehouse, fieldCost));
      dispatch(addField(fields, newField));
      return {
        type: BUY_SUCCESS,
        economy: economy
      };
    }
  }
  else {
    return {
      type: BUY_INSUFFICIENT_FUNDS,
      message: 'You don\'t have enough money to afford a field right now.'
    };
  }
};

export const ECONOMY_MESSAGE_CLEAR = 'ECONOMY_MESSAGE_CLEAR';
