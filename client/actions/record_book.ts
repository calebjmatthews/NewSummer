import { addModal } from './modal';

import Seed from '../models/seed/seed';
import RecordBook from '../models/record_book';
import Modal from '../models/modal';
import { ModalTypes } from '../models/enums/modal_types';
import { families } from '../instances/families';

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
      let family = families.get(seed.familyName);
      dispatch(addModal(new Modal({
        type: ModalTypes.BANNER_LARGE,
        title: (seed.familyName + ' Discovered!'),
        subtitle: ('Common name: "' + family.nameCommon + '"'),
        messages: [family.description]
      })));
    }
    if (isSeedNew.cultivarNew) {
      dispatch(addModal(new Modal({
        type: ModalTypes.BANNER_LARGE,
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

export const SET_DIALOGUE_COUNT = 'SET_DIALOGUE_COUNT';
export function recordInDialogueHistory(travelerRole: string, dialogueId: number,
  recordBook: RecordBook) {
  let dialogueCount = recordBook.recordInDialogueHistory(travelerRole, dialogueId);
  return {
    type: SET_DIALOGUE_COUNT,
    travelerRole: travelerRole,
    dialogueId: dialogueId,
    dialogueCount: dialogueCount
  }
}

export const SET_LAST_TIME = 'SET_LAST_TIME';
export function setLastTime() {
  return {
    type: SET_LAST_TIME
  }
}
