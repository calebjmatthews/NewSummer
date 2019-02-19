import {
  CARD_NAV_START_RIGHT,
  CARD_NAV_START_LEFT,
  CARD_NAV_STEP,
  CARD_NAV_FINISHED
} from '../../actions/animation/card_nav';

export default function
  (state = {
    animating: false,
    direction: 'right',
    progress: 0,
    cardStartingPositions: [],
    cardEndingPositions: [],
    cardCurrentPositions: [],
    cardCurrentOffsets: []
  },
    action = null) {
	switch(action.type) {
    case CARD_NAV_START_RIGHT:
      return Object.assign(
        {}, state, { animating: true, direction: 'right', progress: 0,
          cardStartingPositions: action.cardStartingPositions,
          cardCurrentPositions: action.cardStartingPositions,
          cardEndingPositions: action.cardEndingPositions,
          cardAnchor: action.cardAnchor });
    case CARD_NAV_START_LEFT:
      return Object.assign(
        {}, state, { animating: true, direction: 'left', progress: 0,
          cardStartingPositions: action.cardStartingPositions,
          cardCurrentPositions: action.cardStartingPositions,
          cardEndingPositions: action.cardEndingPositions,
          cardAnchor: action.cardAnchor });
    case CARD_NAV_STEP:
      return Object.assign(
        {}, state, { progress: action.progress,
          cardCurrentPositions: action.cardCurrentPositions,
          cardCurrentOffsets: action.cardCurrentOffsets });
    case CARD_NAV_FINISHED:
      return Object.assign(
        {}, state, { animating: false });
		default:
			return state;
	}
};
