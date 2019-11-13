import {
  RECORD_SEED
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
		default:
			return recordBook;
	}
};
