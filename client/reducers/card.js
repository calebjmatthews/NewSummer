import { SET_ALL_CARDS, SET_CARD, ADD_CARD, REMOVE_CARD }
  from '../actions/card';

export default function
  (state = {
    cards: []
  },
    action = null) {
	switch(action.type) {
    case SET_ALL_CARDS:
      return Object.assign({}, state, { cards: action.cards });
      break;
    case SET_CARD:
      let newState = Object.assign({}, state, {
        cards: state.cards.map((item, index) => {
          if(index == action.index) {
            return action.card;
          }
          return item;
        })
      });
      return Object.assign({}, state, {
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
		default:
			return state;
	}
};
