export default class Card implements CardInterface {
  spot: number;
  type: string;
  selectedCultivar?: string;

  constructor(card: CardInterface) {
    Object.assign(this, card);
  }
}

interface CardInterface {
  spot: number;
  type: string;
  selectedCultivar?: string;
}
