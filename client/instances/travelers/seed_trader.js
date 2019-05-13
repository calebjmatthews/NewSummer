import Traveler from '../../models/traveler';
import Offer from '../../models/offer';
import Seed from '../../models/seed';
import { POACEAE } from '../families';

let seedTrader = new Traveler('Susanna Pol', .2, 0, [],
  ['Ah... Just let me rest my legs, it\'s been a long, dusty road.'],
  []
);

seedTrader.createOffers = function(cultivarsUnlocked) {
  let variation = 1;
  if (Math.random() > 0.9) {
    variation = 3;
  }
  let numToOffer = 3 + Math.floor(Math.log(cultivarsUnlocked.length));
  let offers = [];
  for (let loop = 0; loop < 100; loop++) {
    let newOffer = genOffer(offers, cultivarsUnlocked, variation);
    if (newOffer != null) {
      offers.push(newOffer);
    }
    if (offers.length >= numToOffer) {
      break;
    }
  }
  return offers;
}

function genOffer(offers, cultivarsUnlocked, variation) {
  let index = Math.floor(Math.random() * cultivarsUnlocked.length);
  let newSeed = new Seed(POACEAE, cultivarsUnlocked[index], 'Bought',
    new Date(Date.now()), variation);
  let nameAlreadyExists = false;
  offers.map((offer) => {
    if (offer.item.name == newSeed.name) {
      nameAlreadyExists = true;
    }
  });
  if (nameAlreadyExists == true) {
    return null;
  }
  return new Offer(newSeed.name, (parseFloat(newSeed.idealValue) * 2),
    false, 'seed', newSeed);
}

export {seedTrader};
