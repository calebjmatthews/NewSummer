export const SET_RECORD_BOOK = 'SET_RECORD_BOOK';
export function setRecordBook(recordBook) {
  return {
    type: SET_RECORD_BOOK,
    recordBook: recordBook
  }
}

export const SET_DATETIME = 'SET_DATETIME';
export function setDateTime(datetime) {
  return {
    type: SET_DATETIME,
    datetime: datetime
  }
}
