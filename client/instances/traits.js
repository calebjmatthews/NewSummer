import Trait from '../models/trait';
import {SEED_QUALITY, GROWING_TIME} from './stats';

export const SEED_SIZE = 'Seed Size';
export const seedSize = new Trait(
  SEED_SIZE,
  3,
  [SEED_QUALITY, GROWING_TIME],
  [0.2, 0.05]
);
