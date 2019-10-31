import Seed from '../models/seed';
import RecordBook from '../models/record_book';

export const RECORD_SEED = 'RECORD_SEED';
export function recordSeed(seed: Seed, recordBook: RecordBook) {
  return {
    type: RECORD_SEED,
    seed: seed,
    recordBook: recordBook
  };
}
