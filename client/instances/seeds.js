import Seed from '../models/seed';
import Gene from '../models/gene';

import {POACEAE} from './families';
import {SEED_SIZE, seedSize} from './traits';

export const SEED_DEMO_1_ID =  Math.floor(Math.random() * 10000);
export const seedDemo1 = new Seed(SEED_DEMO_1_ID, POACEAE,
  [
    new Gene(SEED_SIZE, 0, [true, false]),
    new Gene(SEED_SIZE, 1, [true, false]),
    new Gene(SEED_SIZE, 2, [false, false])
  ]
);

export const SEED_DEMO_2_ID =  Math.floor(Math.random() * 10000);
export const seedDemo2 = new Seed(SEED_DEMO_2_ID, POACEAE,
  [
    new Gene(SEED_SIZE, 0, [false, false]),
    new Gene(SEED_SIZE, 1, [false, false]),
    new Gene(SEED_SIZE, 2, [true, false])
  ]
);
