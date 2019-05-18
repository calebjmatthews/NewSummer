import { SET_ALL_CARDS, SET_CARD, ADD_CARD, REMOVE_CARD, REVERT_CARD }
  from '../actions/card';

export default function
  (state = {
    cards: [],
    lastCards: []
  },
    action = null) {
	switch(action.type) {
    case SET_ALL_CARDS:
      return Object.assign({}, state, {
        lastCards: action.cards.map(() => {
          return [];
        }),
        cards: action.cards
      });
      break;
    case SET_CARD:
      return Object.assign({}, state, {
        lastCards: state.lastCards.map((item, index) => {
          if (index == action.index) {
            return [...state.lastCards[index], state.cards[index]];
          }
          else {
            return [...state.lastCards[index]];
          }
        }),
        cards: state.cards.map((item, index) => {
          if(index == action.index) {
            return action.card;
          }
          return item;
        })
      });
      break;
    case ADD_CARD:
      return [...state, action.card];
      break;
    case REMOVE_CARD:
      return state.filter((item, index) => {
        if (index == action.index) {
          return false;
        }
        else {
          return true;
        }
      });
      break;
    case REVERT_CARD:
      return Object.assign({}, state, {
        cards: state.cards.map((item, index) => {
          if(index == action.index) {
            let thisCardHistory = state.lastCards[index];
            return (thisCardHistory[thisCardHistory.length-1]);
          }
          return item;
        }),
        lastCards: state.lastCards.map((item, index) => {
          if (index == action.index) {
            return [...state.lastCards[index].slice(0,
              (state.lastCards[index].length-1))];
          }
          else {
            return [...state.lastCards[index]];
          }
        })
      });
      break;
		default:
			return state;
	}
};
