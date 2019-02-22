import {FRAMES_PER_SECOND, CARD_NAV_DURATION} from '../../constants';
import {pixiHandler} from '../../instances/pixi/handler';

export const INIT_NAV_CARDS = 'INIT_NAV_CARDS';
export function initNavCards(cardAnchor) {
  return {
    type: INIT_NAV_CARDS,
    cardAnchor: cardAnchor
  }
}

export const CARD_NAV_START_RIGHT = 'CARD_NAV_START_RIGHT';
export function cardNavStartRight(s) {
  let newSpot = 0;
  let numCards = 0;
  let eles = document.getElementsByClassName('game-card');
  Object.keys(eles).map(() => {
    numCards++;
  })
  if (s.spotCurrent <=
    (numCards-2)) {
    newSpot = s.spotCurrent + 1;
  }

  let res = calcStartingAndEndingPositions(s, newSpot);

  return {
    type: CARD_NAV_START_RIGHT,
    cardStartingPositions: res.cardStartingPositions,
    cardEndingPositions: res.cardEndingPositions
  };
}

export const CARD_NAV_START_LEFT = 'CARD_NAV_START_LEFT';
export function cardNavStartLeft(s) {
  let newSpot = s.cardStartingPositions.length-1;
  if (s.spotCurrent > 0) {
    newSpot = s.spotCurrent - 1;
  }

  let res = calcStartingAndEndingPositions(s, newSpot);

  return {
    type: CARD_NAV_START_LEFT,
    cardStartingPositions: res.cardStartingPositions,
    cardEndingPositions: res.cardEndingPositions
  };
}

function calcStartingAndEndingPositions(s, newSpot) {
  let eles = document.getElementsByClassName('game-card');
  let poss = [];
  Object.keys(eles).map((index) => {
    poss.push(eles[index].getBoundingClientRect());
  })

  let cardStartingPositions = [];
  let cardEndingPositions = [];
  for (let index = 0; index < poss.length; index++) {
    cardStartingPositions.push(poss[index].x);
    let position = (newSpot - index) * -1;
    cardEndingPositions.push(
      s.cardAnchor + (poss[index].width * position * 1.1)
    );
  }

  return { cardStartingPositions: cardStartingPositions,
    cardEndingPositions: cardEndingPositions };
}

const timeSteps = CARD_NAV_DURATION / Math.round(1000 / FRAMES_PER_SECOND);
export const CARD_NAV_STEP = 'CARD_NAV_STEP';
export const CARD_NAV_FINISHED = 'CARD_NAV_FINISHED';
export function cardNavStep(s) {
  let progress = s.progress + (1/timeSteps);
  if (progress > 1) { progress = 1; }
  if (s.progress < 1) {
    let cardCurrentPositions = [];
    let cardCurrentOffsets = [];
    let cVel = Math.round(((
      (s.cardStartingPositions[0] - s.cardEndingPositions[0])
      / timeSteps) / 0.6353102368) * Math.sin(Math.PI*progress));
    for (let index = 0; index < s.cardStartingPositions.length; index++) {
      cardCurrentPositions[index] = s.cardCurrentPositions[index] - cVel;
      cardCurrentOffsets[index] =
        -(s.cardAnchor - cardCurrentPositions[index]);
    }
    pixiHandler.setContainerOffset(cardCurrentOffsets[1]);
    return {
      type: CARD_NAV_STEP,
      progress: progress,
      cardCurrentPositions: cardCurrentPositions,
      cardCurrentOffsets: cardCurrentOffsets
    };
  }

  else {
    let newSpot = 0;
    if (s.direction == 'right') {
      if (s.spotCurrent <= (s.cardStartingPositions.length-2)) {
        newSpot = s.spotCurrent + 1;
      }
    }
    else if (s.direction == 'left') {
      if (s.spotCurrent > 0) {
        newSpot = s.spotCurrent - 1;
      }
      else {
        newSpot = s.cardStartingPositions.length-1;
      }
    }
    return {
      type: CARD_NAV_FINISHED,
      spotCurrent: newSpot
    };
  }
}
