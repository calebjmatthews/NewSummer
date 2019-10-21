import Card from './card';

export default class CardState {
  cards: Card[];
  lastCards: Card[][];

  constructor(cardState: CardState) {
    Object.assign(this, cardState);
  }
}
