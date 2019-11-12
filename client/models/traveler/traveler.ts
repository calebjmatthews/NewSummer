import Offer from './offer';

export class Traveler implements TravelerInterface {
  role: string;
  frequency: number;
  dialogues: string[];

  name?: string
  affection?: number;
  currentOffers?: Offer[];
  gifts?: any[];

  constructor(traveler: TravelerInterface) {
    Object.assign(this, traveler);
  }

  genOffers(args: any) {
    console.log('genOffers not defined.');
    return null;
  }
}

export interface TravelerInterface {
  role: string;
  frequency: number;
  dialogues: string[];

  name?: string
  affection?: number;
  currentOffers?: Offer[];
  gifts?: any[];
}
