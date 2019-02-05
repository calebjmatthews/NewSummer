import Seed from '../models/seed';
import Gene from '../models/gene';

import {POACEAE} from './families';
import {SEED_SIZE, seedSize, SWEETNESS, sweetness, CHEMICAL_DEFENSE,
  chemicalDefense} from './traits';

export const SEED_DEMO_1_ID =  Math.floor(Math.random() * 10000);
export const seedDemo1 = new Seed(SEED_DEMO_1_ID, POACEAE,
  [
    new Gene(SEED_SIZE, 0, [true, false]),
    new Gene(SEED_SIZE, 1, [true, false]),
    new Gene(SEED_SIZE, 2, [false, false]),
    new Gene(SWEETNESS, 0, [true, false]),
    new Gene(SWEETNESS, 1, [false, false]),
    new Gene(CHEMICAL_DEFENSE, 0, [false, false]),
    new Gene(CHEMICAL_DEFENSE, 1, [false, true])
  ]
);

export const SEED_DEMO_2_ID =  Math.floor(Math.random() * 10000);
export const seedDemo2 = new Seed(SEED_DEMO_2_ID, POACEAE,
  [
    new Gene(SEED_SIZE, 0, [false, false]),
    new Gene(SEED_SIZE, 1, [true, true]),
    new Gene(SEED_SIZE, 2, [true, false]),
    new Gene(SWEETNESS, 0, [true, true]),
    new Gene(SWEETNESS, 1, [false, false]),
    new Gene(CHEMICAL_DEFENSE, 0, [true, false]),
    new Gene(CHEMICAL_DEFENSE, 1, [false, true])
  ]
);
