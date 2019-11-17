import {
  RECORD_SEED, SET_RECORD_BOOK, SET_LAST_TIME
} from '../actions/record_book';
import RecordBook from '../models/record_book';

let startingRecordBook: RecordBook = new RecordBook();

export default function
  (recordBook: RecordBook = startingRecordBook,
    action = null) {
	switch(action.type) {
    case RECORD_SEED:
      recordBook.recordSeed(action.seed);
      return Object.assign(new RecordBook(), recordBook, {
        seedMap: recordBook.seedMap
      });
    case SET_LAST_TIME:
      return Object.assign(new RecordBook(), recordBook, {
        lastTime: new Date(Date.now())
      });
    case SET_RECORD_BOOK:
      return new RecordBook(action.recordBook);
		default:
			return recordBook;
	}
};
