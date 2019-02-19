import {FRAMES_PER_SECOND, CARD_NAV_DURATION} from '../../constants';

export const CARD_NAV_START_RIGHT = 'CARD_NAV_START_RIGHT';
export function cardNavStartRight(cardStartingPositions, cardEndingPositions,
  cardAnchor) {
  return {
    type: CARD_NAV_START_RIGHT,
    cardStartingPositions: cardStartingPositions,
    cardEndingPositions: cardEndingPositions,
    cardAnchor: cardAnchor
  };
}

export const CARD_NAV_START_LEFT = 'CARD_NAV_START_LEFT';
export function cardNavStartLeft(cardStartingPositions, cardEndingPositions,
  cardAnchor) {
  return {
    type: CARD_NAV_START_LEFT,
    cardStartingPositions: cardStartingPositions,
    cardEndingPositions: cardEndingPositions,
    cardAnchor: cardAnchor
  };
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
    for (let index = 0; index < s.cardStartingPositions.length; index++) {
      let cVel = Math.round(((
        (s.cardStartingPositions[index] - s.cardEndingPositions[index])
      / timeSteps) / 0.6353102368) * Math.sin(Math.PI*progress));
      cardCurrentPositions[index] = s.cardCurrentPositions[index] + cVel;
      cardCurrentOffsets[index] =
        s.cardAnchor - cardCurrentPositions[index];
    }
    return {
      type: CARD_NAV_STEP,
      progress: progress,
      cardCurrentPositions: cardCurrentPositions,
      cardCurrentOffsets: cardCurrentOffsets
    };
  }
  else {
    return {
      type: CARD_NAV_FINISHED
    };
  }
}
