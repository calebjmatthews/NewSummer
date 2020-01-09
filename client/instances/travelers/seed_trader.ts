import { Traveler, TravelerInterface } from '../../models/traveler/traveler';
import Offer from '../../models/traveler/offer';
import Seed from '../../models/seed/seed';
import Dialogue from '../../models/traveler/dialogue';
import Condition from '../../models/traveler/condition';
import { FamilyNames } from '../../models/enums/family_names';
import { TravelerRoles } from '../../models/enums/traveler_roles';
import { Comparitors } from '../../models/enums/comparitors';
import { families } from '../../instances/families';

class SeedTrader extends Traveler {
  constructor(seedTrader: TravelerInterface) {
    super(seedTrader);

    if (seedTrader.name == undefined) {
      this.name ='Susanna Pol';
      this.affection = 0;
      this.currentOffers = [];
      this.gifts = [];
    }
  }

  genOffers(cultivarsUnlocked: string[]) {
    let variation: number = 1;
    if (Math.random() > 0.9) {
      variation = 3;
    }
    let numToOffer: number = 3 + Math.floor(Math.log(cultivarsUnlocked.length));
    let offers: Offer[] = [];
    for (let loop = 0; loop < 100; loop++) {
      let newOffer = this.genOffer(offers, cultivarsUnlocked, variation);
      if (newOffer != null) {
        offers.push(newOffer);
      }
      if (offers.length >= numToOffer) {
        break;
      }
    }
    return offers;
  }

  genOffer(offers: Offer[], cultivarsUnlocked: string[], variation: number):
    Offer {
    let index = Math.floor(Math.random() * cultivarsUnlocked.length);
    let newSeed = new Seed({id: Math.floor(Math.random() * 100000),
      familyName: FamilyNames.POACEAE, methodObtained: 'Bought',
      dateObtained: new Date(Date.now()), parentsIds: [],
      cultivarName: cultivarsUnlocked[index]});
    let nameAlreadyExists: any = false;
    offers.map((offer) => {
      if (offer.item.name == newSeed.name) {
        nameAlreadyExists = true;
      }
    });
    if (nameAlreadyExists == true) {
      return null;
    }
    return new Offer({id: Math.floor(Math.random() * 100000), label:newSeed.name,
      price: (newSeed.idealValue * 2), sold: false, type: 'seed', item: newSeed,
      travelerRole: TravelerRoles.SEED_TRADER});
  }
}

let seedTraderTemplate = new SeedTrader({
  role: TravelerRoles.SEED_TRADER,
  frequency: .2,
  dialogues: [
    new Dialogue({id: 0,
      conditions: [new Condition({
        props: ['cast', 'getCurrentlyVisiting()', 'dialogueHistory', '0'],
        comparitor: Comparitors.EQUAL_TO,
        values: ['undefined'],
        type: 'string'
      })],
      important: true,
      probability: 1,
      text: 'Look at this, a farmer trying to grow something worthwhile in the grasslands! I\'m |cast,getCurrentlyVisiting(),name|, pleasure to meet you.'
    }),
    new Dialogue({id: 1,
      conditions: [new Condition({
        props: ['cast', 'getCurrentlyVisiting()', 'dialogueHistory', '1'],
        comparitor: Comparitors.EQUAL_TO,
        values: ['undefined'],
        type: 'string'
      })],
      important: false,
      probability: 1,
      text: 'You came in with the first shipload, right? You must have, or you wouldn\'t be out this far, this quickly.'
    }),
    new Dialogue({id: 2,
      conditions: [],
      important: false,
      probability: 0.1,
      text: 'Ah... Just let me rest my legs, it\'s been a long, dusty road.'
    }),
    new Dialogue({id: 3,
      conditions: [],
      important: false,
      probability: 0.1,
      text: 'If you ever get ahold of some rye, let me know. My mother used to make a hearty rye bread that would stick with you all day.'
    }),
    new Dialogue({id: 4,
      conditions: [],
      important: false,
      probability: 0.1,
      text: 'Make sure you\'re not in-breeding your crops too heavily. You need to be continually adding new gene lines in, or else you limit your crops.'
    })
  ],
  dialogueHistory: {}
});

export { SeedTrader, seedTraderTemplate };
