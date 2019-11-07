import { SET_ALL_CARDS, SET_CARD, ADD_CARD, REMOVE_CARD, REVERT_CARD }
  from '../actions/card';
import Card from '../models/card';
import CardState from '../models/card_state';

export default function
  (cardState: CardState = new CardState({
    cards: [new Card({spot: 0, type: null}), new Card({spot: 1, type: null})],
    lastCards: [[new Card({spot: 0, type: null})], [new Card({spot: 1, type: null})]]
  }),
    action = null) {
	switch(action.type) {
    case SET_ALL_CARDS:
      return new CardState({
        cards: action.cards.slice(),
        lastCards: action.cards.slice()
      });
      break;
    case SET_CARD:
      return new CardState({
        lastCards: cardState.lastCards.map((cSpot, index) => {
          if (index == action.spot) {
            return [...cSpot, cardState.cards[index]];
          }
          else {
            return cSpot;
          }
        }),
        cards: cardState.cards.map((cCard, index) => {
          if (index == action.spot) {
            return new Card(action.card);
          }
          else {
            return cCard;
          }
        })
      })
      break;
    case ADD_CARD:
      return new CardState({
        cards: [...cardState.cards, action.card],
        lastCards: [...cardState.lastCards, action.card]
      });
    case REMOVE_CARD:
      return new CardState({
        cards: cardState.cards.filter((item, index) => {
          if (index == action.spot) {
            return false;
          }
          else {
            return true;
          }
        }),
        lastCards: cardState.lastCards.filter((item, index) => {
          if (index == action.spot) {
            return false;
          }
          else {
            return true;
          }
        })
      });
      break;
    case REVERT_CARD:
      return new CardState({
        cards: cardState.cards.map((card, index) => {
          if(index == action.spot) {
            return cardState.lastCards[index][cardState.lastCards[index].length-1];
          }
          else {
            return card;
          }
        }),
        lastCards: cardState.lastCards.map((card, index) => {
          if (index == action.spot) {
            return [...cardState.lastCards[index].slice(0,
              (cardState.lastCards[index].length-1))];
          }
          else {
            return [...cardState.lastCards[index]];
          }
        })
      });
      break;
		default:
			return cardState;
	}
};
