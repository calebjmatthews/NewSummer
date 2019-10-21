import {
  ADD_MODAL, DISMISS_MODAL
} from '../actions/modal';
import Modal from '../models/modal';

export default function
  (modals: Modal[] = [],
    action: any = null) {
	switch(action.type) {
    case ADD_MODAL:
      return [...modals, action.modal]
      break;
    case DISMISS_MODAL:
      if (modals.length <= 1) {
        return [];
      }
      else {
        return modals.slice(1, modals.length);
      }
		default:
			return modals;
	}
};
