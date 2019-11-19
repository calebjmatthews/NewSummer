import { addModal } from './modal';

import Seed from '../models/seed/seed';
import RecordBook from '../models/record_book';
import Modal from '../models/modal';
import { ModalTypes } from '../models/enums/modal_types';

export const SET_RECORD_BOOK = 'SET_RECORD_BOOK';
export function setRecordBook(recordBook: RecordBook) {
  return {
    type: SET_RECORD_BOOK,
    recordBook: recordBook
  }
}

export function recordSeed(seed: Seed, recordBook: RecordBook) {
  return function(dispatch: any) {
    let isSeedNew = recordBook.recordSeed(seed);

    if(isSeedNew.familyNew) {
      dispatch(addModal(new Modal({
        type: ModalTypes.ALERT,
        title: (seed.familyName + ' Discovered!'),
        messages: []
      })));
    }
    if (isSeedNew.cultivarNew) {
      dispatch(addModal(new Modal({
        type: ModalTypes.ALERT,
        title: (seed.cultivarName + ' Discovered!'),
        messages: []
      })));
    }

    dispatch({
      type: SET_RECORD_BOOK,
      recordBook: recordBook
    });
  }
}

export const SET_LAST_TIME = 'SET_LAST_TIME';
export function setLastTime() {
  return {
    type: SET_LAST_TIME
  }
}
