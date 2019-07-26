import Economy from '../models/economy';
import Field from '../models/field';

import {spendDollars, addSeed, setStorehouse, gainDollars} from './storehouse';
import {addField} from './field';
import {setCast} from './cast';
import {setCard} from './card';

export const SET_ECONOMY = 'SET_ECONOMY';
export const BUY_INSUFFICIENT_FUNDS = 'BUY_INSUFFICIENT_FUNDS';
export function buyFieldAttempt(economy, storehouse, fields) {
  const fieldCost = economy.getFieldPrice();
  if (storehouse.dollars >= fieldCost) {
    return function(dispatch) {
      economy.recordBoughtField();
      let newField = new Field(Math.floor(Math.random() * 10000),
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

export function buySeedAttempt(economy, storehouse, cast, recordBook, offer,
  spot) {
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
        dispatch(addSeed(storehouse, recordBook, offer.item));
      }
      else {
        storehouse.intermediateSeed = offer.item;
        dispatch(setCard({type:"seedReplace"}, spot));
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

export function seedBuyCancel(economy, storehouse, spot) {
  return function(dispatch) {
    dispatch(gainDollars(storehouse, economy.intermediateSpend));
    storehouse.intermediateSeed = null;
    dispatch(setStorehouse(storehouse));
    dispatch(setCard({type: null}, spot));

    economy.intermediateSpend = null;
    return {
      type: SET_ECONOMY,
      economy: economy
    };
  }
}

export const ECONOMY_MESSAGE_CLEAR = 'ECONOMY_MESSAGE_CLEAR';
