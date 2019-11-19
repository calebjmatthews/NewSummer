import Modal from '../models/modal';

export const ADD_MODAL = 'ADD_MODAL';
export function addModal(modal: Modal) {
  return {
    type: ADD_MODAL,
    modal: modal
  };
}

export const DISMISS_MODAL = 'DISMISS_MODAL';
export function dismissModal() {
  return {
    type: DISMISS_MODAL
  }
}
