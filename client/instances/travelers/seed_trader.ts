import { Traveler, TravelerInterface } from '../../models/traveler/traveler';
import Offer from '../../models/traveler/offer';
import Seed from '../../models/seed/seed';
import { FamilyNames } from '../../models/enums/family_names';
import { TravelerRoles } from '../../models/enums/traveler_roles';
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

let startingSeedTrader = new SeedTrader({
  role: TravelerRoles.SEED_TRADER,
  frequency: .2,
  dialogues: ["Ah... Just let me rest my legs, it's been a long, dusty road."]
});

export { SeedTrader, startingSeedTrader };
