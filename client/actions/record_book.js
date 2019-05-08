export const SET_RECORD_BOOK = 'SET_RECORD_BOOK';
export function setRecordBook(recordBook) {
  return {
    type: SET_RECORD_BOOK,
    recordBook: recordBook
  }
}
