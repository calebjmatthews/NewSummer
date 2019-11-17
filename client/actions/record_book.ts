import Seed from '../models/seed/seed';
import RecordBook from '../models/record_book';

export const RECORD_SEED = 'RECORD_SEED';
export function recordSeed(seed: Seed) {
  return {
    type: RECORD_SEED,
    seed: seed
  };
}

export const SET_RECORD_BOOK = 'SET_RECORD_BOOK';
export function setRecordBook(recordBook: RecordBook) {
  return {
    type: SET_RECORD_BOOK,
    recordBook: recordBook
  }
}

export const SET_LAST_TIME = 'SET_LAST_TIME';
export function setLastTime() {
  return {
    type: SET_LAST_TIME
  }
}
