import Seed from '../models/seed';

export const RECORD_SEED = 'RECORD_SEED';
export function recordSeed(seed: Seed) {
  return {
    type: RECORD_SEED,
    seed: seed
  };
}
