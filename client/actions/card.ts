import Card from '../models/card';

export const SET_ALL_CARDS = 'SET_ALL_CARDS';
export function setAllCards(cards: Card) {
  return {
    type: SET_ALL_CARDS,
    cards: cards
  }
}

export const SET_CARD = 'SET_CARD';
export function setCard(card: Card, spot: number) {
  return {
    type: SET_CARD,
    card: card,
    spot: spot
  }
}

export const ADD_CARD = 'ADD_CARD';
export function addCard(card: Card) {
  return {
    type: ADD_CARD,
    card: card
  }
}

export const REMOVE_CARD = 'REMOVE_CARD';
export function removeCard(spot: number) {
  return {
    type: REMOVE_CARD,
    spot: spot
  }
}

export const REVERT_CARD = 'REVERT_CARD';
export function revertCard(spot: number) {
  return {
    type: REVERT_CARD,
    spot: spot
  }
}
