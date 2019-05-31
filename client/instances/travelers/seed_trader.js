import Traveler from '../../models/traveler';
import Offer from '../../models/offer';
import Seed from '../../models/seed';
import { POACEAE } from '../families';

const SUSANNA_POL = 'Susanna Pol';
let seedTrader = new Traveler(SUSANNA_POL, .2, 0, [],
  ['Ah... Just let me rest my legs, it\'s been a long, dusty road.'],
  []
);

seedTrader.genOffers = function(cultivarsUnlocked) {
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
  let newSeed = new Seed(null, POACEAE, cultivarsUnlocked[index], 'Bought',
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
    false, 'seed', newSeed, SUSANNA_POL);
}

export {seedTrader, SUSANNA_POL};
