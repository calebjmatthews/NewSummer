import Seed from '../models/seed';
import Gene from '../models/gene';

import {POACEAE} from './families';
import {SEED_SIZE, seedSize} from './traits';

export const SEED_DEMO_ID = 0;
export const seedDemo = new Seed(SEED_DEMO_ID, POACEAE, 'Sweet Wild Grass',
  [
    new Gene(SEED_SIZE, 0, [true, false]),
    new Gene(SEED_SIZE, 1, [true, false]),
    new Gene(SEED_SIZE, 2, [false, false])
  ]
);
