import Economy from '../models/economy';
import Field from '../models/field';
import {autoIncrement} from '../instances/auto_increment';

import {spendDollars} from './storehouse';
import {addField} from './field';

export const BUY_SUCCESS = 'BUY_SUCCESS';
export const BUY_INSUFFICIENT_FUNDS = 'BUY_INSUFFICIENT_FUNDS';
export function buyFieldAttempt(economy, storehouse, fields) {
  const fieldCost = economy.getFieldPrice();
  if (storehouse.dollars >= fieldCost) {
    return function(dispatch) {
      economy.recordBoughtField();
      let newField = new Field(autoIncrement.genId('field'),
        (fields.getLength()), ('Field #' + (fields.getLength()-1)));

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
