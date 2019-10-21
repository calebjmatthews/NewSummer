export default class Card implements CardInterface {
  spot: number;
  type: string;

  constructor(card: CardInterface) {
    Object.assign(this, card);
  }
}

interface CardInterface {
  spot: number;
  type: string;
}
