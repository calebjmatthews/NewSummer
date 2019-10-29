import Seed from '../models/seed';
import RecordBook from '../models/record_book';
import { recordSeed } from './record_book';

export const ADD_SEED = 'ADD_SEED';
export function addAndRecordSeed(seed: Seed, recordBook: RecordBook) {
  return function(dispatch: any) {
    dispatch(recordSeed(seed));
    return {
      type: ADD_SEED,
      seed: seed
    };
  }
}
