export const SET_ALL_CARDS = 'SET_ALL_CARDS';
export function setAllCards(cards) {
  return {
    type: SET_ALL_CARDS,
    cards: cards
  }
}

export const SET_CARD = 'SET_CARD';
export function setCard(card, index) {
  return {
    type: SET_CARD,
    card: card,
    index: index
  }
}

export const ADD_CARD = 'ADD_CARD';
export function addCard(card) {
  return {
    type: ADD_CARD,
    card: card
  }
}

export const REMOVE_CARD = 'REMOVE_CARD';
export function removeCard(index) {
  return {
    type: REMOVE_CARD,
    index: index
  }
}
