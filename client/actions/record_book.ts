import Seed from '../models/seed/seed';
import RecordBook from '../models/record_book';

export const RECORD_SEED = 'RECORD_SEED';
export function recordSeed(seed: Seed) {
  return {
    type: RECORD_SEED,
    seed: seed
  };
}
