import Economy from '../models/economy';
import Field from '../models/field';
import {autoIncrement} from '../instances/auto_increment';

import {spendDollars, addSeed, setStorehouse} from './storehouse';
import {addField} from './field';
import {setCast} from './cast';

export const SET_ECONOMY = 'SET_ECONOMY';
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
        type: SET_ECONOMY,
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

export function buySeedAttempt(economy, storehouse, cast, offer) {
  if (storehouse.dollars >= offer.price) {
    return function(dispatch) {
      let matchingTraveler = null;
      cast.members.map((traveler) => {
        if (traveler.name == offer.travelerName) {
          matchingTraveler = traveler;
        }
      });
      matchingTraveler.currentOffers.map((cOffer) => {
        if (cOffer.id == offer.id) {
          cOffer.sold = true;
        }
      });
      dispatch(spendDollars(storehouse, offer.price));
      if (storehouse.isCultivarFull(offer.item.cultivarName) == false) {
        dispatch(setCast(cast));
        dispatch(addSeed(storehouse, offer.item));
      }
      else {
        console.log('Cultivar storage full.');
        storehouse.intermediateSeed = offer.item;
        dispatch(setStorehouse(storehouse));
        economy.intermediateSpend = offer.price;
      }
      return {
        type: SET_ECONOMY,
        economy: economy
      };
    }
  }
  else {
    return {
      type: BUY_INSUFFICIENT_FUNDS,
      message: 'You don\'t have enough money to afford the seed right now.'
    };
  }
}

export const ECONOMY_MESSAGE_CLEAR = 'ECONOMY_MESSAGE_CLEAR';
