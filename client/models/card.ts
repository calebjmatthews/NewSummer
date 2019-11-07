import Seed from './seed/seed';

export default class Card implements CardInterface {
  spot: number;
  type: string;
  selectedSeed?: Seed;


  constructor(card: CardInterface) {
    Object.assign(this, card);
  }
}

interface CardInterface {
  spot: number;
  type: string;
  selectedSeed?: Seed;
}
