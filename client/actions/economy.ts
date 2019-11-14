import Economy from '../models/economy';
import Field from '../models/field';
import Homestead from '../models/homestead';
import Cast from '../models/traveler/cast';
import RecordBook from '../models/record_book';
import Offer from '../models/traveler/offer';
import { Traveler } from '../models/traveler/traveler';

import {spendDollars, addAndRecordSeed, setHomestead, gainDollars} from './homestead';
import {setCast} from './cast';
import {setCard} from './card';

export const SET_ECONOMY = 'SET_ECONOMY';
export const BUY_INSUFFICIENT_FUNDS = 'BUY_INSUFFICIENT_FUNDS';
export function buySeedAttempt(economy: Economy, homestead: Homestead, cast: Cast,
  recordBook: RecordBook, offer: Offer, spot: number) {
  if (homestead.dollars >= offer.price) {
    return function(dispatch: any) {
      let matchingTraveler: Traveler = null;
      Object.keys(cast.members).map((travelerRole) => {
        let traveler = cast.members[travelerRole];
        if (traveler.role == offer.travelerRole) {
          matchingTraveler = traveler;
        }
      });
      matchingTraveler.currentOffers.map((cOffer) => {
        if (cOffer.id == offer.id) {
          cOffer.sold = true;
        }
      });
      dispatch(spendDollars(offer.price, homestead));
      if (homestead.isCultivarFull(
        offer.item.cultivarName, recordBook.seedMap) == false) {
        dispatch(setCast(cast));
        dispatch(addAndRecordSeed(offer.item));
      }
      else {
        homestead.intermediateSeed = offer.item;
        dispatch(setCard({type:"seedReplaceBuy", spot: spot}, spot));
        dispatch(setHomestead(homestead));
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

export function seedBuyCancel(economy: Economy, homestead: Homestead, spot: number) {
  return function(dispatch: any) {
    dispatch(gainDollars(economy.intermediateSpend, homestead));
    homestead.intermediateSeed = null;
    dispatch(setHomestead(homestead));
    dispatch(setCard({type: null, spot: spot}, spot));

    economy.intermediateSpend = null;
    return {
      type: SET_ECONOMY,
      economy: economy
    };
  }
}

export const ECONOMY_MESSAGE_CLEAR = 'ECONOMY_MESSAGE_CLEAR';
